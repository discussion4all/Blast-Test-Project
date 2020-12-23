import React, { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Header from "../common/header";
import Footer from "../common/footer";

const Audio = () => {

    const playAudio = () => {
        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.play()
      }

      const stopAudio = () => {
        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.pause()
      }


    return (
        <>
        <Header/>
        <div className="container">
        <div className="_vertical-center">
        	<div className="main-div">
                <button onClick={()=>playAudio()}>
                    <span>Play Audio</span>
                </button>
                <audio className="audio-element">
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></source>
                </audio>
                <CountdownCircleTimer
                    isPlaying
                    duration={30}
                    colors={[
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                    ]}
                    onComplete={()=>stopAudio()}
                >
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
                <h4>Please listen to this music while you take a mental break.</h4>
            </div>
        </div>
      </div>
      <Footer/>
      </>
    )
}

export default Audio;