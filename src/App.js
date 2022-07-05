import './App.css';
import { Route, Routes } from 'react-router-dom';
import StartPage from './components/StartPage';
import BirdQuiz from './components/BirdQuiz';
import SearchSpecies from "./components/SearchSpecies";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<BirdQuiz/>} />
        <Route path="/search" element={<SearchSpecies />} />
      </Routes>
    </div>
  );
}

export default App;