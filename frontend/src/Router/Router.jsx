import { Routes, Route } from "react-router-dom";

import HomePage from "@pages/HomePage/HomePage";
import LoginPage from "@pages/LoginPage/LoginPage";
import RegisterPage from "@pages/RegisterPage/RegisterPage";
import NoPage from "@pages/NoPage/NoPage";
import LibrarianPage from "@pages/LibrarianPage/LibrarianPage";
import AdminPage from "@pages/AdminPage/AdminPage";
import DashboardPage from "@pages/DashboardPage/DashboardPage";

const Router = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/librarian" element={<LibrarianPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default Router;
