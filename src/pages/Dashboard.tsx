import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, ArrowLeft, Users, BookOpen, Calendar, TrendingUp, Award, FileText, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data structure - will be replaced with real data from Supabase
  const classOverview = {
    totalStudents: 0,
    totalAssessments: 0,
    averagePerformance: 0,
    activeSubjects: 0
  };

  const recentAssessments = [];
  const subjectPerformance = [];

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
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate("/home")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button variant="default" onClick={() => navigate("/analytics")}>
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Class Dashboard
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive overview of class performance and assessments
              </p>
            </div>
            <Button variant="hero" onClick={() => navigate("/home")}>
              <FileText className="w-4 h-4 mr-2" />
              New Assessment
            </Button>
          </div>

          {/* Overview Cards */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-medium border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-3xl font-bold text-foreground">{classOverview.totalStudents}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assessments</p>
                    <p className="text-3xl font-bold text-foreground">{classOverview.totalAssessments}</p>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-full">
                    <FileText className="w-8 h-8 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Performance</p>
                    <p className="text-3xl font-bold text-foreground">{classOverview.averagePerformance}%</p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-full">
                    <TrendingUp className="w-8 h-8 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Subjects</p>
                    <p className="text-3xl font-bold text-foreground">{classOverview.activeSubjects}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full lg:w-1/2 grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="shadow-medium border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-primary" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>
                      Latest assessments and class activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        No Recent Activity
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Start by creating your first assessment to see activity here
                      </p>
                      <Button variant="outline" onClick={() => navigate("/home")}>
                        Create Assessment
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-medium border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-secondary" />
                      Top Performers
                    </CardTitle>
                    <CardDescription>
                      Students with highest performance scores
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        Performance Data Awaiting
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Connect to Supabase to track and display student performance
                      </p>
                      <Badge variant="outline">
                        Backend Integration Required
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="assessments">
              <Card className="shadow-strong border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <FileText className="w-6 h-6 mr-2 text-primary" />
                    Assessment History
                  </CardTitle>
                  <CardDescription>
                    Complete list of all assessments conducted
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-16">
                    <FileText className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
                    <h3 className="text-2xl font-medium text-foreground mb-4">
                      No Assessments Yet
                    </h3>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto mb-6">
                      Create your first assessment to start tracking student performance 
                      and building your assessment history.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="hero" onClick={() => navigate("/home")}>
                        <FileText className="w-4 h-4 mr-2" />
                        Create First Assessment
                      </Button>
                      <Button variant="outline" onClick={() => navigate("/about")}>
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="shadow-medium border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                      Subject Performance
                    </CardTitle>
                    <CardDescription>
                      Performance breakdown by subject
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        Performance Analytics Ready
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Subject-wise performance data will be displayed here
                      </p>
                      <Badge variant="secondary">
                        Awaiting Assessment Data
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-medium border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-secondary" />
                      Performance Trends
                    </CardTitle>
                    <CardDescription>
                      Class performance over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        Trend Analysis Ready
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Performance trends will be displayed here over time
                      </p>
                      <Badge variant="secondary">
                        Historical Data Required
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;