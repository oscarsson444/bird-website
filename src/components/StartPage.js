import BirdQuiz from "./BirdQuiz"

export default function StartPage () {

    const handleQuizClick = () => {
        return (
            <BirdQuiz />
        )
    }

    const handleSearchClick = () => {
        return;
    }

    return (
        <div>
            <button onClick={handleQuizClick}>FågelQuiz</button>
            <button onClick={handleSearchClick}>Sök arter</button>
        </div>
    )
}