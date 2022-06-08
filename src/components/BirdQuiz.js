import { useEffect, useState } from 'react';
import birds from '../birdInfo/species.js';
import ReactPlayer from 'react-player';
import './BirdQuiz.css';
import bImage from "../unknown_bird.png";
import WinScreen from './WinScreen.js';
import Button from '@mui/material/Button';
import RadioButtonsGroup from './RadioButtonQuiz.js';

/*
Instant form field borda användas för att markera om man gissar fel

*/

function generateBird(setBirdObj, usedBirds) {
    let keys = Object.keys(birds);
    let usedKeys = Object.keys(birds).filter(key => usedBirds.includes(birds[key]));
    keys = keys.filter((item) => !usedKeys.includes(item));
    const bird = birds[keys[ keys.length * Math.random() << 0]];
    setBirdObj(bird);
}

function BirdQuiz () {
    const [searchString, setSearchString] = useState("");
    const [birdObj, setBirdObj] = useState(Object);
    const [birdImage, setBirdImage] = useState(bImage);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isWinScreen, setIsWinScreen] = useState(false);
    const [usedBirds, setUsedBirds] = useState([]);
    const [easyMode, setEasyMode] = useState(false);
    const [totalPoints, setTotalPoints] = useState(0);

    const handleChange = (e) => {
        setSearchString(e.target.value);
    };

    const toggleWinScreen = () => {
        setIsWinScreen(!isWinScreen);
    }

    const handleClick = () => {
        const birdName = Object.values(birdObj)[0].toLowerCase();
        if (birdName === searchString.toLowerCase()) {
            setIsCorrect(true);
            setTotalPoints(totalPoints+1);
            toggleWinScreen();
        }
    };

    const toggleEasyMode = () => {
        setEasyMode(!easyMode);
    };

    const newBird = () =>  {
        let tempUsedBirds = usedBirds;
        tempUsedBirds.push(birdObj);
        setUsedBirds(tempUsedBirds);
        toggleWinScreen();
        setIsCorrect(false);
        setSearchString("");
        generateBird(setBirdObj, usedBirds);
    }

    const generateOptions = ()  => {
        const optionsList = [];
        optionsList.push(birdObj);

        for(let i=0; i<2; i++){
            let keys = Object.keys(birds);
            let usedKeys = Object.keys(birds).filter(key => usedBirds.includes(birds[key]));
            keys = keys.filter((item) => !usedKeys.includes(item) && !optionsList.includes(item));
            console.log("Keys: ",keys);
            optionsList.push(birds[keys[ keys.length * Math.random() << 0]]);
        }
        return optionsList;
    }

    useEffect(() => {
        generateBird(setBirdObj, usedBirds);
        console.log(birdImage);
      }, []);

    return (
        <div className='birdquiz-wrapper'>
            <button style={{position:'fixed', top:'10px', right:'10px'}} onClick={toggleEasyMode}>Ändra svårighet</button>
            <h1>Du har {totalPoints} av {Object.keys(birds).length} poäng!</h1>
            <ReactPlayer style={{margin:"5%"}} height={"40px"} width={"90%"} url = {Object.values(birdObj)[1]} controls={true}/>
            {easyMode && 
            <div>
                <img src={Object.values(birdObj)[2]}></img>
                <RadioButtonsGroup birdList={generateOptions()} />
            </div>
                }
            {!easyMode && 
            <div>
                <img src={birdImage}></img>
                <input style={{width:"90%", height:"40px", margin:"3%"}} placeholder='Skriv art...' type="text" value={searchString} onChange={handleChange}/>
            </div>}
            
            <button style={{width:"90%", height:"40px", margin:"5%"}} onClick={handleClick}>Gissa</button>
            {isWinScreen && <WinScreen
                content={
                    <div>
                        <img style={{width: "40%"}} src={Object.values(birdObj)[2]}></img>
                        <h1>Korrekt!</h1>
                        <button onClick={newBird}>Gissa ny fågel!</button>
                    </div>}
                handleClose={toggleWinScreen}
            />}
        </div>
    )
}

export default BirdQuiz;