import { useState, useEffect, useRef } from 'react';
import { WORD_LISTS } from '../../utils/wordLists';

export const DinosaurGame = ({ level, onBack }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const words = WORD_LISTS[level] || WORD_LISTS.beginner;

  const gameStateRef = useRef({
    dino: { x: 50, y: 250, width: 40, height: 60, velocityY: 0 },
    obstacles: [],
    currentWordIndex: 0,
    score: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const drawDino = () => {
      const dino = gameStateRef.current.dino;
      // Draw dino body
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
      // Draw dino head
      ctx.beginPath();
      ctx.arc(dino.x + 15, dino.y - 10, 12, 0, Math.PI * 2);
      ctx.fill();
      // Draw eye
      ctx.fillStyle = '#fff';
      ctx.fillRect(dino.x + 18, dino.y - 15, 6, 6);
      ctx.fillStyle = '#000';
      ctx.arc(dino.x + 21, dino.y - 12, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawObstacles = () => {
      gameStateRef.current.obstacles.forEach((obs) => {
        // Draw box with gradient-like effect
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.fillStyle = '#d97706';
        ctx.fillRect(obs.x, obs.y, obs.width, 5);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(obs.word, obs.x + obs.width / 2, obs.y + obs.height / 2 + 6);
      });
    };

    const checkCollision = (dino, obs) => {
      return dino.x < obs.x + obs.width &&
             dino.x + dino.width > obs.x &&
             dino.y < obs.y + obs.height &&
             dino.y + dino.height > obs.y;
    };

    const gameLoop = () => {
      // Sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(1, '#E0F6FF');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(canvas.width - 50, 50, 30, 0, Math.PI * 2);
      ctx.fill();

      // Clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(100, 40, 15, 0, Math.PI * 2);
      ctx.arc(130, 50, 20, 0, Math.PI * 2);
      ctx.arc(160, 40, 15, 0, Math.PI * 2);
      ctx.fill();

      // Ground
      ctx.fillStyle = '#7cb342';
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
      
      // Grass pattern
      ctx.fillStyle = '#9ccc65';
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.fillRect(i, canvas.height - 50, 10, 5);
      }

      const dino = gameStateRef.current.dino;
      dino.velocityY += 0.6;
      dino.y += dino.velocityY;

      if (dino.y + dino.height >= canvas.height - 50) {
        dino.y = canvas.height - 110;
        dino.velocityY = 0;
      }

      drawDino();

      const state = gameStateRef.current;
      state.obstacles = state.obstacles.filter(obs => obs.x > -obs.width);
      state.obstacles.forEach(obs => {
        obs.x -= 7;
        if (checkCollision(dino, obs)) {
          setGameActive(false);
        }
      });

      if (Math.random() < 0.02) {
        const wordIndex = Math.floor(Math.random() * words.length);
        state.obstacles.push({
          x: canvas.width,
          y: canvas.height - 120,
          width: 60,
          height: 60,
          word: words[wordIndex],
        });
      }

      drawObstacles();

      ctx.fillStyle = '#000';
      ctx.font = 'bold 28px Arial';
      ctx.fillText(`Score: ${state.score}`, 100, 40);

      if (gameActive) {
        animationId = requestAnimationFrame(gameLoop);
      }
    };

    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [gameActive, words]);

  const handleKeyPress = (e) => {
    if (!gameActive) return;
    if (e.key === ' ') {
      e.preventDefault();
      const dino = gameStateRef.current.dino;
      if (dino.y + dino.height >= (canvasRef.current?.height || 350) - 50) {
        dino.velocityY = -15;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameActive]);

  if (!gameActive) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #ef4444 0%, #f87171 50%, #fca5a5 100%)',
        minHeight: '100vh'
      }} className="flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-6 animate-bounce-in shadow-2xl">
          <div className="text-6xl mb-4">💀</div>
          <h2 className="text-5xl font-bold text-red-600">Game Over!</h2>
          <div className="bg-gradient-to-r from-yellow-300 to-orange-300 rounded-2xl p-6">
            <p className="text-3xl font-bold text-white">Final Score: {gameStateRef.current.score}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', color: 'white' }}
            className="w-full py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all text-xl"
          >
            🔄 Play Again
          </button>
          <button
            onClick={onBack}
            className="w-full py-4 bg-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-400 transform hover:scale-105 transition-all"
          >
            ← Back to Games
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #fb923c 100%)',
      minHeight: '100vh'
    }} className="flex flex-col items-center justify-center p-4">
      {/* Top Bar */}
      <div className="w-full max-w-3xl mb-6 flex justify-between items-center">
        <button onClick={onBack} className="px-6 py-3 bg-white text-orange-600 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all">
          ← Back
        </button>
        <div className="text-4xl font-bold text-white text-shadow-lg">🦖 Dino Jump</div>
        <div style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }} className="px-6 py-3 rounded-full text-white font-bold text-xl shadow-lg">
          Score: {gameStateRef.current.score}
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-4 text-center">
        <p className="text-xl text-white font-bold text-shadow">Press SPACE to Jump! 🚀</p>
        <p className="text-lg text-white text-shadow">Avoid the falling words! 💨</p>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={900}
        height={500}
        className="border-8 border-white rounded-3xl shadow-2xl"
        style={{ background: 'linear-gradient(to bottom, #87CEEB, #E0F6FF)' }}
      />
    </div>
  );
};
