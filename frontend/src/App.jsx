import { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Router from "./Router/Router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "@components/Header/Header";

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

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
