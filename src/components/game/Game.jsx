import React from 'react'
import styles from './game.module.css'
import SmallGame from '../smallGame/SmallGame';
const Game = () => {
    const get = (x) => {
        let ret = ["game"];
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
    return (
        <div className={styles.games}>
            {
                [...Array(3)].map((_, i) => {
                    return (
                        <div key={i} className={styles.rows}>
                            {
                                [...Array(3)].map((_, j) => {
                                    return (
                                        <div key={j} className={`${get(i * 3 + j).map((value, i) => { return (` ${styles[value]} `) })} `}>
                                            {
                                                <SmallGame idx={i*3+j} />
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Game
