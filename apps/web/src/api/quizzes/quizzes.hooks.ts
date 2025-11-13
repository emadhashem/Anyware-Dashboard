import { useQuery } from "@tanstack/react-query";
import { getAllQuizzes, getUpcomingQuizzes } from "./quizzes.service";

const QUIZZES_KEY = "quizzes";

export const useGetUpcomingQuizzes = (limit: number) => {
  return useQuery({
    queryKey: [QUIZZES_KEY, "upcoming", limit],
    queryFn: () => getUpcomingQuizzes(limit),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetAllQuizzes = (page: number, limit: number) => {
  return useQuery({
    queryKey: [QUIZZES_KEY, page, limit],
    queryFn: () => getAllQuizzes({ page, limit }),
    staleTime: 1000 * 60 * 5,
  });
};
