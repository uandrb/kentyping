import { WORD_LISTS } from '../utils/wordLists';

export const Practice = ({ onSelectLevel, onBack }) => {
  const levels = Object.entries(WORD_LISTS);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 50%, #ec4899 100%)',
      minHeight: '100vh'
    }} className="p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-bounce-in">
          <h1 className="text-5xl font-bold text-white text-shadow-lg mb-2">📚 Practice Words</h1>
          <p className="text-xl text-white text-shadow">Learn new words at your own pace! 🎓</p>
        </div>

        <div className="space-y-4 mb-8">
          {levels.map(([key, wordList], index) => (
            <div
              key={key}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              className="animate-bounce-in backdrop-blur-lg rounded-2xl p-6 hover:bg-opacity-30 transition-all"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                animationDelay: `${index * 0.1}s`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-3 capitalize">{key}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {wordList.map((word, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    className="rounded-lg p-3 text-center text-white font-bold hover:bg-opacity-50 transition-all cursor-default"
                  >
                    {word}
                  </div>
                ))}
              </div>
              <button
                onClick={() => onSelectLevel(key)}
                style={{ backgroundColor: 'white', color: '#f97316' }}
                className="w-full py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all"
              >
                Learn & Practice →
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={onBack}
            style={{ backgroundColor: 'white', color: '#f97316' }}
            className="btn-glow px-8 py-3 rounded-full font-bold text-lg hover:bg-opacity-90 shadow-lg"
          >
            ← Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};
