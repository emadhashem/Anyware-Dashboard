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
import { useGetAllQuizzes } from "@/api/quizzes/quizzes.hooks";
import QuizSkeleton from "@/components/app/quizzes/QuizSkeleton";
import QuizCard from "@/components/app/quizzes/QuizCard";
import CustomPagination from "@/components/app/CustomPagination";
import { useTranslation } from "react-i18next";

export default function QuizzesPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isPending } = useGetAllQuizzes(page, 9);
  const quizzes = data?.data || [];
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
      <Button asChild variant="ghost" className="pl-0 text-muted-foreground">
        <Link to="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.backToDashboard")}
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{t("quizzes.title")}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isPending
            ? Array(5).map((_, i) => <QuizSkeleton key={i} />)
            : quizzes.map((item) => <QuizCard key={item._id} data={item} />)}
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
