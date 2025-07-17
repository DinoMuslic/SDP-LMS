import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Router from "./Router/Router";
import Header from "@components/Header/Header";
import { AuthProvider, useAuth } from "./auth/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </BrowserRouter>
);

const AppContent = () => {
  const location = useLocation();
  const { loading } = useAuth();
  const [url, setUrl] = useState(window.location.href);

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {url.includes("/login") || url.includes("/register") ? null : <Header />}
      <Router />
    </>
  );
};

export default App;