import React, { useEffect, useRef } from "react";
import Footer from "../common/footer";
import Header from "../common/header";
import {  useHistory } from "react-router-dom";


import { CountdownCircleTimer } from "react-countdown-circle-timer";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioDisplay = ({playerRef}) => {
	
	const History =  useHistory();
    
	useEffect(() => {
	}, []);
	
	return (
        <div className="container">
            <h4>Please listen to this music while you take a mental break.</h4>
            <AudioPlayer
                autoPlay
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                ref={playerRef}
                />
            <center>
                <CountdownCircleTimer
                    isPlaying
                    duration={30}
                    colors={[
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                    ]}
                >
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
            </center>
        </div>
        )
}

export default AudioDisplay;