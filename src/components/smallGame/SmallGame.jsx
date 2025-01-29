import React from 'react'
import styles from './smallGame.module.css'
import { connect } from "react-redux";

const SmallGame = (props) => {
    const get = (x) => {
        let ret = ["digit"];
        if (x >= 3)
            ret.push("border-top");
        if (x % 3 !== 2)
            ret.push("border-right");
        if (x < 6)
            ret.push("border-bottom");
        if (x % 3 !== 0)
            ret.push("border-left");
        return ret;
    }
    let st = ""
    if ((props.shouldPlay === props.idx || props.shouldPlay === 9) &&
        props.smallGameState[props.idx] === 0 && props.gameState === 0)
        st = "should";
    else
        st = "";

    let stEnd = ""
    if (props.smallGameState[props.idx] === 0)
        stEnd = "";
    else if (props.smallGameState[props.idx] === 1)
        stEnd = "shouldEndX";
    else if (props.smallGameState[props.idx] === 2)
        stEnd = "shouldEndO";
    else
        stEnd = "shouldEnd-";

    return (
        <div className={`${styles.game}`}>
            <div className={`${styles.end} ${styles[stEnd]} `}>
                {
                    props.smallGameState[props.idx] === 1 ? "X" :
                        props.smallGameState[props.idx] === 2 ? "O" : "-"
                }
            </div>
            <div className={`${styles[st]} ${props.smallGameState[props.idx] !== 0 ? styles.notShow : ""}`}>
                {[...Array(3)].map((_, i) => {
                    return (
                        <div key={i} className={styles.rows}>
                            {
                                [...Array(3)].map((_, j) => {
                                    return (
                                        <div key={j}
                                            className={`
                                                ${props.game[props.idx][i * 3 + j] !== 0 || st !== "should" ? "" :
                                                    props.turn === 1 ? styles.digitX : styles.digitO}  
                                                ${get(i * 3 + j).map((value, i) => { return (` ${styles[value]} `) })} `}
                                            onClick={() => props.handleClick(props.idx, i * 3 + j)}
                                        >
                                            {
                                                props.game[props.idx][i * 3 + j] === 1 ? "X" :
                                                    props.game[props.idx][i * 3 + j] === 2 ? "O" :
                                                        ""
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
function mapStateToProps(state) {
    return {
        turn: state.turn,
        game: state.game,
        smallGameState: state.smallGameState,
        shouldPlay: state.shouldPlay,
        gameState: state.gameState,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleClick: (smallGame, idx) => dispatch({
            type: "handleClick",
            smallGame: smallGame,
            idx: idx
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SmallGame)
