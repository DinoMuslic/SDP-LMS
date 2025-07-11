import { Routes, Route } from "react-router-dom";

import LoginPage from "@pages/LoginPage/LoginPage";
import RegisterPage from "@pages/RegisterPage/RegisterPage";
import HomePage from "@pages/HomePage/HomePage";
import BooksPage from "@pages/BooksPage/BooksPage";
import ProfilePage from "@pages/ProfilePage/ProfilePage";
import StudentsPage from "@pages/StudentsPage/StudentsPage";
import BorrowingsPage from "@pages/BorrowingsPage/BorrowingsPage";
import DashboardPage from "@pages/DashboardPage/DashboardPage";
import NoPage from "@pages/NoPage/NoPage";

const Router = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/borrowings" element={<BorrowingsPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default Router;
