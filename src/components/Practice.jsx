import { WORD_LISTS } from '../utils/wordLists';

export const Practice = ({ onSelectLevel, onBack }) => {
  const levels = Object.entries(WORD_LISTS);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-bounce-in">
          <h1 className="text-5xl font-bold text-white text-shadow-lg mb-2">📚 Practice Words</h1>
          <p className="text-xl text-white text-shadow">Learn new words at your own pace! 🎓</p>
        </div>

        <div className="space-y-4 mb-8">
          {levels.map(([key, wordList], index) => (
            <div
              key={key}
              className="animate-bounce-in bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 hover:bg-opacity-30 transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h2 className="text-2xl font-bold text-white mb-3 capitalize">{key}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {wordList.map((word, i) => (
                  <div
                    key={i}
                    className="bg-white bg-opacity-30 rounded-lg p-3 text-center text-white font-bold hover:bg-opacity-50 transition-all cursor-default"
                  >
                    {word}
                  </div>
                ))}
              </div>
              <button
                onClick={() => onSelectLevel(key)}
                className="w-full py-2 bg-white text-orange-600 rounded-lg font-bold hover:bg-opacity-90 transition-all"
              >
                Learn & Practice →
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={onBack}
            className="btn-glow px-8 py-3 bg-white text-orange-600 rounded-full font-bold text-lg hover:bg-opacity-90 shadow-lg"
          >
            ← Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};
