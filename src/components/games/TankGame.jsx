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
      // Tank body
      ctx.fillStyle = '#00AA00';
      ctx.fillRect(tank.x, tank.y, tank.width, tank.height);
      // Tank turret
      ctx.fillStyle = '#00DD00';
      ctx.fillRect(tank.x + 15, tank.y - 10, 20, 15);
      // Tank window
      ctx.fillStyle = '#FFF';
      ctx.fillRect(tank.x + 18, tank.y + 10, 12, 12);
    };

    const drawEnemies = () => {
      gameState.enemies.forEach(enemy => {
        // Enemy box with 3D effect
        ctx.fillStyle = '#FF6B6B';
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.fillStyle = '#DC2626';
        ctx.fillRect(enemy.x, enemy.y, enemy.width, 5);
        ctx.fillRect(enemy.x, enemy.y, 5, enemy.height);
        
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(enemy.word, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2 + 6);
      });
    };

    const gameLoop = () => {
      // Sky
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(1, '#90EE90');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(100, 60, 20, 0, Math.PI * 2);
      ctx.arc(150, 70, 25, 0, Math.PI * 2);
      ctx.arc(200, 60, 20, 0, Math.PI * 2);
      ctx.fill();

      // Ground
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
      ctx.fillStyle = '#A0522D';
      for (let i = 0; i < canvas.width; i += 30) {
        ctx.fillRect(i, canvas.height - 50, 15, 50);
      }

      drawTank();

      gameState.enemies = gameState.enemies.filter(e => e.y < canvas.height);
      gameState.enemies.forEach(enemy => {
        enemy.y += 4;
      });

      drawEnemies();

      // Score
      ctx.fillStyle = '#000';
      ctx.font = 'bold 28px Arial';
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
      {/* Top Bar */}
      <div className="w-full max-w-3xl mb-6 flex justify-between items-center">
        <button onClick={onBack} className="px-6 py-3 bg-white text-teal-600 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all">
          ← Back
        </button>
        <div className="text-4xl font-bold text-white text-shadow-lg">🎖️ Tank Battle</div>
        <div style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }} className="px-6 py-3 rounded-full text-white font-bold text-xl shadow-lg">
          Score: {score}
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-4 text-center">
        <p className="text-xl text-white font-bold text-shadow">Use ← → Arrow Keys to Move! 🎖️</p>
        <p className="text-lg text-white text-shadow">Type words to destroy enemies! 💣</p>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={900}
        height={500}
        className="border-8 border-white rounded-3xl shadow-2xl mb-6"
      />

      {/* Input Area */}
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} className="backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <p className="text-white text-center text-lg mb-4 font-bold">Type to Destroy! ⚔️</p>
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type here..."
          className="w-full px-6 py-4 rounded-xl text-center text-xl font-bold focus:outline-none focus:ring-4 focus:ring-yellow-300 bg-white"
          autoFocus
        />
        <p className="text-white text-center text-sm mt-4">Words: {words.join(', ')}</p>
      </div>
    </div>
  );
};
