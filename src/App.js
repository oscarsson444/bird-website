import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import birds from './birdInfo/species.js';
import BirdQuiz from './components/BirdQuiz';
import background from "./bakgrund_skog.jpg";

function App() {
    const url = "https://sv.wikipedia.org/w/api.php?" +
    new URLSearchParams({
        origin: "*",
        action: "query",
        prop: "extracts",
        exintro: 1,
        titles: "koltrast",
        explaintext: 1,
        exsectionformat: "plain",
        format: "json"
    });
    
    axios.get(url).then((response) => {
      const id = Object.keys(response.data.query.pages)[0];
      console.log(response.data.query.pages[id].extract);
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