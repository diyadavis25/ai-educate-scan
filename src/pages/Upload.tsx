import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GraduationCap, Upload as UploadIcon, FileText, Key, Image, FileType, ArrowLeft, ArrowRight, User, IdCard } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">EduScan AI</h1>
            </div>
            <Button variant="outline" onClick={() => navigate("/home")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Upload Assessment Files
            </h2>
            <p className="text-lg text-muted-foreground">
              Upload answer sheets, question paper, and answer key for AI-powered scanning
            </p>
          </div>

          <div className="space-y-6">
            {/* Student Information */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <User className="w-6 h-6 mr-2 text-primary" />
                  Student Information
                </CardTitle>
                <CardDescription>
                  Enter student details for assessment tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-name">Student Name</Label>
                    <Input
                      id="student-name"
                      type="text"
                      placeholder="Enter student's full name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roll-number">Roll Number</Label>
                    <Input
                      id="roll-number"
                      type="text"
                      placeholder="Enter roll number"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answer Sheets Upload */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <UploadIcon className="w-6 h-6 mr-2 text-primary" />
                  Student Answer Sheets
                </CardTitle>
                <CardDescription>
                  Upload scanned answer sheets (Images: JPG, PNG or PDF files)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Image className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <Label htmlFor="answer-sheets" className="cursor-pointer">
                          <span className="text-lg font-medium text-primary hover:text-primary/80">
                            Click to upload answer sheets
                          </span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Supports multiple files: JPG, PNG, PDF (Max 10MB each)
                          </p>
                        </Label>
                        <input
                          id="answer-sheets"
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleAnswerSheetsChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                  {answerSheets && (
                    <div className="text-sm text-muted-foreground">
                      {answerSheets.length} file(s) selected
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Question Paper Upload */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <FileText className="w-6 h-6 mr-2 text-secondary" />
                  Question Paper
                </CardTitle>
                <CardDescription>
                  Upload the original question paper for reference
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-secondary/50 transition-colors">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-4 bg-secondary/10 rounded-full">
                        <FileType className="w-8 h-8 text-secondary" />
                      </div>
                      <div>
                        <Label htmlFor="question-paper" className="cursor-pointer">
                          <span className="text-lg font-medium text-secondary hover:text-secondary/80">
                            Click to upload question paper
                          </span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Supports: JPG, PNG, PDF (Max 10MB)
                          </p>
                        </Label>
                        <input
                          id="question-paper"
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleQuestionPaperChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                  {questionPaper && (
                    <div className="text-sm text-muted-foreground">
                      {questionPaper[0].name} selected
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Answer Key Upload */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Key className="w-6 h-6 mr-2 text-accent" />
                  Answer Key
                </CardTitle>
                <CardDescription>
                  Upload the answer key for accurate assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-accent/50 transition-colors">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-4 bg-accent/10 rounded-full">
                        <Key className="w-8 h-8 text-accent" />
                      </div>
                      <div>
                        <Label htmlFor="answer-key" className="cursor-pointer">
                          <span className="text-lg font-medium text-accent hover:text-accent/80">
                            Click to upload answer key
                          </span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Supports: JPG, PNG, PDF (Max 10MB)
                          </p>
                        </Label>
                        <input
                          id="answer-key"
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleAnswerKeyChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                  {answerKey && (
                    <div className="text-sm text-muted-foreground">
                      {answerKey[0].name} selected
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Proceed Button */}
            <Card className="shadow-strong border-0 bg-gradient-card">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleProceed}
                    disabled={!canProceed}
                    className="text-lg px-8 py-6"
                  >
                    Process Files & Generate Analytics
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                   {!canProceed && (
                     <p className="text-sm text-muted-foreground">
                       Please enter student information and upload all required files to proceed
                     </p>
                   )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;