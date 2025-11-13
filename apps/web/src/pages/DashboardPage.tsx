import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useGetUpcomingQuizzes } from "@/api/quizzes/quizzes.hooks";
import QuizCard from "@/components/app/quizzes/QuizCard";
import QuizSkeleton from "@/components/app/quizzes/QuizSkeleton";
import { useGetLatestAnnouncements } from "@/api/announcements/announcements.hooks";
import AnnouncementSkeleton from "@/components/app/announcements/AnnouncementSkeleton";
import AnnouncementCard from "@/components/app/announcements/AnnouncementCard";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { t } = useTranslation();
  const { data: upcomingQuizzes, isPending: isPendingQuizzes } =
    useGetUpcomingQuizzes(3);
  const { data: announcements, isPending: isPendingAnnouncements } =
    useGetLatestAnnouncements(5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <Card className="bg-linear-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 border-teal-200 dark:border-teal-800 shadow-sm overflow-hidden">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-teal-800 dark:text-teal-100">
                {t("dashboard.examsTitle")}
              </h2>
              <p className="text-muted-foreground mt-2 max-w-md">
                {t("dashboard.examsDesc")}
              </p>
              <div className="w-full text-start my-4">
                <p className="italic text-sm text-gray-400">
                  "{t("dashboard.examsQuote")}" – Albert Einstein
                </p>
              </div>
              <Button className="mt-4 bg-teal-600 hover:bg-teal-700 text-white">
                {t("dashboard.viewTips")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{t("dashboard.announcements")}</CardTitle>
              <Button
                variant="link"
                className="text-primary font-bold cursor-pointer"
                asChild
              >
                <Link to="announcements">{t("dashboard.all")}</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {isPendingAnnouncements ? (
              <AnnouncementSkeleton />
            ) : (
              announcements?.map((item) => (
                <AnnouncementCard key={item._id} announcement={item} />
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{t("dashboard.whatsDue")}</CardTitle>
              <Button
                variant="link"
                className="text-primary font-bold cursor-pointer"
                asChild
              >
                <Link to="quizzes">{t("dashboard.all")}</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {isPendingQuizzes ? (
              <QuizSkeleton />
            ) : (
              upcomingQuizzes?.map((item) => (
                <QuizCard key={item._id} data={item} />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
