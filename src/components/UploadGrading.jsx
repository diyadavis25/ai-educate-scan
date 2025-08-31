import { useState } from "react";
import axios from "axios";

export default function UploadGrading({ examId }) {
  const [questionFile, setQuestionFile] = useState(null);
  const [answerKeyFile, setAnswerKeyFile] = useState(null);
  const [studentFile, setStudentFile] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState(null);
  const base = "http://127.0.0.1:8000";

  async function uploadQuestion() {
    if (!questionFile) return alert("Select question paper file");
    const form = new FormData();
    form.append("file", questionFile);
    const res = await axios.post(`${base}/api/exams/${examId}/upload_question_paper`, form);
    alert("Question uploaded");
    console.log(res.data);
  }

  async function uploadAnswerKey() {
    if (!answerKeyFile) return alert("Select answer key JSON file");
    const form = new FormData();
    form.append("file", answerKeyFile);
    const res = await axios.post(`${base}/api/exams/${examId}/upload_answer_key`, form);
    alert("Answer key uploaded");
    console.log(res.data);
  }

  async function submitStudent() {
    if (!studentFile || !studentId) return alert("Select student file and enter student id");
    const form = new FormData();
    form.append("file", studentFile);
    const res = await axios.post(`${base}/api/exams/${examId}/upload_and_grade?student_id=${studentId}`, form);
    setResult(res.data);
  }

  return (
    <div>
      <h3>Upload Question Paper</h3>
      <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e=>setQuestionFile(e.target.files[0])} />
      <button onClick={uploadQuestion}>Upload Question</button>

      <h3>Upload Answer Key (.json)</h3>
      <input type="file" accept=".json" onChange={e=>setAnswerKeyFile(e.target.files[0])} />
      <button onClick={uploadAnswerKey}>Upload Answer Key</button>

      <h3>Upload Student Answer</h3>
      <input type="text" placeholder="student id" value={studentId} onChange={e=>setStudentId(e.target.value)} />
      <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e=>setStudentFile(e.target.files[0])} />
      <button onClick={submitStudent}>Upload & Grade</button>

      {result && (
        <div style={{marginTop:20}}>
          <h4>Result for student {result.student_id}</h4>
          <p>Total: {result.total_score}</p>
          <pre>{JSON.stringify(result.detail, null, 2)}</pre>
          <p><a href={`${base}/media/exam_${examId}/${result.image_path?.split('/').pop()}`}>Download uploaded file</a></p>
        </div>
      )}
    </div>
  );
}
