import { useEffect, useState } from 'react';
import birds from '../birdInfo/species.js';
import ReactPlayer from 'react-player';
import './BirdQuiz.css';
import WinScreen from './WinScreen.js';
import Button from '@mui/material/Button';
import RadioButtonsGroup from './RadioButtonQuiz.js';
import bImage from "../unknown_bird.png";
import DifficultySelector from './DifficultySelector.js';

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
    const birdObj = availableBirds[availableBirds.length * Math.random() << 0];
    setOptionsList(generateOptions(birdObj, usedBirds));
    setBirdObj(birdObj);
}

function BirdQuiz () {
    const [searchString, setSearchString] = useState("");
    const [birdObj, setBirdObj] = useState(Object);
    const [isWinScreen, setIsWinScreen] = useState(false);
    const [isEndScreen, setIsEndScreen] = useState(false);
    const [isFailScreen, setIsFailScreen] = useState(false);
    const [usedBirds, setUsedBirds] = useState([]);
    const [difficulty, setDifficulty] = useState(0); // 0 is hardest and 2 is easiest
    const [totalPoints, setTotalPoints] = useState(0);
    const [birdsGuessed, setBirdsGuessed] = useState(0);
    const [optionsList, setOptionsList] = useState([]);
    const [radioValue, setRadioValue] = useState({});

    useEffect(() => {
        generateBird(setBirdObj, setOptionsList, usedBirds);
      }, []);

    const handleChange = (e) => {
        setSearchString(e.target.value);
    };

    const toggleWinScreen = () => {
        setIsWinScreen(!isWinScreen);
    }

    const toggleEndScreen = () => {
        setIsEndScreen(!isEndScreen);
    }

    const toggleFailScreen = () => {
        setIsFailScreen(!isFailScreen);
    }

    const handleClick = () => {
        const birdName = Object.values(birdObj)[0].toLowerCase();
        setBirdsGuessed(birdsGuessed + 1);
        const localPoints = birdsGuessed+1;
        if (birdName === searchString.toLowerCase() || radioValue === birdObj) {
            setTotalPoints(totalPoints+1);
            if (localPoints == birds.length - 3) {
                toggleEndScreen();
            }
            else {
                toggleWinScreen();
            }
        }
        else{
            toggleFailScreen();
        }
    };

    const newBird = () =>  {
        let tempUsedBirds = usedBirds;
        tempUsedBirds.push(birdObj);
        setUsedBirds(tempUsedBirds);
        if ( isWinScreen ) { toggleWinScreen() } else { toggleFailScreen() }
        setSearchString("");
        generateBird(setBirdObj, setOptionsList, tempUsedBirds);
    }

    const playAgain = () => {
        setUsedBirds([]);
        toggleEndScreen();
        setSearchString("");
        setTotalPoints(0);
        setBirdsGuessed(0);
        generateBird(setBirdObj, setOptionsList, []);
    }

    const difficultySwitch = (difficulty) => {
        switch(difficulty) {
            case 0: // Hardest difficulty no image, only sound
                return (
                <div>
                    <img src={bImage}></img>
                    <input style={{width:"90%", height:"40px", margin:"3%"}} placeholder='Skriv art...' type="text" value={searchString} onChange={handleChange}/>
                </div>
                );
            case 1: // Easier, now you have picture of bird aswell as sound
                return (
                <div>
                    <img src={Object.values(birdObj)[2]}></img>
                    <input style={{width:"90%", height:"40px", margin:"3%"}} placeholder='Skriv art...' type="text" value={searchString} onChange={handleChange}/>
                </div>
                );
            case 2: // Easiest, both sound, image and options
                return (
                <div>
                    <img src={Object.values(birdObj)[2]}></img>
                    <RadioButtonsGroup birdList={optionsList} setRadioValue={setRadioValue} />
                </div>
                );
        }
    }

    return (
        <div className='bg'>
            <div className='birdquiz-wrapper'>
                <div className='birdquiz'>
                    {isWinScreen && <WinScreen
                        content={
                            <div>
                                <img style={{width: "40%"}} src={Object.values(birdObj)[2]}></img>
                                <h1>Korrekt!</h1>
                                <button onClick={newBird}>Gissa ny fågel!</button>
                            </div>}
                        handleClose={toggleWinScreen}
                    />}

                    {isEndScreen && <WinScreen
                        content={
                            <div>
                                <img style={{width: "40%"}} src={Object.values(birdObj)[2]}></img>
                                <h1>Korrekt!</h1>
                                <h1>Du fick {totalPoints} av {birds.length-3} poäng!</h1>
                                <button onClick={playAgain}>Spela igen?</button>
                            </div>}
                        handleClose={toggleEndScreen}
                    />}

                    {isFailScreen && <WinScreen
                        content={
                            <div>
                                <img style={{width: "40%"}} src={Object.values(birdObj)[2]}></img>
                                <h1>Fel, det var en {Object.values(birdObj)[0]}!</h1>
                                <button onClick={newBird}>Gissa ny fågel!</button>
                            </div>}
                        handleClose={toggleFailScreen}
                    />}

                    <DifficultySelector setDifficulty={setDifficulty} />
                    <h1>Fågel {birdsGuessed + 1} av {birds.length-3}</h1>
                    <ReactPlayer style={{margin:"5%"}} height={"40px"} width={"90%"} url = {Object.values(birdObj)[1]} controls={true}/>

                    {difficultySwitch(difficulty)}

                    <button style={{width:"90%", height:"40px", margin:"5%"}} onClick={handleClick}>Gissa</button>
                </div>
            </div>
        </div>
    )
}

export default BirdQuiz;