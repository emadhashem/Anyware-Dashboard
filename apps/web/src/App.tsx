import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import DashboardLayout from "./layout/DashboardLayout";
import NotFoundPage from "./pages/NotFoundPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import QuizzesPage from "./pages/QuizzesPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="quizzes" element={<QuizzesPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
