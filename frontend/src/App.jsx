import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router"
import Toast from "@components/Toast/Toast";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

import Header from "@components/Header/Header";

const App = () => {
  let url = window.location.href;

  return (
    <BrowserRouter>
      {
          url.includes("/login") ? ("") : (<Header />) 
      }
      <Router />
    </BrowserRouter>
  );
};

export default App;
