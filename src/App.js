import styles from './app.module.css';
import Game from './components/game/Game';
import { connect } from "react-redux";
import { useEffect, useState } from 'react';
import clickSound from "./sounds/click.mp3"
import smallGameChangeSound from "./sounds/smallGameChange.mp3"
import winSound from "./sounds/win.mp3"


const clickingSound = new Audio(clickSound);
clickingSound.volume = 1;

const smallGameChangingSound = new Audio(smallGameChangeSound);
smallGameChangingSound.volume = 1;

const winningSound = new Audio(winSound);
winningSound.volume = 1;

function App(props) {

  const [arthur, setArthur] = useState(0);

  useEffect(() => {
    setArthur(getState(props.smallGameState));
  }, [props.gameState])

  useEffect(()=>{
    if(props.gameStart===0 || props.gameState!==0)
      return ;
    clickingSound.play();
  },[props.game])

  useEffect(()=>{
    if(props.gameStart===0 || props.gameState!==0)
      return ;
    smallGameChangingSound.currentTime = 0;
    smallGameChangingSound.pause();
    smallGameChangingSound.play();
  },[props.smallGameState])

  useEffect(()=>{
    if(props.gameStart===0)
      return ;
    
    winningSound.play();
  },[props.gameState])

  return (
    <div className={styles.app}>
      <div className={styles.navbar}>
        <div className={styles.title}>
          Ultimate TTT
        </div>
        <a href='https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe'
          target="_blank"
          className={styles["how-to-play"]}>

          How to play
        </a>
      </div>
      <div>
        {(arthur & 1) !== 0 ? <div className={styles['strike-h-top']}></div> : ""}
        {(arthur & 2) !== 0 ? <div className={styles['strike-h-middle']}></div> : ""}
        {(arthur & 4) !== 0 ? <div className={styles['strike-h-bottom']}></div> : ""}
        {(arthur & 8) !== 0 ? <div className={styles['strike-v-left']}></div> : ""}
        {(arthur & 16) !== 0 ? <div className={styles['strike-v-middle']}></div> : ""}
        {(arthur & 32) !== 0 ? <div className={styles['strike-v-right']}></div> : ""}
        {(arthur & 64) !== 0 ? <div className={styles['strike-d-top-left']}></div> : ""}
        {(arthur & 128) !== 0 ? <div className={styles['strike-d-bottom-right']}></div> : ""}
        <Game />
      </div>
      {props.gameState === 0 ? <></> :
        <div className={styles.win}>
          {
            props.gameState === 1 ? "X Win" :
              props.gameState === 2 ? "O Win" :
                "Draw"}
        </div>
      }
      <div 
        className={styles.restart} 
        onClick={() => {
          props.handleRestart();
          
          smallGameChangingSound.currentTime = 0;
          smallGameChangingSound.pause();

          winningSound.currentTime = 0;
          winningSound.pause();
          
        }}>
        Restart
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    gameState: state.gameState,
    smallGameState: state.smallGameState,
    gameStart: state.gameStart,
    game: state.game
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleRestart: () => dispatch({
      type: "handleRestart"
    })
  }
}
const getState = (cur) => {
  let x = 0
  if (cur[0] === cur[1] && cur[1] === cur[2] && (cur[0] !== 0 && cur[0] !== 3))
    x += 1;
  if (cur[3] === cur[4] && cur[4] === cur[5] && (cur[3] !== 0 && cur[3] !== 3))
    x += 2;
  if (cur[6] === cur[7] && cur[7] === cur[8] && (cur[6] !== 0 && cur[6] !== 3))
    x += 4;

  if (cur[0] === cur[3] && cur[3] === cur[6] && (cur[0] !== 0 && cur[0] !== 3))
    x += 8;
  if (cur[1] === cur[4] && cur[4] === cur[7] && (cur[1] !== 0 && cur[1] !== 3))
    x += 16;
  if (cur[2] === cur[5] && cur[5] === cur[8] && (cur[2] !== 0 && cur[2] !== 3))
    x += 32;

  if (cur[0] === cur[4] && cur[4] === cur[8] && (cur[0] !== 0 && cur[0] !== 3))
    x += 64;
  if (cur[2] === cur[4] && cur[4] === cur[6] && (cur[2] !== 0 && cur[2] !== 3))
    x += 128;

  return x;
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
