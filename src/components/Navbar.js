import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">Startsida</Link>
            <ul>
                <li>
                    <Link to="/quiz">Quiz</Link>
                </li>
                <li>
                    <Link to="/search">Sök art</Link>
                </li>
            </ul>

        </nav>
    )
}