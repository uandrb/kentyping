export const MainMenu = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="text-center space-y-8 animate-bounce-in">
        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-bold text-white text-shadow-lg animate-float">
          🎮 KenTyping
        </h1>
        
        <p className="text-2xl text-white text-shadow">Learn to type while having fun! 🎉</p>

        {/* Main Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button
            onClick={() => onSelectMode('typing-test')}
            className="btn-glow p-8 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-2xl shadow-lg font-bold text-xl transition-all"
          >
            ⌨️ Typing Test
          </button>
          
          <button
            onClick={() => onSelectMode('level-select')}
            className="btn-glow p-8 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-2xl shadow-lg font-bold text-xl transition-all"
          >
            🎮 Games
          </button>
          
          <button
            onClick={() => onSelectMode('practice')}
            className="btn-glow p-8 bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white rounded-2xl shadow-lg font-bold text-xl transition-all"
          >
            📚 Practice
          </button>
          
          <button
            onClick={() => onSelectMode('stats')}
            className="btn-glow p-8 bg-gradient-to-br from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white rounded-2xl shadow-lg font-bold text-xl transition-all"
          >
            📊 My Stats
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-2xl max-w-lg mx-auto text-white">
          <p className="text-lg">👋 Hi! I'm here to help you become a typing master!</p>
          <p className="text-sm mt-2">Choose a mode to get started →</p>
        </div>
      </div>
    </div>
  );
};
