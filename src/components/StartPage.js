import BirdQuiz from "./BirdQuiz"
import "./StartPage.css"
import { Link } from "react-router-dom";

export default function StartPage () {

   return (
        <div className="bg">
            <nav className="start-page">
                <Link className="side-button" to="/quiz">Quiz</Link>
                <Link className="side-button" to="/search">Sök fågelart</Link>
            </nav>
        </div>
   )
}