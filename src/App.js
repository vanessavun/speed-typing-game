import useWordGame from './useWordGame';
import './App.css';

function App() {
  const {
      text,
      handleStart,
      handleChange, 
      isCountingdown,
      textboxRef,
      timeLeft,
      startNewGame,
      wordCount,
      scores,
      resetScores
    } = useWordGame();
  


  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea 
        value={text} 
        onChange={handleChange}
        disabled={!isCountingdown}
        ref={textboxRef}
      />
      <h4>Time remaining: {timeLeft}s</h4>
      <h4>Word count: {(wordCount) ? wordCount : "???"}</h4>
      {(timeLeft > 0) 
        ? <button 
            onClick={() => handleStart()} 
            disabled={isCountingdown}
          >
            Start Game
          </button>
        : <button 
            onClick={startNewGame}
          >
            Save Score & Start New Game
          </button>}  
      
      <div className='score-box'>
        <h5>Score history</h5>
        {scores.map(score => (
          <p>{score}</p>
        ))}
        <p id='reset' onClick={resetScores}>(reset history)</p>
      </div>
    </div>
  );
}

export default App;
