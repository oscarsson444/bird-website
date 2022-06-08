import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import birds from './birdInfo/species.js';
import BirdQuiz from './components/BirdQuiz';

function App() {

  return (
    <div className='App'>
      <BirdQuiz/>
    </div>
  );
}

export default App;