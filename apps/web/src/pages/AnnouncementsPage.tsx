import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useGetAllAnnouncements } from "@/api/announcements/announcements.hooks";
import AnnouncementSkeleton from "@/components/app/announcements/AnnouncementSkeleton";
import AnnouncementCard from "@/components/app/announcements/AnnouncementCard";
import CustomPagination from "@/components/app/CustomPagination";
import { useTranslation } from "react-i18next"; // Import hook

export default function AnnouncementsPage() {
  const { t } = useTranslation(); // Initialize hook
  const [page, setPage] = useState(1);
  const { data, isPending } = useGetAllAnnouncements(page, 10);
  const announcements = data?.data || [];
  const pagination = data?.pagination || {
    totalCount: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };
  return (
    <div className="space-y-4">
      {/* Back button */}
      <Button asChild variant="ghost" className="pl-0 text-muted-foreground">
        <Link to="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.backToDashboard")}
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{t("announcements.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isPending
            ? Array(5).map((_, i) => <AnnouncementSkeleton key={i} />)
            : announcements.map((item) => (
                <AnnouncementCard key={item._id} announcement={item} />
              ))}
        </CardContent>
        <CardFooter>
          <CustomPagination
            page={pagination.page}
            onNext={handleNextPage}
            onPrevious={handlePrevPage}
            totalPages={pagination.totalPages}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
