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
      ctx.fillStyle = '#10b981';
      ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
      ctx.fillStyle = '#000';
      ctx.arc(dino.x + 10, dino.y + 15, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawObstacles = () => {
      gameStateRef.current.obstacles.forEach((obs, index) => {
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(obs.word, obs.x + obs.width / 2, obs.y + obs.height / 2 + 7);
      });
    };

    const checkCollision = (dino, obs) => {
      return dino.x < obs.x + obs.width &&
             dino.x + dino.width > obs.x &&
             dino.y < obs.y + obs.height &&
             dino.y + dino.height > obs.y;
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ground
      ctx.fillStyle = '#90EE90';
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

      // Update dino
      const dino = gameStateRef.current.dino;
      dino.velocityY += 0.6;
      dino.y += dino.velocityY;

      if (dino.y + dino.height >= canvas.height - 50) {
        dino.y = canvas.height - 110;
        dino.velocityY = 0;
      }

      drawDino();

      // Update obstacles
      const state = gameStateRef.current;
      state.obstacles = state.obstacles.filter(obs => obs.x > -obs.width);
      state.obstacles.forEach(obs => {
        obs.x -= 7;

        if (checkCollision(dino, obs)) {
          setGameActive(false);
        }
      });

      // Spawn new obstacles
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

      // Draw score
      ctx.fillStyle = '#000';
      ctx.font = 'bold 24px Arial';
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
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-pink-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-6 animate-bounce-in">
          <h2 className="text-4xl font-bold text-red-600">Game Over!</h2>
          <p className="text-2xl font-bold text-gray-700">Score: {gameStateRef.current.score}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600"
          >
            🔄 Play Again
          </button>
          <button
            onClick={onBack}
            className="w-full py-3 bg-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-400"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-orange-400 flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <button onClick={onBack} className="btn-glow px-4 py-2 bg-white rounded-full font-bold">
          ← Back
        </button>
      </div>
      <h1 className="text-4xl font-bold text-white text-shadow-lg mb-4">🦖 Dinosaur Jump Game!</h1>
      <p className="text-white text-lg mb-4">Press SPACE to jump! Avoid the words! 🚀</p>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="border-4 border-white rounded-xl shadow-lg"
      />
    </div>
  );
};
