import { useState, useCallback } from 'react';

export const useTypingTest = (words) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [results, setResults] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentWord = words[currentWordIndex];
  const isCorrect = typedText.toLowerCase() === currentWord.toLowerCase();

  const handleKeyPress = useCallback((e) => {
    if (isFinished) return;

    if (!startTime) setStartTime(Date.now());

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (typedText.trim()) {
        const timeTaken = (Date.now() - startTime) / 1000;
        setResults([...results, { word: currentWord, typed: typedText, correct: isCorrect, time: timeTaken }]);
        
        if (currentWordIndex >= words.length - 1) {
          setIsFinished(true);
        } else {
          setCurrentWordIndex(currentWordIndex + 1);
          setTypedText('');
        }
      }
    } else if (e.key === 'Backspace') {
      setTypedText(typedText.slice(0, -1));
    } else if (e.key.length === 1) {
      setTypedText(typedText + e.key);
    }
  }, [currentWordIndex, typedText, isCorrect, startTime, results, words, isFinished]);

  const reset = useCallback(() => {
    setCurrentWordIndex(0);
    setTypedText('');
    setStartTime(null);
    setResults([]);
    setIsFinished(false);
  }, []);

  return { currentWord, typedText, results, isFinished, handleKeyPress, reset, progress: currentWordIndex, total: words.length };
};
