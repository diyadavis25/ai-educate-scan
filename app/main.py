from fastapi import FastAPI, UploadFile, File, Body, Query, Depends, HTTPException
from sqlalchemy.orm import Session
from pathlib import Path
from datetime import datetime
from typing import Optional
import shutil
import json
import time
import re 
import crud, schemas  # your own modules
from database import get_db  # adjust if different

# Constants
MEDIA_DIR = Path("media")
ALLOWED_IMAGE_EXT = {".jpg", ".jpeg", ".png"}

app = FastAPI()

# -------------------------
# Dummy OCR + Scoring (replace with real implementations later)
# -------------------------
from PIL import Image
import pytesseract
from pdf2image import convert_from_path

def image_to_text(file_path: str) -> str:
    """
    Perform OCR on an image or PDF file.
    Returns extracted text as a string.
    """
    ext = Path(file_path).suffix.lower()

    if ext == ".pdf":
        # Convert PDF pages to images, then OCR each page
        pages = convert_from_path(file_path)
        text = []
        for page in pages:
            text.append(pytesseract.image_to_string(page))
        return "\n".join(text)

    else:
        # OCR directly on image
        return pytesseract.image_to_string(Image.open(file_path))
    import re

def score_with_rubric(ocr_text: str, rubric: dict) -> dict:
    """
    Compare OCR text against rubric keywords and assign scores.
    rubric must be of form:
    {
        "questions": [
            {"qid": 1, "answer": "photosynthesis", "max_score": 5},
            {"qid": 2, "answer": "mitochondria", "max_score": 5}
        ]
    }
    """
    questions = rubric.get("questions", [])
    total_score = 0
    details = []

    for q in questions:
        qid = q.get("qid")
        answer = q.get("answer", "").lower()
        max_score = q.get("max_score", 1)

        # Simple keyword match (can be improved with NLP later)
        if re.search(rf"\b{re.escape(answer)}\b", ocr_text.lower()):
            score = max_score
            reason = f"Keyword '{answer}' found."
        else:
            score = 0
            reason = f"Keyword '{answer}' not found."

        total_score += score
        details.append({
            "qid": qid,
            "score": score,
            "reason": reason
        })

    return {"total": total_score, "details": details}

# -------------------------
# Helper: save uploaded file and return path
# -------------------------
def _save_uploaded_file(file: UploadFile, dest_dir: Path, prefix: str = "file") -> str:
    dest_dir.mkdir(parents=True, exist_ok=True)
    ext = Path(file.filename).suffix or ""
    safe_name = f"{prefix}_{int(time.time())}{ext}"
    dest_path = dest_dir / safe_name
    with dest_path.open("wb") as out:
        shutil.copyfileobj(file.file, out)
    return str(dest_path)

# -------------------------
# Upload question paper (PDF/image)
# -------------------------
@app.post("/api/exams/{exam_id}/upload_question_paper")
def upload_question_paper(
    exam_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    exam = crud.get_exam(db, exam_id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")

    dest_dir = MEDIA_DIR / f"exam_{exam_id}"
    saved_path = _save_uploaded_file(file, dest_dir, prefix="question")

    # Update exam metadata
    try:
        meta = json.loads(exam.rubric_json) if exam.rubric_json else {}
    except Exception:
        meta = {}
    meta["question_file"] = saved_path

    exam.rubric_json = json.dumps(meta)
    db.add(exam); db.commit(); db.refresh(exam)

    return {"ok": True, "question_file": saved_path}

# -------------------------
# Upload answer key (JSON file OR raw JSON body)
# -------------------------
@app.post("/api/exams/{exam_id}/upload_answer_key")
async def upload_answer_key(
    exam_id: int,
    file: Optional[UploadFile] = File(None),
    body_json: Optional[dict] = Body(None),
    db: Session = Depends(get_db)
):
    exam = crud.get_exam(db, exam_id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")

    key_obj = None
    saved_path = None

    if file:
        if (Path(file.filename).suffix or "").lower() != ".json":
            raise HTTPException(status_code=400, detail="Answer key must be a JSON file or JSON body.")
        raw = await file.read()
        try:
            key_obj = json.loads(raw.decode("utf-8"))
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid JSON file: {e}")
        dest_dir = MEDIA_DIR / f"exam_{exam_id}"
        dest_dir.mkdir(parents=True, exist_ok=True)
        saved_path = dest_dir / f"answer_key_{int(time.time())}.json"
        with saved_path.open("wb") as out:
            out.write(raw)
        saved_path = str(saved_path)
    elif body_json:
        key_obj = body_json
    else:
        raise HTTPException(status_code=400, detail="Provide a JSON file or JSON body for the answer key.")

    # Validation
    if "questions" not in key_obj or not isinstance(key_obj["questions"], list):
        raise HTTPException(status_code=400, detail="Answer key must include a 'questions' list.")

    # Merge into exam metadata
    try:
        meta = json.loads(exam.rubric_json) if exam.rubric_json else {}
    except Exception:
        meta = {}
    meta["questions"] = key_obj["questions"]
    if saved_path:
        meta["answer_key_file"] = saved_path

    exam.rubric_json = json.dumps(meta)
    db.add(exam); db.commit(); db.refresh(exam)

    return {
        "ok": True,
        "exam_id": exam_id,
        "questions_count": len(key_obj["questions"]),
        "saved_file": saved_path
    }

# -------------------------
# Student upload and grade
# -------------------------
@app.post("/api/exams/{exam_id}/upload_and_grade", response_model=schemas.SubmissionOut)
def upload_and_grade_v2(
    exam_id: int,
    student_id: int = Query(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    exam = crud.get_exam(db, exam_id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")

    # Save file
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_IMAGE_EXT and ext != ".pdf":
        raise HTTPException(status_code=400, detail=f"Unsupported file type {ext}. Use JPG/PNG or PDF.")
    dest_dir = MEDIA_DIR / f"exam_{exam_id}"
    dest_dir.mkdir(parents=True, exist_ok=True)
    safe_name = f"student_{student_id}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}{ext}"
    dest_path = dest_dir / safe_name
    with dest_path.open("wb") as out:
        shutil.copyfileobj(file.file, out)

    # OCR
    try:
        ocr_text = image_to_text(str(dest_path))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR failed: {e}")

    # Ensure rubric exists
    if not exam.rubric_json:
        raise HTTPException(status_code=400, detail="No answer key/rubric uploaded for this exam.")
    try:
        rubric = json.loads(exam.rubric_json)
    except Exception:
        raise HTTPException(status_code=500, detail="Invalid rubric JSON stored in exam.")

    # Scoring
    try:
        result = score_with_rubric(ocr_text, rubric)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scoring failed: {e}")

    detail_json = json.dumps(result["details"])
    sub = crud.save_submission(db, student_id, exam_id, ocr_text, result["total"], detail_json, str(dest_path))

    return {
        "id": sub.id,
        "student_id": sub.student_id,
        "exam_id": sub.exam_id,
        "ocr_text": sub.ocr_text,
        "total_score": sub.total_score,
        "detail": json.loads(sub.detail_json),
        "image_path": sub.image_path
    }