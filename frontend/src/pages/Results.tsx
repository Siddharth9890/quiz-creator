import { useLocation, useNavigate } from "react-router-dom";
import { Check, X, ArrowLeft, BarChart2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    navigate("/");
    return null;
  }

  const { topic, score, totalQuestions, answers, questions, feedback } =
    location.state;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getFeedbackMessage = () => {
    if (percentage >= 80) return "Outstanding! Your knowledge is impressive!";
    if (percentage >= 60) return "Great job! You have a solid understanding.";
    if (percentage >= 40) return "Good effort! Keep learning and improving.";
    return "Keep practicing! You'll improve with more study.";
  };

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

          <h1 className="text-2xl font-bold mb-2">
            Quiz Results: <span className="text-quiz-purple">{topic}</span>
          </h1>
        </div>

        <div className="space-y-8">
          <Card className="overflow-hidden animate-scale-in">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-medium mb-1">Your Score</h2>
                  <p className="text-muted-foreground">
                    {getFeedbackMessage()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-quiz-purple" />
                  <span className="text-2xl font-bold">
                    {score}/{totalQuestions}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Correct Answers</span>
                  <span className="text-quiz-purple font-medium">
                    {percentage}%
                  </span>
                </div>
                <Progress value={percentage} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-medium">Detailed Feedback</h2>

            <div className="space-y-4">
              {questions.map((question: any, index: number) => {
                const questionFeedback = feedback.find(
                  (f: any) => f.id === question.id
                );
                if (!questionFeedback) return null;

                const isCorrect = questionFeedback.isCorrect;
                const userAnswer = questionFeedback.yourAnswer;
                const correctAnswer = questionFeedback.correctAnswer;

                return (
                  <Card
                    key={question.id}
                    className={`border ${
                      isCorrect ? "border-green-200" : "border-red-200"
                    } animate-fade-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            isCorrect
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          } mt-1`}
                        >
                          {isCorrect ? <Check size={16} /> : <X size={16} />}
                        </div>
                        <div className="space-y-2 flex-1">
                          <p className="font-medium">
                            {index + 1}. {question.text}
                          </p>

                          <div className="space-y-1 text-sm">
                            <div className="flex gap-2 items-center">
                              <span className="text-muted-foreground">
                                Your answer:
                              </span>
                              <span
                                className={
                                  isCorrect ? "text-green-600" : "text-red-600"
                                }
                              >
                                {userAnswer
                                  ? question.options
                                      .find((o: string) =>
                                        o.startsWith(userAnswer)
                                      )
                                      ?.substring(2) || "No answer"
                                  : "No answer"}
                              </span>
                            </div>

                            {!isCorrect && (
                              <div className="flex gap-2 items-center">
                                <span className="text-muted-foreground">
                                  Correct answer:
                                </span>
                                <span className="text-green-600">
                                  {question.options
                                    .find((o: string) =>
                                      o.startsWith(correctAnswer)
                                    )
                                    ?.substring(2) || "N/A"}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Button>

            <Button
              onClick={() => navigate("/")}
              className="button-gradient text-white flex items-center gap-2"
            >
              <BookOpen size={16} />
              <span>Create New Quiz</span>
            </Button>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Spark Quiz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Results;
