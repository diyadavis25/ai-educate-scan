import { GraduationCap, Upload as UploadIcon, FileText, Key, Image, FileType, ArrowLeft, ArrowRight, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [answerSheets, setAnswerSheets] = useState<FileList | null>(null);
  const [questionPaper, setQuestionPaper] = useState<FileList | null>(null);
  const [answerKey, setAnswerKey] = useState<FileList | null>(null);
  const navigate = useNavigate();

  const handleAnswerSheetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerSheets(e.target.files);
  };

  const handleQuestionPaperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionPaper(e.target.files);
  };

  const handleAnswerKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerKey(e.target.files);
  };

  const handleProceed = () => {
    if (studentName && rollNumber && answerSheets && questionPaper && answerKey) {
      navigate("/analytics");
    }
  };

  const canProceed = studentName && rollNumber && answerSheets && questionPaper && answerKey;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">EduScan AI</h1>
          </div>
          <button
            className="flex items-center px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Upload Assessment Files</h2>
            <p className="text-gray-600">Upload answer sheets, question paper, and answer key for AI-powered scanning</p>
          </div>

          {/* Student Info */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold flex items-center mb-4">
              <User className="w-6 h-6 mr-2 text-blue-600" />
              Student Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="student-name" className="block text-sm font-medium text-gray-700">
                  Student Name
                </label>
                <input
                  id="student-name"
                  type="text"
                  className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter student's full name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="roll-number" className="block text-sm font-medium text-gray-700">
                  Roll Number
                </label>
                <input
                  id="roll-number"
                  type="text"
                  className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter roll number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* File Uploads */}
          <div className="space-y-6">
            {/* Answer Sheets */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold flex items-center mb-2">
                <UploadIcon className="w-6 h-6 mr-2 text-blue-600" />
                Student Answer Sheets
              </h3>
              <p className="text-gray-600 mb-4">Upload scanned answer sheets (JPG, PNG, or PDF)</p>
              <input id="answer-sheets" type="file" multiple accept=".jpg,.jpeg,.png,.pdf" onChange={handleAnswerSheetsChange} />
              {answerSheets && <p className="mt-2 text-sm text-gray-500">{answerSheets.length} file(s) selected</p>}
            </div>

            {/* Question Paper */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold flex items-center mb-2">
                <FileText className="w-6 h-6 mr-2 text-green-600" />
                Question Paper
              </h3>
              <p className="text-gray-600 mb-4">Upload the original question paper</p>
              <input id="question-paper" type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleQuestionPaperChange} />
              {questionPaper && <p className="mt-2 text-sm text-gray-500">{questionPaper[0].name} selected</p>}
            </div>

            {/* Answer Key */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold flex items-center mb-2">
                <Key className="w-6 h-6 mr-2 text-purple-600" />
                Answer Key
              </h3>
              <p className="text-gray-600 mb-4">Upload the answer key</p>
              <input id="answer-key" type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleAnswerKeyChange} />
              {answerKey && <p className="mt-2 text-sm text-gray-500">{answerKey[0].name} selected</p>}
            </div>
          </div>

          {/* Proceed */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow p-6 text-center">
            <button
              onClick={handleProceed}
              disabled={!canProceed}
              className={`px-8 py-3 rounded-md font-semibold flex items-center justify-center mx-auto ${
                canProceed ? "bg-white text-blue-600 hover:bg-gray-100" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Process Files & Generate Analytics
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            {!canProceed && <p className="mt-2 text-sm">Please enter student info and upload all required files</p>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;