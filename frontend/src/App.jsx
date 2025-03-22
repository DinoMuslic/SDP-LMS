import axios from "axios";
import React, { useState, useEffect } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";

import "./App.css";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div>
      <h1>Users:</h1>
      {data ? (
        <ul>
          {data.map(user => (
            <li key={user.id}>
              {user.first_name} {user.last_name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
