import type { TPaginationResponse } from "../api-common.types";
import { api } from "../api-constants";
import type { TQuiz } from "./quizzes.types";

export const getUpcomingQuizzes = async (limit: number) => {
  try {
    const { data } = await api.get<TQuiz[]>(`/quizzes/upcoming`, {
      params: {
        limit,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllQuizzes = async ({
  page,
  limit = 10,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const { data } = await api.get<TPaginationResponse<TQuiz>>(`/quizzes`, {
      params: {
        limit,
        page,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
