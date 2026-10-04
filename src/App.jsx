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
          background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)',
          minHeight: '100vh'
        }} className="p-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => {
                setCurrentScreen('level-select');
                setSelectedLevel(null);
              }}
              style={{ backgroundColor: 'white', color: '#10b981' }}
              className="btn-glow px-4 py-2 rounded-full font-bold mb-8"
            >
              ← Back
            </button>
            <div className="text-center mb-12 animate-bounce-in">
              <h1 className="text-5xl font-bold text-white text-shadow-lg mb-2">🎮 Choose Your Game</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => handleSelectGame('dinosaur')}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                className="animate-bounce-in backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-30 transition-all cursor-pointer transform hover:scale-105"
              >
                <p className="text-5xl mb-4">🦖</p>
                <h2 className="text-2xl font-bold text-white mb-2">Dinosaur Jump</h2>
                <p className="text-white">Avoid obstacles by jumping!</p>
              </div>

              <div
                onClick={() => handleSelectGame('pacman')}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', animationDelay: '0.1s' }}
                className="animate-bounce-in backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-30 transition-all cursor-pointer transform hover:scale-105"
              >
                <p className="text-5xl mb-4">👾</p>
                <h2 className="text-2xl font-bold text-white mb-2">Pacman Letters</h2>
                <p className="text-white">Eat the falling letters!</p>
              </div>

              <div
                onClick={() => handleSelectGame('tank')}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', animationDelay: '0.2s' }}
                className="animate-bounce-in backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-30 transition-all cursor-pointer transform hover:scale-105"
              >
                <p className="text-5xl mb-4">🎖️</p>
                <h2 className="text-2xl font-bold text-white mb-2">Tank Battle</h2>
                <p className="text-white">Type words to destroy enemies!</p>
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
