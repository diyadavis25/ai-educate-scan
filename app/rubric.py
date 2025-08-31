import json
import re
from typing import Dict, Any

def normalize(text: str) -> str:
    # basic normalization for keyword matching
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def score_with_rubric(ocr_text: str, rubric_json: str) -> Dict[str, Any]:
    """
    rubric_json format:
    {
      "questions": [
        {"qid":"Q1","max_score":5,"keywords":["photosynthesis","chlorophyll"],"any_of":["sunlight"],"penalties":{"wrong_terms":["respiration"]}}
      ]
    }
    """
    try:
        rubric = json.loads(rubric_json)
    except Exception as e:
        raise ValueError(f"Invalid rubric JSON: {e}")

    clean = normalize(ocr_text)

    details = []
    total = 0.0

    for q in rubric.get("questions", []):
        qid = q.get("qid", "?")
        max_score = float(q.get("max_score", 0))
        required = [w.lower() for w in q.get("keywords", []) if w]
        any_of = [w.lower() for w in q.get("any_of", []) if w]
        penalties = q.get("penalties", {})
        wrong_terms = [w.lower() for w in penalties.get("wrong_terms", []) if w]

        # required keywords: proportion present
        req_present = sum(1 for w in required if w in clean)
        req_score = (req_present / max(1, len(required))) * max_score if required else max_score

        # any_of bonus: +10% of max if any present
        any_bonus = 0.1 * max_score if any(anyword in clean for anyword in any_of) and any_of else 0.0

        # penalties: -10% of max per wrong term found (capped at max_score * 0.5)
        penalty = 0.0
        for wt in wrong_terms:
            if wt in clean:
                penalty += 0.1 * max_score
        penalty = min(penalty, 0.5 * max_score)

        q_score = max(0.0, min(max_score, req_score + any_bonus - penalty))

        details.append({
            "qid": qid,
            "required_matched": req_present,
            "required_total": len(required),
            "any_bonus_applied": any_bonus > 0,
            "penalty": round(penalty, 2),
            "score": round(q_score, 2),
            "max_score": max_score
        })
        total += q_score

    return {
        "total": round(total, 2),
        "details": details
    }
