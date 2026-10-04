import { LEVEL_CONFIG } from '../utils/wordLists';

export const LevelSelect = ({ onSelectLevel, onBack }) => {
  const levels = Object.entries(LEVEL_CONFIG);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 50%, #ec4899 100%)',
      minHeight: '100vh'
    }} className="p-4">
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
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              className="animate-bounce-in backdrop-blur-lg rounded-2xl p-6 hover:bg-opacity-30 transition-all cursor-pointer transform hover:scale-105 shadow-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                animationDelay: `${index * 0.1}s`,
                backdropFilter: 'blur(10px)'
              }}
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

              <button style={{ backgroundColor: 'white', color: '#9333ea' }} className="mt-4 w-full text-purple-600 font-bold py-2 rounded-lg hover:bg-opacity-90 transition-all">
                Play →
              </button>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={onBack}
            style={{ backgroundColor: 'white', color: '#9333ea' }}
            className="btn-glow px-8 py-3 rounded-full font-bold text-lg hover:bg-opacity-90 shadow-lg"
          >
            ← Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};
