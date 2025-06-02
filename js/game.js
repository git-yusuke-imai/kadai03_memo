const gameArea = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');

let score = 0;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
highScoreDisplay.textContent = highScore;

const player = document.createElement('div');
player.className = 'player';
gameArea.appendChild(player);

let jumping = false;

function jump() {
  if (jumping) return;
  jumping = true;
  
  player.style.transition = 'bottom 0.3s';
  player.style.bottom = '200px';

  setTimeout(() => {
    
    player.style.transition = 'bottom 0.4s';
    player.style.bottom = '5px';
    setTimeout(() => jumping = false, 400);
  }, 300);
}

//start
document.getElementById('startGame').addEventListener('click', () => {
  score = 0;
  scoreDisplay.textContent = score;
  // スポーン開始
});
// ジャンプ操作
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') jump();
});
gameArea.addEventListener('click', jump);

function spawnBox() {
  const box = document.createElement('div');
  const typeRand = Math.random();
  let type = 'normal';
  let points = 10;

  if (typeRand < 0.1) {
    type = 'bad';
    points = -20;
  } else if (typeRand > 0.85) {
    type = 'rare';
    points = 50;
  }

  box.className = `box ${type}`;
  box.dataset.points = points;

  // 縦位置をランダムに設定（top固定）
  box.style.top = `${Math.floor(Math.random() * 200) + 50}px`;
  box.style.left = '0'; // 固定
  box.style.transform = `translateX(${gameArea.clientWidth}px)`; // 最初は右端
  gameArea.appendChild(box);

  let pos = gameArea.clientWidth; // 右端から
  const speed = 4;
  const interval = setInterval(() => {
    pos -= speed;
    box.style.transform = `translateX(${pos}px)`;

    const boxRect = box.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    // 衝突判定

    // ← ここでプレイヤーの当たり判定を調整（左に+20px、右に-20pxなど）
  const adjustedPlayerRect = {
   left: playerRect.left + 20,
   right: playerRect.right - 70,
   top: playerRect.top - 10,    // 必要なら縦方向も
   bottom: playerRect.bottom - 10
  };
  if (
    boxRect.right > adjustedPlayerRect.left &&
    boxRect.left < adjustedPlayerRect.right &&
    boxRect.bottom > adjustedPlayerRect.top &&
    boxRect.top < adjustedPlayerRect.bottom
  )
   {
      clearInterval(interval);
      gameArea.removeChild(box);
      score += points;
      score = Math.max(score, 0); // マイナススコア防止
      scoreDisplay.textContent = score;

      if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = highScore;
      }
    }

    // 左端に到達したら削除
    if (pos < -50) { // box幅より少し多めに
      clearInterval(interval);
      if (gameArea.contains(box)) gameArea.removeChild(box);
    }
  }, 20);
}

setInterval(spawnBox, 1200);

document.getElementById('resetStorage').addEventListener('click', () => {
  localStorage.removeItem('highScore');  // ローカルストレージから削除
  highScore = 0;
  highScoreDisplay.textContent = highScore;
  
});

