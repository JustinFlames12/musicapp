import logo from './logo.svg';
import './App.css';
import React, { useState} from "react";
// import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';
import SnackbarContent from '@mui/material/SnackbarContent';
import path from 'path-browserify';

function App() {
  const toggleKeyName = () => {
    var keyFormat = document.getElementById('keySigBtn');
    if(keyFormat.textContent === 'Flats'){
      keyFormat.textContent = 'Sharps';
      document.getElementById('keyDis1').textContent = 'G#';
      document.getElementById('keyDis3').textContent = 'A#';
      document.getElementById('keyDis6').textContent = 'C#';
      document.getElementById('keyDis8').textContent = 'D#';
      document.getElementById('keyDis11').textContent = 'F#';
    }
    else{
      keyFormat.textContent = 'Flats';
      document.getElementById('keyDis1').textContent = 'Ab';
      document.getElementById('keyDis3').textContent = 'Bb';
      document.getElementById('keyDis6').textContent = 'Db';
      document.getElementById('keyDis8').textContent = 'Eb';
      document.getElementById('keyDis11').textContent = 'Gb';
    }
  };

  const [tempoValue, setTempoValue] = useState(80);
  const [lodValue, setLodValue] = useState(0);
  const fs = require('fs');
  
  const handleTempoChange = (event) => {
    setTempoValue(event.target.value);
  };

  const handleLodChange = (event) => {
    setLodValue(event.target.value);
  };

  const [selectedPlaylistOption, setSelectedPlaylistOption] = useState("");

  const handlePlaylistChange = (event) => {
    setSelectedPlaylistOption(event.target.value);
    if(event.target.value !== "Select..."){
      setLoadSongBtnDisabled(false);
    }
    else{
      setLoadSongBtnDisabled(true);
    }
  };

  var [earsketchInput, setEarsketchInput] = useState("");
  var keySigValue = 0;
  const [copyBtnDisabled, setIsCopyBtnDisabled] = useState(true);
  var [randomSongChosen, setRandomSongChosen] = useState("");
  // var randomSongChosenNumber = 0;
  var [randomSongChosenNumber, setRandomChosenNumber] = useState(0);
  var [PlayBtnDisabled, setPlayBtnDisabled] = useState(true);
  var [PauseBtnDisabled, setPauseBtnDisabled] = useState(true);
  var [RestartBtnDisabled, setRestartBtnDisabled] = useState(true);
  var [LoadSongBtnDisabled, setLoadSongBtnDisabled] = useState(true);

  var songlist = { 1:{0: 'Holy_Holy_Holy', 1: 'Abide_With_Me', 2: 'Amazing_Grace', 3: 'God_Is_So_Good', 4: 'Fairest_Lord_Jesus',
      5: 'Crown_Him_With_Many_Crowns'},
      2: {0: 'Clementine', 1: 'Go_Tell_Aunt_Rhody', 2: 'Hot_Cross_Buns', 3: 'Mary_Had_A_Little_Lamb', 4: 'Twinkle_Twinkle_Little_Star'}
    }

var [audio, setAudio] = useState(new Audio(""));
var [audioInstance, setAudioInstance] = useState(null);

const [isPlaying, setIsPlaying] = useState(false);

const [audioFile, setAudioFile] = useState("/audio/file1.mp3");

const playAudio = () => {
  // console.log(audios[`${songlist[document.getElementById("dropdown").value][randomSongChosenNumber]}_${tempoValue}_${keySigValue}_${lodValue}`]);
  // console.log(randomSongChosenNumber);
  // const audio = new Audio(audios[`${songlist[randomSongChosenNumber]}_${tempoValue}_${keySigValue}_${lodValue}`]);
  if(audioInstance !== null){
    audioInstance.play();
  }
  else{
    audio = new Audio(audios[`${randomSongChosen}_${tempoValue}_${keySigValue}_${lodValue}`]);
    audio.load();
    audio.play();
    setAudioInstance(audio); 
  }
  setPlayBtnDisabled(true);
  setPauseBtnDisabled(false);
  setRestartBtnDisabled(false);
  audio.onended = () => {
  setPlayBtnDisabled(false);
  setPauseBtnDisabled(true);
  setRestartBtnDisabled(true);
  }
};

const pauseAudio = () => {
  audioInstance.pause();
  setPlayBtnDisabled(false);
  setPauseBtnDisabled(true);
  setRestartBtnDisabled(false);
};

const restartAudio = () => {
  audioInstance.pause();
  setAudioInstance(null);
  audioInstance = null;
  if(PlayBtnDisabled){
    playAudio();
  }
}

const audios = {
  "Abide_With_Me_80_0_0": require("./audio_files/Abide_With_Me_80_0_0.mp3"),
  "Amazing_Grace_80_0_0": require("./audio_files/Amazing_Grace_80_0_0.mp3"),
  "Crown_Him_With_Many_Crowns_80_0_0": require("./audio_files/Crown_Him_With_Many_Crowns_80_0_0.mp3"),
  "Fairest_Lord_Jesus_80_0_0": require("./audio_files/Fairest_Lord_Jesus_80_0_0.mp3"),
  "God_Is_So_Good_80_0_0": require("./audio_files/God_Is_So_Good_80_0_0.mp3"),
  "Holy_Holy_Holy_80_0_0": require("./audio_files/Holy_Holy_Holy_80_0_0.mp3"),
  "Clementine_80_0_0": require("./audio_files/Clementine_80_0_0.mp3"),
  "Go_Tell_Aunt_Rhody_80_0_0": require("./audio_files/Go_Tell_Aunt_Rhody_80_0_0.mp3"),
  "Hot_Cross_Buns_80_0_0": require("./audio_files/Hot_Cross_Buns_80_0_0.mp3"),
  "Mary_Had_A_Little_Lamb_80_0_0": require("./audio_files/Mary_Had_A_Little_Lamb_80_0_0.mp3"),
  "Twinkle_Twinkle_Little_Star_80_0_0": require("./audio_files/Twinkle_Twinkle_Little_Star_80_0_0.mp3"),

};

var [filePath, setFilePath] = useState(""); // Example file path
const [fileExists, setFileExists] = useState(null);
 const checkFile = async () => {
    try {
      const response = await fetch("http://localhost:5000/check-song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({ filePath }),
      });

      const data = await response.json();
    
      if(data === true){
        console.log('File exists.');
        setAudioFile(filePath);
        // console.log(filePath);
        document.getElementById("Earsketch-iframe-div").style.display = "none";
        document.getElementById('Earsketch-iframe').src = document.getElementById('Earsketch-iframe').src;
        setPlayBtnDisabled(false);
        setPauseBtnDisabled(true);
        setRestartBtnDisabled(true);
        // playAudio(filePath);
      }
      else{
        console.log('File does not exist. Using Earsketch audio.');
        setIsCopyBtnDisabled(false);
        document.getElementById("Earsketch-iframe-div").style.display = "block";
        document.getElementById('Earsketch-iframe').src = document.getElementById('Earsketch-iframe').src;
        setPlayBtnDisabled(true);
        setPauseBtnDisabled(true);
        setRestartBtnDisabled(true);
      }
    } catch (error) {
      console.error("Error checking file:", error);
    }
  };

  const getEarsketchInput = async () => {
    
    if(document.getElementById('key1').checked) {
      keySigValue = -9;
    } 
    else if(document.getElementById('key2').checked) {
      keySigValue = -8;
    }
    else if(document.getElementById('key3').checked) {
      keySigValue = -7;
    }
    else if(document.getElementById('key4').checked) {
      keySigValue = -6;
    }
    else if(document.getElementById('key5').checked) {
      keySigValue = -5;
    }
    else if(document.getElementById('key6').checked) {
      keySigValue = -4;
    }
    else if(document.getElementById('key7').checked) {
      keySigValue = -3;
    }
    else if(document.getElementById('key8').checked) {
      keySigValue = -2;
    }
    else if(document.getElementById('key9').checked) {
      keySigValue = -1;
    }
    else if(document.getElementById('key10').checked) {
      keySigValue = 0;
    }
    else if(document.getElementById('key11').checked) {
      keySigValue = 1;
    }
    else if(document.getElementById('key12').checked) {
      keySigValue = 2;
    }

    chooseRandomSong();
    earsketchInput = `${tempoValue},${keySigValue},${lodValue},${randomSongChosenNumber},${document.getElementById("dropdown").value}`;
    var earsketchTextInput = document.getElementById("earsketchTextInput");
    earsketchTextInput.value = earsketchInput;

    var songFile = path.join(__dirname, 'src', 'audio_files', `${songlist[document.getElementById("dropdown").value][randomSongChosenNumber]}_${tempoValue}_${keySigValue}_${lodValue}.mp3`);
    setFilePath(songFile);
    filePath = songFile;
    checkFile();

    if(audioInstance){
    audioInstance.pause();
    setAudioInstance(null);
    audioInstance = null;
    }
    
    
    // Get the document of the iframe
    // let iframeDoc = iframe.contentWindow.document;

    // Run JavaScript inside the iframe's context
    // iframeDoc.body.style.backgroundColor = "lightblue"; // Changes background inside iframe

    // document.querySelector('button[title="Play"]').click();
    // document.querySelector('input.form-input.w-full').value = '100,-2,0';
    // document.querySelector('input[value="OKAY"]').click(); //document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, code: 'Enter' }));
    // document.querySelector('button[title="Play"]').click();

  };

  const handleCopy = () => {
    var earsketchTextInput = document.getElementById("earsketchTextInput");
    navigator.clipboard.writeText(earsketchTextInput.value).then(() => {
      // alert(`Text copied to clipboard!\nValue: ${earsketchTextInput.value}`);
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  };

  const levenshteinDistance = (str1, str2) => {
    const len1 = str1.length;
    const len2 = str2.length;
    const dp = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(null));

    for (let i = 0; i <= len1; i++) {
        for (let j = 0; j <= len2; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + (str1[i - 1] === str2[j - 1] ? 0 : 1)
                );
            }
        }
    }
    return dp[len1][len2];
}

  const getScore = async () => {
    var guessTextInput = document.getElementById("guessTextField");
    var randomSongChosenClean = randomSongChosen.replaceAll('_', ' ').toUpperCase();
    var guessTextInputClean = guessTextInput.value.toUpperCase();

    // Compare user's guess against song title
    const maxLen = Math.max(randomSongChosenClean.length, guessTextInputClean.length);
    const distance = levenshteinDistance(randomSongChosenClean, guessTextInputClean);
    const guessScore = ((1 - distance / maxLen) * 100).toFixed(2);

    // Create output log
    var score_output_log = {'timestamp': Date.now(), 'tempo': tempoValue, 'key': keySigValue, 
      'level_of_difficulty': lodValue, 
      'browser_information': navigator.userAgent,
      'user_language': navigator.language, 'random_song_chosen': randomSongChosen, 
      'random_song_chosen_number': randomSongChosenNumber, 'user_guess': guessTextInput.value,
      'user_score': guessScore};
    
    var score_output_log_original = score_output_log;
    score_output_log =  JSON.stringify(score_output_log);
    alert(`Guess: ${guessTextInput.value}\nSong Title: ${randomSongChosen}\nScore: ${guessScore}`);
    try {
    const response = await fetch("http://localhost:5000/save-json-2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(score_output_log_original),
    });
    const result = await response.text();
    alert(result); // Show success or error message
  } catch (error) {
    console.error("Error sending JSON:", error);
  }
  };

  const chooseRandomSong = async () => {
    
    // randomSongChosenNumber = Math.floor(Math.random() * Object.keys(songlist).length);
    setRandomChosenNumber(Math.floor(Math.random() * Object.keys(songlist[document.getElementById("dropdown").value]).length));
    console.log(randomSongChosenNumber);
    // console.log(Object.keys(songlist[document.getElementById("dropdown").value]).length);
    randomSongChosen = songlist[document.getElementById("dropdown").value][randomSongChosenNumber];
    setRandomSongChosen(songlist[document.getElementById("dropdown").value][randomSongChosenNumber]);
    console.log(randomSongChosen);
    
    // Create output log
    var output_log = {'timestamp': Date.now(), 'tempo': tempoValue, 'key': keySigValue, 
      'level_of_difficulty': lodValue, 
      'browser_information': navigator.userAgent,
      'user_language': navigator.language, 'random_song_chosen': randomSongChosen, 'random_song_chosen_number': randomSongChosenNumber};

    var output_log_original = output_log;
    output_log =  JSON.stringify(output_log);
  try {
    const response = await fetch("http://localhost:5000/save-json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(output_log_original),
    });
    const result = await response.text();
    alert(result); // Show success or error message
  } catch (error) {
    console.error("Error sending JSON:", error);
  }
  };
  return (
    <div className="App">
      <h2>Guess That Song (Front End UI)</h2>
      <header className="App-header">
      <div className='App-container'>
      <div className='left-side'>
        <div className='Key-Sig-Label'>
        <h5>Key Signature: </h5>
        <input type="radio" id="key1" name="key" value="1"></input>
        <label id='keyDis1' for="key1">Ab</label><br></br>
        <input type="radio" id="key2" name="key" value="2"></input>
        <label id='keyDis2' for="key2">A</label><br></br>
        <input type="radio" id="key3" name="key" value="3"></input>
        <label id='keyDis3' for="key3">Bb</label><br></br>
        <input type="radio" id="key4" name="key" value="4"></input>
        <label id='keyDis4' for="key4">B</label><br></br>
        <input type="radio" id="key5" name="key" value="5"></input>
        <label id='keyDis5' for="key5">C</label><br></br>
        <input type="radio" id="key6" name="key" value="6"></input>
        <label id='keyDis6' for="key6">Db</label><br></br>
        <input type="radio" id="key7" name="key" value="7"></input>
        <label id='keyDis7' for="key7">D</label><br></br>
        <input type="radio" id="key8" name="key" value="8"></input>
        <label id='keyDis8' for="key8">Eb</label><br></br>
        <input type="radio" id="key9" name="key" value="9"></input>
        <label id='keyDis9' for="key9">E</label><br></br>
        <input type="radio" id="key10" name="key" value="10" defaultChecked></input>
        <label id='keyDis10' for="key10">F</label><br></br>
        <input type="radio" id="key11" name="key" value="11"></input>
        <label id='keyDis11' for="key11">Gb</label><br></br>
        <input type="radio" id="key12" name="key" value="12"></input>
        <label id='keyDis12' for="key12">G</label><br></br>
        </div>
        <div className='Key-Dis'>
        <h5>Key Signature (Display): </h5>
        <button id='keySigBtn' onClick={toggleKeyName}>Flats</button>
        </div>
        <div className='Tempo'>
        <h5>Tempo: </h5>
        <input id='Tempo-slider' type="range" min="80" max="150" value={tempoValue}
        onChange={handleTempoChange}></input>
        <p>{tempoValue}</p>
        </div>
        <div className='Lod'>
        <h5>Level of Difficulty: </h5>
        <input id='Lod-slider' type="range" min="0" max="12" value={lodValue}
        onChange={handleLodChange}></input>
        <p>{lodValue}</p>
        </div>
        <div className='Playlist'>
         <label htmlFor="dropdown"><h5>Playlist: </h5></label>
            <select id="dropdown" value={selectedPlaylistOption} onChange={handlePlaylistChange}>
                <option value="" disabled>Select...</option>
                <option value="1">Hymns</option>
                <option value="2">Nursery Rhymes</option>
            </select>
        </div>
        <br></br>
        <div className='Player'>
        <h5>Player: </h5>
          <Stack spacing={40} direction="row">
          <Button id='LoadSongBtn' variant="contained" size='large' endIcon={<PlayArrowIcon />} color='primary' onClick={getEarsketchInput} disabled={LoadSongBtnDisabled}>Load Song</Button>
          <Button id='PlayBtn' variant="contained" size='large' endIcon={<PlayArrowIcon />} color='success' onClick={playAudio} disabled={PlayBtnDisabled}>Play</Button>
          <Button id='PauseBtn' variant="contained" size='large' endIcon={<PauseIcon />} color='success' disabled={PauseBtnDisabled} onClick={pauseAudio}>Pause</Button>
          <Button id='RestartBtn' variant="contained" size='large' endIcon={<ReplayIcon />} color='success' onClick={restartAudio} disabled={RestartBtnDisabled}>Restart</Button>
          </Stack>
        </div> 
        <div className='Earsketch'>
          <div>
          <TextField id='earsketchTextInput' fullWidth label="" color="success" focused disabled={true}/>
          </div>
        <Button id="copyBtn" onClick={handleCopy} variant="contained" color="success" disabled={copyBtnDisabled}>Copy</Button>
        <div id='Earsketch-iframe-div'>
          <iframe id="Earsketch-iframe" width="600" height="54" src="https://earsketch.gatech.edu/earsketch2/?sharing=dsfo7kXjxVg-iD-Qohjnwg&embedded=true&hideCode&hideDaw"></iframe>
        </div>
        </div>
      </div>
      <div className='right-side'>
        <div className='Guess'>
          <h5>Guess: </h5>
        </div>
        <div>
          <TextField id='guessTextField' fullWidth label="Put your guess here" color="success" focused />
        </div>
        <br></br>
        <div className='Submit'>
          <h5>Submit: </h5>
        </div>
        <div>
        <Button variant="contained" size='large' color='success' onClick={getScore}>Submit</Button>
        </div>
      </div>
      </div>
      </header>
    </div>  
  );
}

export default App;
