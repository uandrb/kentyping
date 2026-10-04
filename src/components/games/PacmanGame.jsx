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

      ctx.fillStyle = '#000';
      ctx.arc(pac.x + 8, pac.y - 5, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawLetters = () => {
      gameState.letters.forEach((letter, index) => {
        ctx.fillStyle = '#FF69B4';
        ctx.fillRect(letter.x, letter.y, letter.width, letter.height);
        
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(letter.text, letter.x + letter.width / 2, letter.y + letter.height / 2 + 5);
      });
    };

    const checkCollision = (pac, letter) => {
      return pac.x < letter.x + letter.width &&
             pac.x + pac.width > letter.x &&
             pac.y < letter.y + letter.height &&
             pac.y + pac.height > letter.y;
    };

    const gameLoop = () => {
      ctx.fillStyle = '#000033';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
          width: 30,
          height: 30,
          text: words[wordIndex][0],
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
        });
      }

      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 24px Arial';
      ctx.fillText(`Score: ${gameState.score}`, canvas.width - 120, 40);

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-yellow-500 flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <button onClick={onBack} className="btn-glow px-4 py-2 bg-white rounded-full font-bold">
          ← Back
        </button>
      </div>
      <h1 className="text-4xl font-bold text-white text-shadow-lg mb-4">👾 Pacman Letter Game!</h1>
      <p className="text-white text-lg mb-4">Move your mouse to eat the letters! 🍒</p>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="border-4 border-white rounded-xl shadow-lg bg-gray-900"
      />
    </div>
  );
};
