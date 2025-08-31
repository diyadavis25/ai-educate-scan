import json
from sqlalchemy.orm import Session
from sqlalchemy import func
from . import models

def create_class(db: Session, name: str):
    cls = models.ClassRoom(name=name)
    db.add(cls); db.commit(); db.refresh(cls)
    return cls

def create_student(db: Session, name: str, roll_no: str, classroom_id: int):
    st = models.Student(name=name, roll_no=roll_no, classroom_id=classroom_id)
    db.add(st); db.commit(); db.refresh(st)
    return st

def create_exam(db: Session, name: str, date: str, classroom_id: int, rubric_json: str):
    ex = models.Exam(name=name, date=date, classroom_id=classroom_id, rubric_json=rubric_json)
    db.add(ex); db.commit(); db.refresh(ex)
    return ex

def save_submission(db: Session, student_id: int, exam_id: int, ocr_text: str, total: float, detail_json: str, image_path: str):
    sub = models.Submission(student_id=student_id, exam_id=exam_id, ocr_text=ocr_text,
                            total_score=total, detail_json=detail_json, image_path=image_path)
    db.add(sub); db.commit(); db.refresh(sub)
    return sub

def get_exam(db: Session, exam_id: int):
    return db.query(models.Exam).filter(models.Exam.id == exam_id).first()

def get_submission(db: Session, sub_id: int):
    return db.query(models.Submission).filter(models.Submission.id == sub_id).first()

def get_class(db: Session, class_id: int):
    return db.query(models.ClassRoom).filter(models.ClassRoom.id == class_id).first()

def list_exams_for_class(db: Session, class_id: int):
    return db.query(models.Exam).filter(models.Exam.classroom_id == class_id).all()

def top_students_for_class(db: Session, class_id: int, limit: int = 5):
    from .models import Submission, Student, Exam
    q = (db.query(Student.id, Student.name, func.avg(Submission.total_score).label("avg_score"))
           .join(Submission, Submission.student_id == Student.id)
           .join(Exam, Exam.id == Submission.exam_id)
           .filter(Student.classroom_id == class_id)
           .group_by(Student.id)
           .order_by(func.avg(Submission.total_score).desc())
           .limit(limit))
    return [{"student_id": sid, "student_name": name, "avg_score": float(avg)} for sid, name, avg in q]
