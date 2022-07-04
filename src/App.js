import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div style={{'textAlign': 'center'}}>
      <nav>
        <Link className='home-screen-button' to="/quiz">Quiz</Link> |{" "}
        <Link to="/search">Search</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;