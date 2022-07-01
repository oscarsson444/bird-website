import { useState } from "react";
import birds from "../birdInfo/species";
import "./SearchSpecies.css";
import ReactPlayer from "react-player";
import useCollapse from "react-collapsed";
import axios from 'axios';

function Collapsible({name}) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const [information, setInformation] = useState("");
    const url = "https://sv.wikipedia.org/w/api.php?" +
    new URLSearchParams({
        origin: "*",
        action: "query",
        prop: "extracts",
        exintro: 1,
        titles: name,
        explaintext: 1,
        exsectionformat: "plain",
        format: "json"
    });
    
    axios.get(url).then((response) => {
      const id = Object.keys(response.data.query.pages)[0];
      setInformation(response.data.query.pages[id].extract);
      console.log(response.data.query.pages[id].extract);
    });

return (
    <div className="collapsible">
        <div className="header" {...getToggleProps()}>
            {isExpanded ? 'Visa mindre' : 'Visa mer'}
        </div>
        <div {...getCollapseProps()}>
            <div className="content">
                {information}
            </div>
        </div>
    </div>
    );
}

const BirdItem = ({ name, audio, image }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="birdItem">
      <div className="birdImage">
        <img src={image} />
      </div>
      <div className="birdText">
        <h3>{name}</h3>
      </div>
      <ReactPlayer
      style={{"marginLeft": "25%", "paddingBottom": "5%"}}
          height={"40px"}
          width={"50%"}
          url={audio}
          controls={true}
        />
        <Collapsible name={name}/>
    </div>
  );
};

function match(searchString) {
  return function (bird) {
    const lowerCaseSearchString = searchString.toLowerCase();
    const lowerCaseBirdName = bird.name.toLowerCase();
    if (lowerCaseSearchString.length == 0) {
      return true;
    } else {
      return lowerCaseBirdName.indexOf(lowerCaseSearchString) === 0;
    }
  };
}

export default function SearchSpecies() {
  const [searchString, setSearchString] = useState("");

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  let searchedBirds = [];

  if (searchString.length == 0) {
    searchedBirds = birds.sort(function (a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  } else {
    searchedBirds = birds.filter(match(searchString));
    searchedBirds.sort(function (a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }

  return (
    <div className="wrapper">
      <input
        placeholder="Skriv art..."
        type="text"
        value={searchString}
        onChange={handleChange}
      />
      {searchedBirds.map((birdObj) => (
        <BirdItem
          key={birdObj.name}
          name={birdObj.name}
          audio={birdObj.audio}
          image={birdObj.image}
        />
      ))}
    </div>
  );
}
