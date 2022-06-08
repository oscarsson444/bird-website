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

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

const generateOptions = (birdObj, usedBirds)  => {
    const optionsList = [];
    optionsList.push(birdObj);

    for(let i=0; i<2; i++){
        const availableBirds = birds.filter((bird) => !usedBirds.includes(bird) && !optionsList.includes(bird));
        optionsList.push(availableBirds[availableBirds.length * Math.random() << 0]);
    }
    return shuffle(optionsList);
}

/**
 * Randomly selects the next bird of the quiz
 * @param {Function} setBirdObj Sets the current bird of the quiz
 * @param {Array} usedBirds List of all the already guessed birds
 */
function generateBird(setBirdObj, setOptionsList, usedBirds) {
    const availableBirds = birds.filter(bird => !usedBirds.includes(bird));
    const birdObj = birds[availableBirds.length * Math.random() << 0];
    setOptionsList(generateOptions(birdObj, usedBirds));
    setBirdObj(birdObj);
}

function BirdQuiz () {
    const [searchString, setSearchString] = useState("");
    const [birdObj, setBirdObj] = useState(Object);
    const [birdImage, setBirdImage] = useState(bImage); // Torde vara onödig
    const [isCorrect, setIsCorrect] = useState(false);
    const [isWinScreen, setIsWinScreen] = useState(false);
    const [usedBirds, setUsedBirds] = useState([]);
    const [easyMode, setEasyMode] = useState(false);
    const [totalPoints, setTotalPoints] = useState(0);
    const [optionsList, setOptionsList] = useState([]);
    const [radioValue, setRadioValue] = useState({});

    const handleChange = (e) => {
        setSearchString(e.target.value);
    };

    const toggleWinScreen = () => {
        setIsWinScreen(!isWinScreen);
    }

    const handleClick = () => {
        const birdName = Object.values(birdObj)[0].toLowerCase();
        if (birdName === searchString.toLowerCase() || radioValue === birdObj) {
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
        generateBird(setBirdObj, setOptionsList, usedBirds);
    }

    useEffect(() => {
        generateBird(setBirdObj, setOptionsList, usedBirds);
      }, []);

    return (
        <div className='birdquiz-wrapper'>
            <button style={{position:'fixed', top:'10px', right:'10px'}} onClick={toggleEasyMode}>Ändra svårighet</button>
            <h1>Du har {totalPoints} av {birds.length} poäng!</h1>
            <ReactPlayer style={{margin:"5%"}} height={"40px"} width={"90%"} url = {Object.values(birdObj)[1]} controls={true}/>
            {easyMode && 
            <div>
                <img src={Object.values(birdObj)[2]}></img>
                <RadioButtonsGroup birdList={optionsList} setRadioValue={setRadioValue} />
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