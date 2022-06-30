import { useState } from 'react';
import birds from '../birdInfo/species';
import "./SearchSpecies.css";
import ReactPlayer from 'react-player';


const BirdItem = ({name, audio, image}) => {
    return (
        <div className='birdItem'>
            <div className='birdImage'>
                <img src={image}/>
            </div>
            <div className='birdText'>
                <h3>{name}</h3>
                
            </div>
            <ReactPlayer height={"40px"} width={"50%"} url = {audio} controls={true}/>
        </div>
    )
}

function match(searchString){
    return function(bird){
        const lowerCaseSearchString = searchString.toLowerCase();
        const lowerCaseBirdName = bird.name.toLowerCase();
        if (lowerCaseSearchString.length == 0){
            return true;
        }
        else{
            return lowerCaseBirdName.indexOf(lowerCaseSearchString) === 0;
        }   
  }
}

export default function SearchSpecies () {
    const [searchString, setSearchString] = useState("");

    const handleChange = (e) => {
        setSearchString(e.target.value);
    };

    let searchedBirds = [];

    if(searchString.length == 0){
        searchedBirds = birds.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }
    else{
        searchedBirds = birds.filter(match(searchString));
        searchedBirds.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }

    return (
        <div className='wrapper'>
            <input placeholder='Skriv art...' type="text" value={searchString} onChange={handleChange}/>
            {searchedBirds.map((birdObj) => (
                <BirdItem
                key={birdObj.name}
                name={birdObj.name}
                audio={birdObj.audio}
                image={birdObj.image}
                />
            ))}
        </div>
    )
}