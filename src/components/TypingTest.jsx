import { useEffect } from 'react';
import { useTypingTest } from '../hooks/useTypingTest';
import { WORD_LISTS } from '../utils/wordLists';

export const TypingTest = ({ level, onBack }) => {
  const words = WORD_LISTS[level] || WORD_LISTS.beginner;
  const { currentWord, typedText, results, isFinished, handleKeyPress, reset, progress, total } = useTypingTest(words);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const correctCount = results.filter(r => r.correct).length;
  const accuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;
  const averageWPM = results.length > 0 
    ? Math.round(60 / (results.reduce((sum, r) => sum + r.time, 0) / results.length)) 
    : 0;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-cyan-400 to-blue-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl animate-bounce-in text-center space-y-6">
          <h2 className="text-4xl font-bold text-green-600">🎉 Great Job!</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-xl text-white">
              <p className="text-sm">Accuracy</p>
              <p className="text-3xl font-bold">{accuracy}%</p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-4 rounded-xl text-white">
              <p className="text-sm">WPM</p>
              <p className="text-3xl font-bold">{averageWPM}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-4 rounded-xl text-white">
              <p className="text-sm">Words</p>
              <p className="text-3xl font-bold">{correctCount}/{total}</p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={reset}
              className="w-full btn-glow py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-bold text-lg hover:shadow-lg"
            >
              🔄 Try Again
            </button>
            <button
              onClick={onBack}
              className="w-full btn-glow py-3 bg-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:shadow-lg"
            >
              ← Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="btn-glow px-4 py-2 bg-white text-blue-600 rounded-full font-bold hover:shadow-lg"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-white text-shadow">⌨️ Typing Test</h1>
          <div className="text-white font-bold">
            {progress + 1} / {total}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white bg-opacity-30 rounded-full h-3 mb-8 overflow-hidden">
          <div
            className="bg-white h-full transition-all duration-300"
            style={{ width: `${((progress + 1) / total) * 100}%` }}
          />
        </div>

        {/* Main Content */}
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-12 text-center space-y-8 animate-bounce-in">
          {/* Current Word */}
          <div className="space-y-4">
            <p className="text-white text-lg">Type this word:</p>
            <p className="text-7xl font-bold text-white text-shadow-lg animate-float">
              {currentWord}
            </p>
          </div>

          {/* Input Display */}
          <div className="space-y-2">
            <div className={`text-4xl font-bold p-6 rounded-2xl backdrop-blur-lg transition-all ${
              typedText === '' 
                ? 'bg-gray-300 bg-opacity-30 text-gray-500'
                : currentWord.toLowerCase().startsWith(typedText.toLowerCase())
                ? 'bg-green-400 bg-opacity-50 text-white glow-green'
                : 'bg-red-400 bg-opacity-50 text-white glow'
            }`}>
              {typedText || 'Start typing...'}
            </div>
          </div>

          {/* Hint */}
          <p className="text-white text-lg">
            {typedText && !currentWord.toLowerCase().startsWith(typedText.toLowerCase()) 
              ? '❌ Try again!' 
              : typedText 
              ? '✅ Keep going!' 
              : '👇 Click here and start typing'}
          </p>

          {/* Keyboard Hint */}
          <p className="text-white text-sm">Press SPACE or ENTER to move to next word</p>
        </div>
      </div>
    </div>
  );
};
