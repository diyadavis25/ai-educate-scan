import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, ArrowLeft, TrendingUp, TrendingDown, Award, Users, BookOpen, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();

  // Mock data structure - will be replaced with real data from Supabase
  const overallStats = {
    totalStudents: 0,
    averageScore: 0,
    completionRate: 0,
    highestScore: 0
  };

  const subjectAnalysis = {
    subject: "Mathematics",
    class: "Grade 10",
    totalQuestions: 0,
    totalMarks: 0
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
            <Button variant="outline" onClick={() => navigate("/upload")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Upload
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Assessment Analytics
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive analysis of student performance and assessment results
            </p>
          </div>

          {/* Subject Info */}
          <Card className="shadow-medium border-0 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-xl">
                    <BookOpen className="w-6 h-6 mr-2 text-primary" />
                    Assessment Details
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Subject: {subjectAnalysis.subject} • Class: {subjectAnalysis.class}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Ready for Analysis
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{overallStats.totalStudents}</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <BarChart3 className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{subjectAnalysis.totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Award className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{subjectAnalysis.totalMarks}</div>
                  <div className="text-sm text-muted-foreground">Total Marks</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{overallStats.averageScore}%</div>
                  <div className="text-sm text-muted-foreground">Avg Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Class Performance Overview
                </CardTitle>
                <CardDescription>
                  Statistical analysis of class performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Score</span>
                    <span className="text-2xl font-bold text-primary">{overallStats.averageScore}%</span>
                  </div>
                  <Progress value={overallStats.averageScore} className="h-3" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-2xl font-bold text-secondary">{overallStats.completionRate}%</span>
                  </div>
                  <Progress value={overallStats.completionRate} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <div className="text-lg font-bold text-accent">{overallStats.highestScore}%</div>
                    <div className="text-xs text-muted-foreground">Highest Score</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <div className="text-lg font-bold text-foreground">{overallStats.totalStudents}</div>
                    <div className="text-xs text-muted-foreground">Total Students</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-secondary" />
                  Question-wise Analysis
                </CardTitle>
                <CardDescription>
                  Performance breakdown by question
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Analysis Ready
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Connect to Supabase to process uploaded files and generate detailed question-wise analytics
                  </p>
                  <Badge variant="outline" className="text-sm">
                    Awaiting Backend Integration
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Results Table */}
          <Card className="shadow-strong border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="w-6 h-6 mr-2 text-primary" />
                Student Results
              </CardTitle>
              <CardDescription>
                Individual student performance and detailed scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <Users className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-2xl font-medium text-foreground mb-4">
                  Student Results Will Appear Here
                </h3>
                <p className="text-lg text-muted-foreground max-w-md mx-auto mb-6">
                  Once you connect to Supabase and process the uploaded answer sheets, 
                  detailed student results and analytics will be displayed here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" onClick={() => navigate("/dashboard")}>
                    <Users className="w-4 h-4 mr-2" />
                    View Class Dashboard
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/home")}>
                    Start New Assessment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;