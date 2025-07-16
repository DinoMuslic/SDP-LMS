import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Router from "./Router/Router";
import Header from "@components/Header/Header";
import { AuthProvider } from "./auth/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => (
  <BrowserRouter basename={import.meta.env.VITE_FRONTEND_URL}>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </BrowserRouter>
);

const AppContent = () => {
  const location = useLocation();
  const [url, setUrl] = useState(window.location.href);

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <>
      {url.includes("/login") || url.includes("/register") ? null : <Header />}
      <Router />
    </>
  );
};

export default App;