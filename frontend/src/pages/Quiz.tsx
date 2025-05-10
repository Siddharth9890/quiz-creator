import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Header from "@/components/Header";
import { gradeQuiz } from "@/api/quiz";

const Quiz = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quiz, setQuiz] = useState<any>(null);
  const [topic, setTopic] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log(quizId);
    if (!quizId) {
      navigate("/");
      return;
    }

    const storedQuizData = sessionStorage.getItem("quizData");
    const storedTopic = sessionStorage.getItem("quizTopic");

    if (storedQuizData && storedTopic) {
      const quizData = JSON.parse(storedQuizData);

      if (quizData.quizId === quizId) {
        setQuiz(quizData);
        setTopic(storedTopic);
        setIsLoading(false);
        return;
      }
    }

    toast.error("Quiz not found. Please generate a new quiz.");
    navigate("/");
  }, [quizId, navigate]);

  const handleAnswerSelect = (value: string) => {
    if (!quiz) return;

    setAnswers((prev) => ({
      ...prev,
      [quiz.questions[currentQuestionIndex].id.toString()]: value,
    }));
  };

  const handleNext = async () => {
    if (!quiz) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    if (!answers[currentQuestion.id.toString()]) {
      toast.error("Please select an answer before proceeding");
      return;
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsSubmitting(true);

      try {
        const results = await gradeQuiz(quiz.quizId, answers);

        sessionStorage.removeItem("quizData");
        sessionStorage.removeItem("quizTopic");

        navigate("/results", {
          state: {
            topic,
            score: results.correct,
            totalQuestions: results.total,
            answers,
            questions: quiz.questions,
            feedback: results.feedback,
          },
        });
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="inline-block p-4 rounded-full bg-quiz-purple/10">
              <HelpCircle className="h-8 w-8 text-quiz-purple animate-pulse" />
            </div>
            <h2 className="text-2xl font-medium">Loading your quiz...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container max-w-3xl py-8 px-4">
        <div className="mb-8 animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 flex items-center gap-2 text-muted-foreground"
          >
            <ArrowLeft size={16} />
            <span>Back to home</span>
          </Button>

          <h1 className="text-2xl font-bold mb-2">Quiz on {topic}</h1>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
              <span className="text-quiz-purple font-medium">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card className="overflow-hidden animate-scale-in mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium mb-6">{currentQuestion.text}</h2>

            <RadioGroup
              value={answers[currentQuestion.id.toString()] || ""}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {currentQuestion.options.map((option: string, index: number) => {
                const optionId = option.charAt(0); // Extract "A", "B", "C", or "D"
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 border rounded-lg p-4 transition-all cursor-pointer ${
                      answers[currentQuestion.id.toString()] === optionId
                        ? "border-quiz-purple bg-quiz-purple/5"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() => handleAnswerSelect(optionId)}
                  >
                    <RadioGroupItem
                      value={optionId}
                      id={`option-${optionId}`}
                      className="text-quiz-purple"
                    />
                    <label
                      htmlFor={`option-${optionId}`}
                      className="flex-1 cursor-pointer py-1"
                    >
                      {option}
                    </label>
                  </div>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Previous</span>
          </Button>

          <Button
            onClick={handleNext}
            className="button-gradient text-white flex items-center gap-2"
            disabled={isSubmitting}
          >
            <span>
              {currentQuestionIndex === quiz.questions.length - 1
                ? isSubmitting
                  ? "Submitting..."
                  : "Finish Quiz"
                : "Next Question"}
            </span>
            <ArrowRight size={16} />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
