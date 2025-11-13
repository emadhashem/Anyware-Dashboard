import type { TQuiz } from "@/api/quizzes/quizzes.types";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock } from "lucide-react";
import { format } from "date-fns";

type TProps = {
  data: TQuiz;
};

function QuizCard({ data }: TProps) {
  return (
    <div key={data._id} className="p-4 bg-secondary/50 rounded-lg">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 bg-background rounded-md">
          {data.type === "Quiz" ? (
            <Clock size={16} className="text-primary" />
          ) : (
            <BookOpen size={16} className="text-primary" />
          )}
        </div>
        <span className="text-sm font-medium text-foreground">
          {data.title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground ml-1">
        Course: {data.course}
      </p>
      <p className="text-sm text-muted-foreground ml-1">
        Due: {format(data.dueDate, "HH:mm dd/MM/yyyy")}
      </p>
      <Button
        variant={data.type === "Quiz" ? "default" : "outline"}
        className="w-full mt-4"
      >
        {data.type === "Quiz" ? "Start Quiz" : "Solve Assignment"}
      </Button>
    </div>
  );
}

export default QuizCard;
