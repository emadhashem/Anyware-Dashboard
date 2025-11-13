import type { TPaginationResponse } from "../api-common.types";
import { api } from "../api-constants";
import type { TAnnouncement } from "./announcements.types";

export const getLatestAnnouncements = async (limit: number) => {
  try {
    const { data } = await api.get<TAnnouncement[]>(`/announcements/latest`, {
      params: { limit },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllAnnouncements = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const { data } = await api.get<TPaginationResponse<TAnnouncement>>(
      `/announcements`,
      {
        params: { page, limit },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};
