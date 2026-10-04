import { useState, useEffect, useRef } from 'react';
import { WORD_LISTS } from '../../utils/wordLists';

export const TankGame = ({ level, onBack }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [inputText, setInputText] = useState('');
  const words = WORD_LISTS[level] || WORD_LISTS.beginner;
  const inputRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const gameState = {
      tank: { x: canvas.width / 2 - 25, y: canvas.height - 80, width: 50, height: 40 },
      enemies: [],
      score: 0,
    };

    const drawTank = () => {
      const tank = gameState.tank;
      ctx.fillStyle = '#00AA00';
      ctx.fillRect(tank.x, tank.y, tank.width, tank.height);
      ctx.fillRect(tank.x + 15, tank.y - 10, 20, 15);
    };

    const drawEnemies = () => {
      gameState.enemies.forEach(enemy => {
        ctx.fillStyle = '#FF6B6B';
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(enemy.word, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2 + 6);
      });
    };

    const gameLoop = () => {
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#8B4513';
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

      drawTank();

      gameState.enemies = gameState.enemies.filter(e => e.y < canvas.height);
      gameState.enemies.forEach(enemy => {
        enemy.y += 5;
      });

      drawEnemies();

      ctx.fillStyle = '#000';
      ctx.font = 'bold 24px Arial';
      ctx.fillText(`Score: ${gameState.score}`, 100, 40);

      if (gameActive) {
        animationId = requestAnimationFrame(gameLoop);
      }
    };

    const handleKeyDown = (e) => {
      const tank = gameState.tank;
      if (e.key === 'ArrowLeft' && tank.x > 0) tank.x -= 20;
      if (e.key === 'ArrowRight' && tank.x < canvas.width - tank.width) tank.x += 20;
    };

    window.addEventListener('keydown', handleKeyDown);
    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameActive]);

  const handleInputChange = (e) => {
    const text = e.target.value.toLowerCase();
    setInputText(text);

    const matchedWord = words.find(w => w.toLowerCase() === text);
    if (matchedWord) {
      setScore(score + 1);
      setInputText('');
      if (inputRef.current) inputRef.current.focus();
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)',
      minHeight: '100vh'
    }} className="flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <button onClick={onBack} className="btn-glow px-4 py-2 bg-white rounded-full font-bold">
          ← Back
        </button>
      </div>
      <h1 className="text-4xl font-bold text-white text-shadow-lg mb-4">🎖️ Tank Word Battle!</h1>
      <p className="text-white text-lg mb-4">Type the words to destroy the enemies! 💣</p>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="border-4 border-white rounded-xl shadow-lg mb-6"
      />

      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} className="backdrop-blur-lg rounded-2xl p-6 w-full max-w-md">
        <p className="text-white text-center text-lg mb-2">Score: {score}</p>
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type words here..."
          className="w-full px-4 py-2 rounded-lg text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
          autoFocus
        />
        <p className="text-white text-sm text-center mt-2">Available words: {words.join(', ')}</p>
      </div>
    </div>
  );
};
