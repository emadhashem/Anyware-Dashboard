export type TQuiz = {
  _id: string;
  title: string;
  course: string;
  dueDate: string;
  type: TQuizType;
  createdAt: string;
  updatedAt: string;
};

export type TQuizType = "Quiz" | "Assignment";
