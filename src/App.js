import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import birds from './birdInfo/species.js';
import BirdQuiz from './components/BirdQuiz';
import background from "./bakgrund_skog.jpg";

function App() {

  const url = "https://en.wikipedia.org/w/api.php";
  const title = "Wikipedia:Ringduva";
  const params = {
    'action': "parse",
    'page': title,
    'prop': "wikitext",
    'format': "json"
  };

  

  return (
    <div className='bg'>
      <div className='App'>
        <BirdQuiz />
      </div>
    </div>
  );
}

export default App;