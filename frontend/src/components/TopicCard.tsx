import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

type TopicCardProps = {
  topic: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
};

const TopicCard = ({
  topic,
  description,
  icon,
  onClick,
  disabled,
}: TopicCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-full bg-quiz-purple/10 text-quiz-purple">
            {icon}
          </div>
          <h3 className="text-lg font-medium">{topic}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent hover:text-quiz-purple flex items-center gap-1"
          onClick={onClick}
          disabled={disabled}
        >
          <span>Start Quiz</span>
          <ArrowRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TopicCard;
