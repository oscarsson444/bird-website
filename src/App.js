import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import birds from './birdInfo/species.js';
import BirdQuiz from './components/BirdQuiz';
import background from "./bakgrund_skog.jpg";

function App() {

  const url = "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
        origin: "*",
        action: "query",
        prop: "extracts",
        exsentences: 10,
        exlimit: 1,
        titles: "Pet door",
        explaintext: 1,
        formatversion: 2,
        format: "json"
    });

    axios.get(url).then((response) => {
      console.log(response);
    });
    
  

  return (
    <div className='bg'>
      <div className='App'>
        <BirdQuiz />
      </div>
    </div>
  );
}

export default App;