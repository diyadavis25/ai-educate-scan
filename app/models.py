from sqlalchemy import Column, Integer, String, ForeignKey, Float, Text
from sqlalchemy.orm import relationship
from .database import Base

class ClassRoom(Base):
    __tablename__ = "classes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    students = relationship("Student", back_populates="classroom", cascade="all,delete")
    exams = relationship("Exam", back_populates="classroom", cascade="all,delete")

class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    roll_no = Column(String(50), nullable=False)
    classroom_id = Column(Integer, ForeignKey("classes.id"), nullable=False)
    classroom = relationship("ClassRoom", back_populates="students")
    submissions = relationship("Submission", back_populates="student", cascade="all,delete")

class Exam(Base):
    __tablename__ = "exams"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    date = Column(String(20), nullable=True)
    classroom_id = Column(Integer, ForeignKey("classes.id"), nullable=False)
    classroom = relationship("ClassRoom", back_populates="exams")
    rubric_json = Column(Text, nullable=False)  # store rubric as JSON string
    submissions = relationship("Submission", back_populates="exam", cascade="all,delete")

class Submission(Base):
    __tablename__ = "submissions"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    exam_id = Column(Integer, ForeignKey("exams.id"), nullable=False)
    ocr_text = Column(Text, default="")
    total_score = Column(Float, default=0.0)
    detail_json = Column(Text, default="")  # per-question score details
    image_path = Column(String(300), nullable=True)

    student = relationship("Student", back_populates="submissions")
    exam = relationship("Exam", back_populates="submissions")
