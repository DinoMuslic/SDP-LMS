import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "@pages/LoginPage/LoginPage";
import RegisterPage from "@pages/RegisterPage/RegisterPage";
import HomePage from "@pages/HomePage/HomePage";
import BooksPage from "@pages/BooksPage/BooksPage";
import ProfilePage from "@pages/ProfilePage/ProfilePage";
import BorrowingsPage from "@pages/BorrowingsPage/BorrowingsPage";
import DashboardPage from "@pages/DashboardPage/DashboardPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />

      <Route element={<ProtectedRoute allowedRoles={["student", "admin", "librarian"]} />}>
        <Route path="/books" element={<BooksPage />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["librarian"]} />}>
        <Route path="/borrowings" element={<BorrowingsPage />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<HomePage  />} />
    </Routes>
  );
};

export default Router;
