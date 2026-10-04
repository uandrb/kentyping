import { useState } from 'react';
import './index.css';
import { MainMenu } from './components/MainMenu';
import { LevelSelect } from './components/LevelSelect';
import { TypingTest } from './components/TypingTest';
import { Practice } from './components/Practice';
import { Stats } from './components/Stats';
import { DinosaurGame } from './components/games/DinosaurGame';
import { PacmanGame } from './components/games/PacmanGame';
import { TankGame } from './components/games/TankGame';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleSelectMode = (mode) => {
    setCurrentScreen(mode);
  };

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    if (currentScreen === 'typing-test') {
      setCurrentScreen('typing-test');
    } else if (currentScreen === 'level-select') {
      setCurrentScreen('game-select');
    }
  };

  const handleSelectGame = (game) => {
    setSelectedGame(game);
    setCurrentScreen(`game-${game}`);
  };

  const handleBack = () => {
    setCurrentScreen('menu');
    setSelectedLevel(null);
    setSelectedGame(null);
  };

  const handleBackFromLevel = () => {
    if (currentScreen === 'typing-test') {
      setCurrentScreen('menu');
    } else if (currentScreen === 'game-select') {
      setCurrentScreen('level-select');
    } else {
      setCurrentScreen('menu');
    }
    setSelectedLevel(null);
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'menu' && (
        <MainMenu onSelectMode={handleSelectMode} />
      )}

      {currentScreen === 'typing-test' && !selectedLevel && (
        <LevelSelect 
          onSelectLevel={(level) => {
            setSelectedLevel(level);
            setCurrentScreen('typing-test-play');
          }} 
          onBack={handleBack}
        />
      )}

      {currentScreen === 'typing-test-play' && selectedLevel && (
        <TypingTest 
          level={selectedLevel} 
          onBack={() => {
            setCurrentScreen('typing-test');
            setSelectedLevel(null);
          }}
        />
      )}

      {currentScreen === 'level-select' && (
        <LevelSelect 
          onSelectLevel={(level) => {
            setSelectedLevel(level);
            setCurrentScreen('game-select');
          }} 
          onBack={handleBack}
        />
      )}

      {currentScreen === 'game-select' && selectedLevel && (
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          minHeight: '100vh'
        }} className="p-4">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => {
                setCurrentScreen('level-select');
                setSelectedLevel(null);
              }}
              style={{ backgroundColor: 'white', color: '#667eea' }}
              className="btn-glow px-6 py-3 rounded-full font-bold text-lg mb-8 hover:shadow-lg transform hover:scale-105 transition-all"
            >
              ← Back to Levels
            </button>

            <div className="text-center mb-12 animate-bounce-in">
              <h1 className="text-6xl font-bold text-white text-shadow-lg mb-4">🎮 Choose Your Game</h1>
              <p className="text-2xl text-white text-shadow">Pick a game and have fun! 🎉</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Dinosaur Game */}
              <div
                onClick={() => handleSelectGame('dinosaur')}
                className="animate-bounce-in transform hover:scale-110 transition-all cursor-pointer"
                style={{ animationDelay: '0' }}
              >
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))'
                }} className="rounded-3xl p-8 hover:shadow-2xl transition-all min-h-96 flex flex-col items-center justify-center border-4 border-white border-opacity-30">
                  <div className="text-8xl mb-6 animate-float">🦖</div>
                  <h2 className="text-3xl font-bold text-white text-shadow mb-4">Dinosaur Jump</h2>
                  <p className="text-white text-center text-lg mb-6">
                    🚀 Jump over obstacles!
                    <br />
                    ⌨️ Press SPACE
                  </p>
                  <div className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold text-lg mt-auto">
                    Play Now →
                  </div>
                </div>
              </div>

              {/* Pacman Game */}
              <div
                onClick={() => handleSelectGame('pacman')}
                className="animate-bounce-in transform hover:scale-110 transition-all cursor-pointer"
                style={{ animationDelay: '0.1s' }}
              >
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))'
                }} className="rounded-3xl p-8 hover:shadow-2xl transition-all min-h-96 flex flex-col items-center justify-center border-4 border-white border-opacity-30">
                  <div className="text-8xl mb-6 animate-spin-slow">👾</div>
                  <h2 className="text-3xl font-bold text-white text-shadow mb-4">Pacman Letters</h2>
                  <p className="text-white text-center text-lg mb-6">
                    🍒 Eat the letters!
                    <br />
                    🖱️ Move your mouse
                  </p>
                  <div className="bg-white text-yellow-600 px-6 py-3 rounded-full font-bold text-lg mt-auto">
                    Play Now →
                  </div>
                </div>
              </div>

              {/* Tank Game */}
              <div
                onClick={() => handleSelectGame('tank')}
                className="animate-bounce-in transform hover:scale-110 transition-all cursor-pointer"
                style={{ animationDelay: '0.2s' }}
              >
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))'
                }} className="rounded-3xl p-8 hover:shadow-2xl transition-all min-h-96 flex flex-col items-center justify-center border-4 border-white border-opacity-30">
                  <div className="text-8xl mb-6 animate-float">🎖️</div>
                  <h2 className="text-3xl font-bold text-white text-shadow mb-4">Tank Battle</h2>
                  <p className="text-white text-center text-lg mb-6">
                    💣 Destroy enemies!
                    <br />
                    ⌨️ Type words
                  </p>
                  <div className="bg-white text-teal-600 px-6 py-3 rounded-full font-bold text-lg mt-auto">
                    Play Now →
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'game-dinosaur' && (
        <DinosaurGame 
          level={selectedLevel} 
          onBack={() => {
            setCurrentScreen('game-select');
          }}
        />
      )}

      {currentScreen === 'game-pacman' && (
        <PacmanGame 
          level={selectedLevel} 
          onBack={() => {
            setCurrentScreen('game-select');
          }}
        />
      )}

      {currentScreen === 'game-tank' && (
        <TankGame 
          level={selectedLevel} 
          onBack={() => {
            setCurrentScreen('game-select');
          }}
        />
      )}

      {currentScreen === 'practice' && !selectedLevel && (
        <Practice 
          onSelectLevel={(level) => {
            setSelectedLevel(level);
            setCurrentScreen('practice-play');
          }} 
          onBack={handleBack}
        />
      )}

      {currentScreen === 'practice-play' && selectedLevel && (
        <TypingTest 
          level={selectedLevel} 
          onBack={() => {
            setCurrentScreen('practice');
            setSelectedLevel(null);
          }}
        />
      )}

      {currentScreen === 'stats' && (
        <Stats onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
