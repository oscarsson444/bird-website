import * as React from 'react';
import { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function RadioButtonsGroup({birdList, setRadioValue}) {
  const [value, setValue] = useState(birdList[0].name);

  const handleChange = (event) => {
    setValue(event.target.value);
    const chosenBird = birdList.find(bird => bird.name === event.target.value);
    setRadioValue(chosenBird);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value={birdList[0].name} control={<Radio />} label={birdList[0].name} />
        <FormControlLabel value={birdList[1].name} control={<Radio />} label={birdList[1].name} />
        <FormControlLabel value={birdList[2].name} control={<Radio />} label={birdList[2].name} />
      </RadioGroup>
    </FormControl>
  );
}