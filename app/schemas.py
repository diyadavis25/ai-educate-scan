from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any

class ClassCreate(BaseModel):
    name: str = Field(min_length=1)

class ClassOut(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)

class StudentCreate(BaseModel):
    name: str
    roll_no: str
    classroom_id: int

class StudentOut(BaseModel):
    id: int
    name: str
    roll_no: str
    classroom_id: int
    model_config = ConfigDict(from_attributes=True)

class QuestionRubric(BaseModel):
    qid: str
    max_score: float
    keywords: List[str] = Field(default_factory=list)
    any_of: List[str] = Field(default_factory=list)
    penalties: Dict[str, List[str]] = Field(default_factory=dict)

class ExamCreate(BaseModel):
    name: str
    date: Optional[str] = None
    classroom_id: int
    questions: List[QuestionRubric]

class ExamOut(BaseModel):
    id: int
    name: str
    date: Optional[str]
    classroom_id: int
    questions: List[QuestionRubric]
    model_config = ConfigDict(from_attributes=True)

class SubmissionOut(BaseModel):
    id: int
    student_id: int
    exam_id: int
    ocr_text: str
    total_score: float
    detail: Dict[str, Any]
    image_path: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class DashboardOut(BaseModel):
    class_id: int
    class_name: str
    exams: List[Dict[str, Any]]
    top_students: List[Dict[str, Any]]
