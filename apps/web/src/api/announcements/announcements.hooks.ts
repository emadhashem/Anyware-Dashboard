import { useQuery } from "@tanstack/react-query";
import {
  getAllAnnouncements,
  getLatestAnnouncements,
} from "./announcements.service";

export const ANNOUNCEMENTS_KEY = "announcements";

export const useGetLatestAnnouncements = (limit: number) => {
  return useQuery({
    queryKey: [ANNOUNCEMENTS_KEY, "latest", limit],
    queryFn: () => getLatestAnnouncements(limit),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetAllAnnouncements = (page: number, limit: number) => {
  return useQuery({
    queryKey: [ANNOUNCEMENTS_KEY, page, limit],
    queryFn: () => getAllAnnouncements({ page, limit }),
    staleTime: 1000 * 60 * 5,
  });
};
