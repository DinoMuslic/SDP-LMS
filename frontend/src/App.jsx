import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./App.css"

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from Express.js server
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div>
      <h1>Data from Server:</h1>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App
