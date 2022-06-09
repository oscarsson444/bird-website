import { useState } from 'react';


export default function DifficultySelector ({setDifficulty}) {
    const [difficultyText, setDifficultyText] = useState("Svår");

    return (
        <div>
            <p>Svårighetsgrad: {difficultyText}</p>
            <button onClick={() => {
                setDifficultyText("Svår");
                setDifficulty(0);
            }}>Svår</button>
            <button onClick={() => {
                setDifficultyText("Medel");
                setDifficulty(1);
            }}>Medel</button>
            <button onClick={() => {
                setDifficultyText("Lätt");
                setDifficulty(2);
            }}>Lätt</button>
        </div>
    );
}