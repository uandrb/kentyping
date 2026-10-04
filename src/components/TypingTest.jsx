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
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)',
        minHeight: '100vh'
      }} className="flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl animate-bounce-in text-center space-y-6">
          <h2 className="text-4xl font-bold text-green-600">🎉 Great Job!</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div style={{ background: 'linear-gradient(135deg, #10b981, #047857)' }} className="p-4 rounded-xl text-white">
              <p className="text-sm">Accuracy</p>
              <p className="text-3xl font-bold">{accuracy}%</p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #3b82f6, #1e40af)' }} className="p-4 rounded-xl text-white">
              <p className="text-sm">WPM</p>
              <p className="text-3xl font-bold">{averageWPM}</p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #a855f7, #6b21a8)' }} className="p-4 rounded-xl text-white">
              <p className="text-sm">Words</p>
              <p className="text-3xl font-bold">{correctCount}/{total}</p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={reset}
              style={{ background: 'linear-gradient(to right, #10b981, #047857)', color: 'white' }}
              className="w-full btn-glow py-3 rounded-xl font-bold text-lg hover:shadow-lg"
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
    <div style={{
      background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #a855f7 100%)',
      minHeight: '100vh'
    }} className="p-4">
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
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }} className="backdrop-blur-lg rounded-3xl p-12 text-center space-y-8 animate-bounce-in">
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
