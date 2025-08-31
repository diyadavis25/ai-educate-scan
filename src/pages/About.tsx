import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, ArrowLeft, Zap, Shield, BarChart3, Clock, Users, FileText, Brain, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Scanning",
      description: "Advanced machine learning algorithms automatically scan and analyze answer sheets with high accuracy."
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Comprehensive performance analytics with question-wise breakdown and student insights."
    },
    {
      icon: Clock,
      title: "Time Efficient",
      description: "Reduce grading time from hours to minutes with automated assessment processing."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security ensures your student data remains protected and confidential."
    },
    {
      icon: Users,
      title: "Class Management",
      description: "Manage multiple classes, subjects, and assessments from a single unified dashboard."
    },
    {
      icon: Award,
      title: "Performance Tracking",
      description: "Track student progress over time with detailed performance trends and insights."
    }
  ];

  const benefits = [
    "Automated answer sheet scanning and grading",
    "Detailed performance analytics and insights",
    "Question-wise analysis and difficulty assessment",
    "Class dashboard for comprehensive overview",
    "Secure data handling and storage",
    "Time-efficient assessment processing"
  ];

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

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="EduScan AI Technology" 
            className="object-cover w-full h-full opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              AI-Powered Education Technology
            </Badge>
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Revolutionizing Assessment with AI
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              EduScan AI transforms traditional paper-based assessments into intelligent, 
              data-driven insights that empower educators and improve student outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" onClick={() => navigate("/home")}>
                <Zap className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/dashboard")}>
                <BarChart3 className="w-5 h-5 mr-2" />
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Powerful Features for Modern Education
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how EduScan AI can transform your assessment workflow and 
              provide deeper insights into student performance.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-medium border-0 h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Why Choose EduScan AI?
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Our platform combines cutting-edge AI technology with intuitive design 
                  to deliver a seamless assessment experience for educators.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center mr-3">
                        <div className="w-3 h-3 bg-secondary rounded-full" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Card className="shadow-strong border-0 bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    Ready to Get Started?
                  </CardTitle>
                  <CardDescription className="text-center text-base">
                    Transform your assessment process today
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-primary">3</div>
                    <div className="text-sm text-muted-foreground">Simple Steps</div>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                      <span className="text-sm">Select subject and class</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                      <span className="text-sm">Upload answer sheets & key</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                      <span className="text-sm">Get detailed analytics</span>
                    </div>
                  </div>
                  <Button variant="hero" className="w-full" onClick={() => navigate("/home")}>
                    <FileText className="w-4 h-4 mr-2" />
                    Start Your First Assessment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto text-white">
            <h3 className="text-3xl font-bold mb-4">
              Join the Future of Educational Assessment
            </h3>
            <p className="text-xl opacity-90 mb-8">
              Experience the power of AI-driven assessment analysis and 
              transform how you evaluate student performance.
            </p>
            <Button variant="secondary" size="lg" onClick={() => navigate("/home")}>
              <GraduationCap className="w-5 h-5 mr-2" />
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;