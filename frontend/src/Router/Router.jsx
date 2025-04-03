import { Routes, Route } from "react-router-dom";

import HomePage from "@pages/HomePage/HomePage";
import LoginPage from "@pages/LoginPage/LoginPage";
import NoPage from "@pages/NoPage/NoPage";

const Router = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default Router;
