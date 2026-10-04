export const Stats = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-bounce-in">
          <h1 className="text-5xl font-bold text-white text-shadow-lg mb-2">📊 My Statistics</h1>
          <p className="text-xl text-white text-shadow">Track your typing progress! 📈</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="animate-bounce-in bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6">
            <h2 className="text-3xl font-bold text-white mb-4">🎯 Total Tests</h2>
            <p className="text-5xl font-bold text-blue-300">0</p>
            <p className="text-white text-sm mt-2">Typing tests completed</p>
          </div>

          <div className="animate-bounce-in bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-3xl font-bold text-white mb-4">⚡ Average WPM</h2>
            <p className="text-5xl font-bold text-green-300">0</p>
            <p className="text-white text-sm mt-2">Words per minute</p>
          </div>

          <div className="animate-bounce-in bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-bold text-white mb-4">🎮 Games Played</h2>
            <p className="text-5xl font-bold text-yellow-300">0</p>
            <p className="text-white text-sm mt-2">Interactive games</p>
          </div>

          <div className="animate-bounce-in bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-3xl font-bold text-white mb-4">✨ Accuracy</h2>
            <p className="text-5xl font-bold text-pink-300">0%</p>
            <p className="text-white text-sm mt-2">Average accuracy</p>
          </div>
        </div>

        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">🏆 Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
              <span className="text-4xl">🥇</span>
              <p className="text-white text-sm mt-2">First Test</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center opacity-50">
              <span className="text-4xl">⚡</span>
              <p className="text-white text-sm mt-2">Speed Demon</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center opacity-50">
              <span className="text-4xl">🎯</span>
              <p className="text-white text-sm mt-2">Perfect Score</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center opacity-50">
              <span className="text-4xl">🔥</span>
              <p className="text-white text-sm mt-2">7 Day Streak</p>
            </div>
          </div>
        </div>

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
