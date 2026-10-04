import { useState, useEffect, useRef } from 'react';
import { WORD_LISTS } from '../../utils/wordLists';

export const PacmanGame = ({ level, onBack }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const words = WORD_LISTS[level] || WORD_LISTS.beginner;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const gameState = {
      pacman: { x: 300, y: 200, width: 30, height: 30, mouthOpen: true },
      letters: [],
      score: 0,
      mouthAngle: 0,
    };

    const drawPacman = () => {
      const pac = gameState.pacman;
      ctx.fillStyle = '#FFD700';
      
      const mouthAngle = Math.sin(gameState.mouthAngle) * 0.3;
      ctx.beginPath();
      ctx.arc(pac.x, pac.y, pac.width / 2, mouthAngle, 2 * Math.PI - mouthAngle, false);
      ctx.fill();
      ctx.strokeStyle = '#FFA500';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Eye
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(pac.x + 8, pac.y - 5, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawLetters = () => {
      gameState.letters.forEach((letter) => {
        // Letter box with gradient effect
        ctx.fillStyle = '#EC4899';
        ctx.fillRect(letter.x, letter.y, letter.width, letter.height);
        ctx.fillStyle = '#BE185D';
        ctx.fillRect(letter.x, letter.y, letter.width, 3);
        
        // Glow effect
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.5)';
        ctx.lineWidth = 3;
        ctx.strokeRect(letter.x - 1, letter.y - 1, letter.width + 2, letter.height + 2);
        
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(letter.text, letter.x + letter.width / 2, letter.y + letter.height / 2 + 6);
      });
    };

    const checkCollision = (pac, letter) => {
      return pac.x < letter.x + letter.width &&
             pac.x + pac.width > letter.x &&
             pac.y < letter.y + letter.height &&
             pac.y + pac.height > letter.y;
    };

    const gameLoop = () => {
      // Background with stars
      ctx.fillStyle = '#001a4d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      ctx.fillStyle = '#FFF';
      for (let i = 0; i < 50; i++) {
        const x = (i * 73) % canvas.width;
        const y = (i * 89) % canvas.height;
        ctx.fillRect(x, y, 2, 2);
      }

      gameState.mouthAngle += 0.1;
      drawPacman();

      gameState.letters = gameState.letters.filter(l => !(l.x < -20 || l.x > canvas.width));
      gameState.letters.forEach(letter => {
        letter.x += letter.vx;
        letter.y += letter.vy;

        if (checkCollision(gameState.pacman, letter)) {
          gameState.score++;
          setScore(gameState.score);
        }
      });

      drawLetters();

      if (Math.random() < 0.03) {
        const wordIndex = Math.floor(Math.random() * words.length);
        gameState.letters.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height - 50),
          width: 35,
          height: 35,
          text: words[wordIndex][0],
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
        });
      }

      // Score display
      ctx.fillStyle = '#00FF00';
      ctx.font = 'bold 28px Arial';
      ctx.fillText(`Score: ${gameState.score}`, canvas.width - 150, 40);

      if (gameActive) {
        animationId = requestAnimationFrame(gameLoop);
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      gameState.pacman.x = e.clientX - rect.left;
      gameState.pacman.y = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gameActive, words]);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 50%, #f59e0b 100%)',
      minHeight: '100vh'
    }} className="flex flex-col items-center justify-center p-4">
      {/* Top Bar */}
      <div className="w-full max-w-3xl mb-6 flex justify-between items-center">
        <button onClick={onBack} className="px-6 py-3 bg-white text-yellow-600 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all">
          ← Back
        </button>
        <div className="text-4xl font-bold text-white text-shadow-lg">👾 Pacman Letters</div>
        <div style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }} className="px-6 py-3 rounded-full text-white font-bold text-xl shadow-lg">
          Score: {score}
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-4 text-center">
        <p className="text-xl text-white font-bold text-shadow">Move your mouse to eat the letters! 🍒</p>
        <p className="text-lg text-white text-shadow">Collect as many as you can! 💛</p>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={900}
        height={500}
        className="border-8 border-white rounded-3xl shadow-2xl bg-gray-900"
      />
    </div>
  );
};
