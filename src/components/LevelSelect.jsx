import { LEVEL_CONFIG } from '../utils/wordLists';

export const LevelSelect = ({ onSelectLevel, onBack }) => {
  const levels = Object.entries(LEVEL_CONFIG);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-bounce-in">
          <h1 className="text-5xl font-bold text-white text-shadow-lg mb-2">🎯 Choose Your Level</h1>
          <p className="text-xl text-white text-shadow">Pick a level and start playing! 🚀</p>
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {levels.map(([key, config], index) => (
            <div
              key={key}
              className="animate-bounce-in bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 hover:bg-opacity-30 transition-all cursor-pointer transform hover:scale-105 shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onSelectLevel(key)}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-white text-shadow">{config.name}</h2>
                <span className="text-4xl">⭐</span>
              </div>
              
              <p className="text-white text-lg mb-3">{config.description}</p>
              
              <div className="space-y-2 text-white text-sm">
                <p>⏱️ Time: {config.timeLimit} seconds</p>
                <p>📈 Difficulty: {'🔥'.repeat(config.difficulty)}</p>
              </div>

              <button className="mt-4 w-full bg-white text-purple-600 font-bold py-2 rounded-lg hover:bg-opacity-90 transition-all">
                Play →
              </button>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={onBack}
            className="btn-glow px-8 py-3 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-opacity-90 shadow-lg"
          >
            ← Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};
