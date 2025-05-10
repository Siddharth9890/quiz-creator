import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, BookOpen, PieChart, BarChart2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import TopicCard from "@/components/TopicCard";
import { generateQuiz } from "@/api/quiz";

const Home = () => {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic.trim()) {
      toast.error("Please enter a topic for your quiz");
      return;
    }

    setIsGenerating(true);

    try {
      const quiz = await generateQuiz(topic);
      console.log(quiz);
      sessionStorage.setItem("quizData", JSON.stringify(quiz));
      sessionStorage.setItem("quizTopic", topic);

      navigate(`/quiz/${quiz.quizId}`);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestedTopic = async (suggestedTopic: string) => {
    setTopic(suggestedTopic);

    setIsGenerating(true);

    try {
      const quiz = await generateQuiz(suggestedTopic);

      sessionStorage.setItem("quizData", JSON.stringify(quiz));
      sessionStorage.setItem("quizTopic", suggestedTopic);

      navigate(`/quiz/${quiz.quizId}`);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestedTopics = [
    {
      topic: "General Knowledge",
      description: "Test your knowledge across a variety of subjects",
      icon: <BookOpen size={20} />,
    },
    {
      topic: "Science",
      description: "Explore topics in biology, chemistry, and physics",
      icon: <PieChart size={20} />,
    },
    {
      topic: "History",
      description: "Journey through significant historical events",
      icon: <BarChart2 size={20} />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container max-w-5xl py-8 px-4 md:py-12">
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Test Your Knowledge with{" "}
              <span className="bg-clip-text text-transparent quiz-gradient">
                Spark Quiz
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Generate quizzes on any topic and challenge yourself
            </p>
          </div>

          <Card className="p-4 md:p-6 shadow-md">
            <CardContent className="p-0 space-y-4">
              <form onSubmit={handleSubmit} className="relative">
                <Input
                  type="text"
                  placeholder="Enter a topic for your quiz..."
                  className="pl-10 py-6 text-lg"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={isGenerating}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Button
                  type="submit"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 button-gradient text-white"
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate Quiz"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Suggested Topics</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {suggestedTopics.map((item) => (
                <TopicCard
                  key={item.topic}
                  topic={item.topic}
                  description={item.description}
                  icon={item.icon}
                  onClick={() => handleSuggestedTopic(item.topic)}
                  disabled={isGenerating}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Spark Quiz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
