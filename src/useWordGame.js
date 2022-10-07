import { useState, useEffect, useRef } from 'react';

function useWordGame() {
  const loadedScores = localStorage.getItem("scores")
    ? JSON.parse(localStorage.getItem("scores"))
    : [];
  const [scores, setScores] = useState(loadedScores);
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const STARTING_TIME = 5;
  const STARTING_STATE = false;
  const [timeLeft, setTimeLeft] = useState(STARTING_TIME);
  const [isCountingdown, setIsCountingdown] = useState(STARTING_STATE);
  const textboxRef = useRef(null);

  const handleChange = (event) => {
    const {value} = event.target;
    setText(value);
  }

  const findWordCount = (inputText) => {
    const wordsArray = inputText.trim().split(" ");
    const filteredArray = wordsArray.filter(word => word !== '').length;
    setWordCount(filteredArray);
  }

  const handleStart = () => {
    textboxRef.current.disabled = false;
    textboxRef.current.focus();
    setIsCountingdown(prevState => !prevState);
  }

  const startNewGame = () => {
    setTimeLeft(STARTING_TIME);
    setText('');
    setScores([...scores, wordCount]);
    setWordCount(0);
  }

  const endGame = () => {
    setIsCountingdown(STARTING_STATE)
    findWordCount(text);
  }

  useEffect(() => {
    if (isCountingdown && timeLeft > 0) {
      setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0){
      endGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCountingdown, timeLeft])

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores))
  }, [scores])

  const resetScores = () => {
    localStorage.setItem("scores", JSON.stringify([]));
    window.location.reload();
  }

  return {
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
  }
}

export default useWordGame;