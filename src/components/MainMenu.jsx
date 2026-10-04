export const MainMenu = ({ onSelectMode }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }} className="flex items-center justify-center p-4">
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
            style={{
              background: 'linear-gradient(to bottom right, #3b82f6, #1e40af)',
              color: 'white'
            }}
            className="btn-glow p-8 hover:opacity-90 rounded-2xl shadow-lg font-bold text-xl transition-all"
          >
            ⌨️ Typing Test
          </button>
          
          <button
            onClick={() => onSelectMode('level-select')}
            style={{
              background: 'linear-gradient(to bottom right, #10b981, #047857)',
              color: 'white'
            }}
            className="btn-glow p-8 hover:opacity-90 rounded-2xl shadow-lg font-bold text-xl transition-all"
          >
            🎮 Games
          </button>
          
          <button
            onClick={() => onSelectMode('practice')}
            style={{
              background: 'linear-gradient(to bottom right, #f97316, #d97706)',
              color: 'white'
            }}
            className="btn-glow p-8 hover:opacity-90 rounded-2xl shadow-lg font-bold text-xl transition-all"
          >
            📚 Practice
          </button>
          
          <button
            onClick={() => onSelectMode('stats')}
            style={{
              background: 'linear-gradient(to bottom right, #ec4899, #be185d)',
              color: 'white'
            }}
            className="btn-glow p-8 hover:opacity-90 rounded-2xl shadow-lg font-bold text-xl transition-all"
          >
            📊 My Stats
          </button>
        </div>

        {/* Info Box */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }} className="backdrop-blur-lg p-6 rounded-2xl max-w-lg mx-auto text-white">
          <p className="text-lg">👋 Hi! I'm here to help you become a typing master!</p>
          <p className="text-sm mt-2">Choose a mode to get started →</p>
        </div>
      </div>
    </div>
  );
};
