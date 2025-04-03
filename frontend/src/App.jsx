import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router"


import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

import Header from "@components/Header/Header";


const App = () => {
  const [url, setUrl] = useState(window.location.href);

  useEffect(() => {
    console.log(url);
    setUrl(url);
  }, [url]);

  return (
    <BrowserRouter>
      {
          url.includes("/login") || url.includes("/register") ? ("") : (<Header />) 
      }
      <Router />
    </BrowserRouter>
  );
};

export default App;
