
import { useState } from "react";
import { useUser } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, BookOpen, ChartBar, Clock, List, Target } from "lucide-react";

export default function DashboardPage() {
  const { user } = useUser();
  
  // Sample data - in a real app, you would fetch this from your API
  const researchProgress = 65;
  const learningProgress = 42;
  const pendingTasks = 7;
  const completedDeals = 3;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Research Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{researchProgress}%</div>
            <Progress value={researchProgress} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">+5% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{learningProgress}%</div>
            <Progress value={learningProgress} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">+2% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks}</div>
            <p className="text-xs text-muted-foreground mt-2">2 due today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedDeals}</div>
            <p className="text-xs text-muted-foreground mt-2">1 this month</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="research">
        <TabsList className="mb-4">
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="research">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Research</CardTitle>
                <CardDescription>Your latest research activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Market Analysis</p>
                      <p className="text-xs text-muted-foreground">Completed research on target market trends</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <ChartBar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Competitor Analysis</p>
                      <p className="text-xs text-muted-foreground">Identified 5 key competitors in the space</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Research Tasks</CardTitle>
                <CardDescription>Upcoming research tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="bg-muted p-2 rounded-md">
                      <List className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Customer Interviews</p>
                      <p className="text-xs text-muted-foreground">Schedule interviews with potential customers</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-muted p-2 rounded-md">
                      <List className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Financial Modeling</p>
                      <p className="text-xs text-muted-foreground">Create financial projections for target acquisitions</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="learning">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Your course completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Acquisition Fundamentals</p>
                      <p className="text-xs text-muted-foreground">75%</p>
                    </div>
                    <Progress value={75} className="h-2" />
                  </li>
                  <li className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Due Diligence Masterclass</p>
                      <p className="text-xs text-muted-foreground">30%</p>
                    </div>
                    <Progress value={30} className="h-2" />
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommended Learning</CardTitle>
                <CardDescription>Based on your interests</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Valuation Techniques</p>
                      <p className="text-xs text-muted-foreground">Learn how to properly value acquisition targets</p>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Negotiation Skills</p>
                      <p className="text-xs text-muted-foreground">Master the art of acquisition negotiation</p>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="deals">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Deals</CardTitle>
                <CardDescription>Deals currently in progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Tech Solutions Inc.</p>
                      <p className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Due Diligence</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Est. completion: 45 days</p>
                  </li>
                  <li className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Retail Ventures LLC</p>
                      <p className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Negotiation</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Est. completion: 30 days</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Deal Pipeline</CardTitle>
                <CardDescription>Potential opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="bg-muted p-2 rounded-md">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Digital Marketing Agency</p>
                      <p className="text-xs text-muted-foreground">Initial outreach planned</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-muted p-2 rounded-md">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">E-commerce Platform</p>
                      <p className="text-xs text-muted-foreground">Research phase</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
