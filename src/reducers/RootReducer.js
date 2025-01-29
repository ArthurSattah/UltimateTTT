const initState={
    game: Array(9).fill(0).map(row => new Array(9).fill(0)),
    turn: 1,
    gameState: 0,
    smallGameState: Array(9).fill(0),
    shouldPlay: 9,
    gameStart:0,
}

const reducer = (state=initState , action)=>{
    if(action.type==="handleRestart"){
        return {
            game: Array(9).fill(0).map(row => new Array(9).fill(0)),
            turn: 1,
            gameState: 0,
            smallGameState: Array(9).fill(0),
            shouldPlay: 9,
            gameStart:0,
        }
    }
    if(action.type==="handleClick"){
        const i=action.smallGame;
        const j=action.idx;
        if( state.game[i][j]!==0 ||
            state.smallGameState[i]!==0 ||
            (state.shouldPlay!==9 && state.shouldPlay!==i) || 
            state.gameState!==0 ){

            return state;
        }
        let newGame= state.game.slice();
        newGame[i][j]=state.turn;

        let newTurn =(state.turn===1 ? 2 : 1);
        let newSmallGameState =state.smallGameState.slice();
        newSmallGameState[i]=getState(newGame[i]);
        if(state.smallGameState[i] === newSmallGameState[i])
            newSmallGameState=state.smallGameState;

        let newShouldPlay =newSmallGameState[j] ===0 ? j : 9 

        let newGameState =0;
        newGameState=getState(newSmallGameState);
        if(newGameState===state.gameState)
            newGameState=state.gameState;
        
        return {
            ...state,
            game : newGame,
            turn : newTurn,
            smallGameState : newSmallGameState,
            shouldPlay : newShouldPlay,
            gameState : newGameState,
            gameStart : 1,
        }
    }
    return state;
}

const getState = (cur)=>{

    if(cur[0]=== cur[1] && cur[1]=== cur[2] && (cur[0]!==0 && cur[0]!==3))
        return cur[0];
    if(cur[3]=== cur[4] && cur[4]=== cur[5] && (cur[3]!==0 && cur[3]!==3))
        return cur[3];
    if(cur[6]=== cur[7] && cur[7]=== cur[8] && (cur[6]!==0 && cur[6]!==3))
        return cur[6];

    if(cur[0]=== cur[3] && cur[3]=== cur[6] && (cur[0]!==0 && cur[0]!==3))
        return cur[0];
    if(cur[1]=== cur[4] && cur[4]=== cur[7] && (cur[1]!==0 && cur[1]!==3))
        return cur[1];
    if(cur[2]=== cur[5] && cur[5]=== cur[8] && (cur[2]!==0 && cur[2]!==3))
        return cur[2];
    
    if(cur[0]=== cur[4] && cur[4]=== cur[8] && (cur[0]!==0 && cur[0]!==3))
        return cur[0];
    if(cur[2]=== cur[4] && cur[4]=== cur[6] && (cur[2]!==0 && cur[2]!==3))
        return cur[2];
    
    for (let index = 0; index < 9; index++) {
        if(cur[index]===0)
            return 0;
    }
    return 3;
}
export default reducer ;