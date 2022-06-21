import './App.css';
import axios from 'axios';
import StartPage from './components/StartPage';
import { Link } from 'react-router-dom';

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
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/quiz">Quiz</Link> |{" "}
          <Link to="/search">Search</Link>
        </nav>
      </div>
    </div>
  );
}

export default App;