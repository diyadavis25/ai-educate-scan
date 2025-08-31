import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { GraduationCap, Upload, FileText, BarChart3, Users, Info } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English", 
  "History", "Geography", "Computer Science", "Economics", "Psychology"
];

const classes = [
  "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
  "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
  "Grade 11", "Grade 12"
];

const Home = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const navigate = useNavigate();

  const handleStartScanning = () => {
    if (selectedSubject && selectedClass) {
      navigate("/upload");
    }
  };

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
            <nav className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                <Users className="w-4 h-4 mr-2" />
                Class Dashboard
              </Button>
              <Button variant="ghost" onClick={() => navigate("/about")}>
                <Info className="w-4 h-4 mr-2" />
                About
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Welcome to EduScan AI
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your assessment process with AI-powered answer sheet scanning and intelligent analytics
            </p>
          </div>

          {/* Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                  Select Subject
                </CardTitle>
                <CardDescription>
                  Choose the subject for assessment scanning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                  Select Class
                </CardTitle>
                <CardDescription>
                  Choose the class/grade level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Class/Grade</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Section */}
          <Card className="shadow-strong border-0 bg-gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ready to Start Scanning?</CardTitle>
              <CardDescription className="text-base">
                Upload answer sheets and question papers to begin AI-powered assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Button
                variant="hero"
                size="lg"
                onClick={handleStartScanning}
                disabled={!selectedSubject || !selectedClass}
                className="text-lg px-8 py-6"
              >
                <Upload className="w-5 h-5 mr-2" />
                Start Scanning Process
              </Button>
              {(!selectedSubject || !selectedClass) && (
                <p className="text-sm text-muted-foreground">
                  Please select both subject and class to continue
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/analytics")}
              className="h-16 justify-start"
            >
              <BarChart3 className="w-6 h-6 mr-3 text-primary" />
              <div className="text-left">
                <div className="font-medium">View Analytics</div>
                <div className="text-sm text-muted-foreground">Check student performance</div>
              </div>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="h-16 justify-start"
            >
              <Users className="w-6 h-6 mr-3 text-primary" />
              <div className="text-left">
                <div className="font-medium">Class Dashboard</div>
                <div className="text-sm text-muted-foreground">Manage class overview</div>
              </div>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;