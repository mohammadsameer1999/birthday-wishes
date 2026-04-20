/* =============================================
   BIRTHDAY WISHES — Ultimate Edition
   ============================================= */

// ===== STARS (Intro) =====
const starsBg = document.getElementById('starsBg');
for (let i = 0; i < 150; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() * 3 + 1;
  s.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random()*100}%; top:${Math.random()*100}%;
    --d:${Math.random()*4+1}s;
    animation-delay:${Math.random()*4}s;
  `;
  starsBg.appendChild(s);
}

// ===== SHOOTING STARS =====
const shootingStars = document.getElementById('shootingStars');
for (let i = 0; i < 5; i++) {
  const ss = document.createElement('div');
  ss.className = 'shooting-star';
  ss.style.cssText = `
    left:${Math.random()*60}%;
    top:${Math.random()*40}%;
    --sd:${4+Math.random()*4}s;
    --delay:${Math.random()*8}s;
  `;
  shootingStars.appendChild(ss);
}

// ===== ENVELOPE CLICK =====
const intro       = document.getElementById('intro');
const envelopeWrap = document.getElementById('envelopeWrap');
const envelopeFlap = document.getElementById('envelopeFlap');
const envelopeLetter = document.getElementById('envelopeLetter');
const screenName  = document.getElementById('screenName');

envelopeWrap.addEventListener('click', () => {
  envelopeFlap.classList.add('open');
  setTimeout(() => envelopeLetter.classList.add('rise'), 300);
  setTimeout(() => {
    intro.classList.add('exit');
    setTimeout(() => {
      intro.style.display = 'none';
      screenName.classList.remove('hidden');
      initHeartCanvas();
      initFloatingHearts();
    }, 1000);
  }, 900);
});

// ===== FLOATING HEARTS (Name screen) =====
function initFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  const hearts = ['💖','💕','💗','💝','🩷','🤍','💜'];
  for (let i = 0; i < 25; i++) {
    const h = document.createElement('div');
    h.className = 'float-heart';
    h.textContent = hearts[Math.floor(Math.random()*hearts.length)];
    h.style.cssText = `
      left:${Math.random()*100}%;
      --size:${1+Math.random()*1.5}rem;
      --dur:${6+Math.random()*8}s;
      --delay:${Math.random()*6}s;
      --rot:${Math.random()*360}deg;
    `;
    container.appendChild(h);
  }
}

// ===== HEART CANVAS (Name screen bg) =====
let heartCtx, heartCanvas;
function initHeartCanvas() {
  heartCanvas = document.getElementById('heartCanvas');
  heartCtx = heartCanvas.getContext('2d');
  heartCanvas.width = window.innerWidth;
  heartCanvas.height = window.innerHeight;
  const hearts = [];
  for (let i = 0; i < 40; i++) {
    hearts.push({
      x: Math.random() * heartCanvas.width,
      y: Math.random() * heartCanvas.height,
      size: Math.random() * 15 + 5,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.15 + 0.03,
      hue: Math.random() * 60 + 320, // pink-purple range
    });
  }
  function drawHeart(cx, cy, size) {
    heartCtx.beginPath();
    const topCurve = size * 0.3;
    heartCtx.moveTo(cx, cy + size * 0.3);
    heartCtx.bezierCurveTo(cx, cy, cx - size, cy, cx - size, cy + topCurve);
    heartCtx.bezierCurveTo(cx - size, cy + size * 0.75, cx, cy + size, cx, cy + size * 1.2);
    heartCtx.bezierCurveTo(cx, cy + size, cx + size, cy + size * 0.75, cx + size, cy + topCurve);
    heartCtx.bezierCurveTo(cx + size, cy, cx, cy, cx, cy + size * 0.3);
    heartCtx.closePath();
  }
  function animateHearts() {
    heartCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
    hearts.forEach(h => {
      h.y -= h.speed;
      if (h.y < -30) { h.y = heartCanvas.height + 30; h.x = Math.random() * heartCanvas.width; }
      heartCtx.save();
      heartCtx.globalAlpha = h.opacity;
      heartCtx.fillStyle = `hsl(${h.hue}, 80%, 70%)`;
      drawHeart(h.x, h.y, h.size);
      heartCtx.fill();
      heartCtx.restore();
    });
    requestAnimationFrame(animateHearts);
  }
  animateHearts();
}

// ===== NAME INPUT =====
const nameInput   = document.getElementById('nameInput');
const nameBtn     = document.getElementById('nameBtn');
const screenMain  = document.getElementById('screenMain');

function startBirthday(name) {
  if (!name.trim()) { showToast('Please enter a name! 🥺'); return; }
  const n = name.trim();
  screenName.classList.add('hidden');
  screenMain.classList.remove('hidden');
  initParticles();
  runCountdown(n);
}

nameBtn.addEventListener('click', () => startBirthday(nameInput.value));
nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') startBirthday(nameInput.value); });

// ===== 3-2-1 COUNTDOWN =====
function runCountdown(name) {
  const burst = document.getElementById('countdownBurst');
  const num   = document.getElementById('countNum');
  const hero  = document.getElementById('heroReveal');
  let count = 3;

  num.textContent = count;

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      num.textContent = count;
      num.style.animation = 'none';
      void num.offsetWidth;
      num.style.animation = '';
    } else {
      clearInterval(interval);
      burst.classList.add('hidden');
      hero.classList.remove('hidden');

      // Set name
      document.getElementById('megaTitle').textContent = `Happy Birthday, ${name}!`;
      document.getElementById('megaSub').innerHTML = `Today the universe celebrates <strong>YOU</strong>, ${name}! 🎉<br/>You make the world a brighter, more beautiful place.`;
      document.getElementById('letterGreeting').textContent = `Dear ${name},`;
      document.getElementById('cakeName').textContent = `♥ ${name} ♥`;

      buildCandles(5);
      buildWishCards();
      buildMemoryGrid();
      updateAgeFun();
      startFireworks();
      launchConfetti(200);
      startRotatingWords();

      // Show birthday quote with fireworks after a small delay
      setTimeout(() => showBirthdayQuote(), 1200);

      // Start letter typewriter when user scrolls there
      startTypewriter(name);
    }
  }, 800);
}

// ===== BIRTHDAY QUOTES (appears with fireworks) =====
const birthdayQuotes = [
  { text: "Count your life by smiles, not tears. Count your age by friends, not years.", author: "— John Lennon" },
  { text: "The more you praise and celebrate your life, the more there is in life to celebrate.", author: "— Oprah Winfrey" },
  { text: "Today you are you! That is truer than true! There is no one alive who is you-er than you!", author: "— Dr. Seuss" },
  { text: "You don't get older, you get better. Like a fine wine, you only improve with time.", author: "— Unknown" },
  { text: "Birthdays are nature's way of telling us to eat more cake and celebrate more!", author: "— Unknown" },
  { text: "May the joy that you have spread in the past come back to you on this day.", author: "— Unknown" },
  { text: "A birthday is not a day to fear. It is a day to celebrate the gift of life.", author: "— Unknown" },
  { text: "The greatest gift you can give someone is your time, your love, and your attention.", author: "— Unknown" },
  { text: "Here's to another year of laughing until it hurts, making memories, and living life to the fullest!", author: "— Unknown" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "— C.S. Lewis" },
];

function showBirthdayQuote() {
  const quoteBox   = document.getElementById('bdayQuote');
  const quoteText  = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  const scrollHint = document.getElementById('scrollHint');

  // Pick a random quote
  const q = birthdayQuotes[Math.floor(Math.random() * birthdayQuotes.length)];

  // Show the quote box and re-trigger animation
  quoteBox.style.display = '';
  quoteBox.style.animation = 'none';
  void quoteBox.offsetWidth; // force reflow
  quoteBox.style.animation = '';
  quoteText.textContent = '';

  // Typewriter for quote
  let i = 0;
  const fullText = q.text;

  function typeQuote() {
    if (i < fullText.length) {
      quoteText.textContent += fullText.charAt(i);
      i++;
      // Burst mini fireworks at certain points
      if (i % 30 === 0) {
        burstFireworks(2);
      }
      setTimeout(typeQuote, 35);
    } else {
      quoteText.classList.add('done');
      quoteAuthor.textContent = q.author;
      quoteAuthor.classList.add('show');
      // Show scroll hint
      setTimeout(() => {
        scrollHint.style.display = '';
        scrollHint.style.animation = 'none';
        void scrollHint.offsetWidth;
        scrollHint.style.animation = '';
      }, 800);
      // Auto burst celebration fireworks at end
      burstFireworks(5);
      launchConfetti(100);
    }
  }

  typeQuote();
}

// ===== PARTICLES =====
const particlesEl = document.getElementById('particles');
const pColors = ['#ff6eb4','#ffd700','#ff6348','#a855f7','#06b6d4','#ec4899','#34d399'];

function initParticles() {
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 12 + 4;
    const shapes = ['50%','4px','0'];
    p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${pColors[Math.floor(Math.random()*pColors.length)]};
      left:${Math.random()*100}%;
      border-radius:${shapes[Math.floor(Math.random()*shapes.length)]};
      --dur:${Math.random()*12+6}s;
      --delay:${Math.random()*8}s;
    `;
    particlesEl.appendChild(p);
  }
}

// ===== CANDLES =====
const candleColors = ['#ff6eb4','#a855f7','#ffd700','#06b6d4','#ff6348','#ec4899'];

function buildCandles(n) {
  const row = document.getElementById('candleRow');
  row.innerHTML = '';
  const count = Math.min(n, 12);
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'candle';
    c.style.background = `linear-gradient(${candleColors[i % candleColors.length]}, ${candleColors[(i+2) % candleColors.length]})`;
    c.style.animationDelay = `${i * 0.08}s`;
    c.innerHTML = `<div class="flame"></div>`;
    row.appendChild(c);
  }
}

// ===== BLOW CANDLES =====
const blowBtn   = document.getElementById('blowBtn');
const wishReveal = document.getElementById('wishReveal');

blowBtn.addEventListener('click', () => {
  const flames = document.querySelectorAll('.flame');
  flames.forEach((f, i) => setTimeout(() => {
    f.classList.add('blown');
    // Smoke puff effect
    createSmoke(f);
  }, i * 200));
  blowBtn.disabled = true;

  const cake = document.getElementById('cake');
  setTimeout(() => cake.classList.add('wiggle'), flames.length * 200 + 100);

  setTimeout(() => {
    wishReveal.classList.remove('hidden');
    launchConfetti(250);
    burstFireworks(10);
  }, flames.length * 200 + 500);
});

function createSmoke(flame) {
  const rect = flame.getBoundingClientRect();
  for (let i = 0; i < 5; i++) {
    const smoke = document.createElement('div');
    smoke.style.cssText = `
      position:fixed;
      left:${rect.left + rect.width/2}px;
      top:${rect.top}px;
      width:${6+Math.random()*8}px;
      height:${6+Math.random()*8}px;
      background:rgba(200,200,200,0.4);
      border-radius:50%;
      pointer-events:none;
      z-index:999;
      transition: all 1s ease-out;
    `;
    document.body.appendChild(smoke);
    requestAnimationFrame(() => {
      smoke.style.transform = `translate(${Math.random()*30-15}px, -${40+Math.random()*40}px) scale(2)`;
      smoke.style.opacity = '0';
    });
    setTimeout(() => smoke.remove(), 1200);
  }
}

// ===== WISH CARDS =====
const wishes = [
  { icon: "🎂", text: "May every candle light your path to infinite happiness!" },
  { icon: "🌟", text: "Your dreams are powerful — may they all come true this year!" },
  { icon: "💖", text: "You are loved beyond measure. Never forget that!" },
  { icon: "🎁", text: "May today overflow with joy, laughter, and beautiful surprises." },
  { icon: "🥂", text: "Cheers to you and another amazing chapter of your incredible life!" },
  { icon: "🌈", text: "May every day ahead be brighter and more colorful than the last." },
  { icon: "✨", text: "Your light makes the world magical. Keep shining, always!" },
  { icon: "🦋", text: "May you spread your wings and soar to unimaginable heights!" },
  { icon: "🌺", text: "Like a flower, may you bloom more beautifully each day." },
  { icon: "🎵", text: "May your life be filled with music, dance, and celebration!" },
];

function buildWishCards() {
  const container = document.getElementById('wishesTrack');
  container.innerHTML = '';
  wishes.forEach((w, i) => {
    const card = document.createElement('div');
    card.className = 'wish-card';
    card.style.setProperty('--d', `${0.3 + i * 0.12}s`);
    card.style.setProperty('--rot', `${Math.random()*6-3}deg`);
    card.innerHTML = `<span class="wc-icon" style="--d:${i*0.2}s">${w.icon}</span><span class="wc-text">${w.text}</span>`;
    container.appendChild(card);
  });
}

// ===== MEMORY / CELEBRATION GRID (INTERACTIVE!) =====
const memoryItems = [
  { emoji: "🎉", text: "Party Time!", bg: "linear-gradient(135deg, #ff6eb4, #ff2d75)", action: "party" },
  { emoji: "🎈", text: "Balloons!", bg: "linear-gradient(135deg, #a855f7, #7c3aed)", action: "balloons" },
  { emoji: "🎂", text: "Cake!", bg: "linear-gradient(135deg, #ffd700, #ff6348)", action: "cake" },
  { emoji: "🎁", text: "Gifts!", bg: "linear-gradient(135deg, #06b6d4, #3b82f6)", action: "gifts" },
  { emoji: "💃", text: "Dance!", bg: "linear-gradient(135deg, #ec4899, #f43f5e)", action: "dance" },
  { emoji: "🎵", text: "Music!", bg: "linear-gradient(135deg, #8b5cf6, #6366f1)", action: "music" },
  { emoji: "🌟", text: "Stars!", bg: "linear-gradient(135deg, #fbbf24, #f59e0b)", action: "stars" },
  { emoji: "💝", text: "Love!", bg: "linear-gradient(135deg, #f43f5e, #e11d48)", action: "love" },
];

function buildMemoryGrid() {
  const grid = document.getElementById('memoryGrid');
  grid.innerHTML = '';
  memoryItems.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.style.background = item.bg;
    card.style.setProperty('--d', `${0.2 + i * 0.1}s`);
    card.innerHTML = `<span class="mem-emoji">${item.emoji}</span>${item.text}<span class="tap-hint">Tap me!</span>`;
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => triggerAction(item.action, card));
    grid.appendChild(card);
  });
}

// ===== INTERACTIVE ACTIONS =====
function triggerAction(action, card) {
  // Pulse the card
  card.classList.add('card-active');
  setTimeout(() => card.classList.remove('card-active'), 600);

  const rect = card.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  switch (action) {
    case 'party':
      actionParty(cx, cy);
      break;
    case 'balloons':
      actionBalloons();
      break;
    case 'cake':
      actionCake(cx, cy);
      break;
    case 'gifts':
      actionGifts();
      break;
    case 'dance':
      actionDance();
      break;
    case 'music':
      actionMusic();
      break;
    case 'stars':
      actionStars();
      break;
    case 'love':
      actionLove();
      break;
  }
}

// 🎉 PARTY — confetti explosion + fireworks + toast
function actionParty(cx, cy) {
  launchConfetti(200);
  burstFireworks(8);
  launchSparks(cx, cy, 30);
  showToast("🎉 Let's Party! Woohoo!");

  // Party poppers flying from corners
  const poppers = ['🎊','🎉','🥳','🪅','🎆'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'action-float';
      el.textContent = poppers[Math.floor(Math.random() * poppers.length)];
      el.style.cssText = `
        left:${Math.random()*100}vw;
        --end-y:${-300 - Math.random()*400}px;
        --end-x:${Math.random()*200 - 100}px;
        --rot:${Math.random()*720 - 360}deg;
        font-size:${1.5 + Math.random()*2}rem;
        animation-duration:${1.5 + Math.random()*1.5}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3500);
    }, i * 80);
  }
}

// 🎈 BALLOONS — balloons inflate and float up from bottom
function actionBalloons() {
  showToast("🎈 Balloons everywhere!");
  const colors = ['#ff6eb4','#a855f7','#ffd700','#06b6d4','#ff6348','#34d399','#f43f5e','#fbbf24'];
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const b = document.createElement('div');
      b.className = 'fly-balloon';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 40 + Math.random() * 30;
      b.style.cssText = `
        left:${5 + Math.random() * 90}vw;
        width:${size}px;
        height:${size * 1.2}px;
        background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.5), ${color});
        --sway:${Math.random() * 80 - 40}px;
        animation-duration:${3 + Math.random() * 3}s;
      `;
      // Add string
      const str = document.createElement('div');
      str.className = 'balloon-string';
      b.appendChild(str);
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 6500);
    }, i * 150);
  }
}

// 🎂 CAKE — cake slices fly out + sparklers
function actionCake(cx, cy) {
  showToast("🎂 Time to cut the cake!");
  launchSparks(cx, cy, 20);
  const cakeEmojis = ['🍰','🧁','🎂','🍩','🍪','🍫','🍬'];
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'action-float';
      el.textContent = cakeEmojis[Math.floor(Math.random() * cakeEmojis.length)];
      el.style.cssText = `
        left:${cx}px;
        top:${cy}px;
        position:fixed;
        --end-y:${-200 - Math.random()*300}px;
        --end-x:${Math.random()*300 - 150}px;
        --rot:${Math.random()*360}deg;
        font-size:${1.5 + Math.random()*1.5}rem;
        animation-duration:${1.5 + Math.random()*1}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }, i * 60);
  }
  // Sparkle ring
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI * 2 / 12) * i;
    const sp = document.createElement('div');
    sp.className = 'sparkle-dot';
    sp.style.cssText = `
      left:${cx}px; top:${cy}px;
      --tx:${Math.cos(angle)*120}px;
      --ty:${Math.sin(angle)*120}px;
    `;
    document.body.appendChild(sp);
    setTimeout(() => sp.remove(), 1000);
  }
}

// 🎁 GIFTS — gift boxes rain down
function actionGifts() {
  showToast("🎁 Surprise gifts for you!");
  burstFireworks(3);
  const gifts = ['🎁','🎀','🛍️','📦','💝'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'gift-rain';
      el.textContent = gifts[Math.floor(Math.random() * gifts.length)];
      el.style.cssText = `
        left:${Math.random()*100}vw;
        font-size:${1.5 + Math.random()*1.5}rem;
        animation-duration:${2 + Math.random()*2}s;
        animation-delay:${Math.random()*0.3}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4500);
    }, i * 100);
  }
}

// 💃 DANCE — disco lights + dancing emojis
function actionDance() {
  showToast("💃 Let's dance! 🕺");

  // Disco overlay flash
  const disco = document.createElement('div');
  disco.className = 'disco-flash';
  document.body.appendChild(disco);
  setTimeout(() => disco.remove(), 3000);

  // Dancing emojis
  const dancers = ['💃','🕺','👯','🪩','🎶','💫'];
  for (let i = 0; i < 14; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'dancer-emoji';
      el.textContent = dancers[Math.floor(Math.random() * dancers.length)];
      el.style.cssText = `
        left:${10 + Math.random()*80}vw;
        bottom:0;
        font-size:${2 + Math.random()*2}rem;
        --sway:${Math.random()*60 - 30}px;
        animation-duration:${2 + Math.random()*2}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4500);
    }, i * 120);
  }
}

// 🎵 MUSIC — music notes float + beat pulse
function actionMusic() {
  showToast("🎵 Feel the beat! 🎶");

  // Try to play audio
  const music = document.getElementById('bgMusic');
  music.play().catch(() => {});
  const toggle = document.getElementById('musicToggle');
  toggle.classList.add('playing');

  // Floating music notes
  const notes = ['🎵','🎶','🎼','🎸','🎹','🎺','🥁','🎷'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'action-float';
      el.textContent = notes[Math.floor(Math.random() * notes.length)];
      el.style.cssText = `
        left:${Math.random()*100}vw;
        --end-y:${-300 - Math.random()*400}px;
        --end-x:${Math.random()*150 - 75}px;
        --rot:${Math.random()*360}deg;
        font-size:${1.5 + Math.random()*2}rem;
        animation-duration:${2 + Math.random()*2}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4500);
    }, i * 100);
  }

  // Beat pulse overlay
  const beat = document.createElement('div');
  beat.className = 'beat-pulse';
  document.body.appendChild(beat);
  setTimeout(() => beat.remove(), 2500);
}

// 🌟 STARS — shooting stars + golden sparkles
function actionStars() {
  showToast("🌟 You're a star!");
  burstFireworks(6);

  // Shooting stars across screen
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const star = document.createElement('div');
      star.className = 'action-shooting-star';
      star.style.cssText = `
        top:${Math.random()*50}vh;
        left:-100px;
        animation-duration:${0.8 + Math.random()*0.5}s;
      `;
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 2000);
    }, i * 200);
  }

  // Golden sparkle burst
  const stars = ['⭐','🌟','✨','💫','🔆'];
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'action-float';
      el.textContent = stars[Math.floor(Math.random() * stars.length)];
      el.style.cssText = `
        left:${Math.random()*100}vw;
        --end-y:${-300 - Math.random()*300}px;
        --end-x:${Math.random()*200 - 100}px;
        --rot:${Math.random()*360}deg;
        font-size:${1.2 + Math.random()*2}rem;
        animation-duration:${1.5 + Math.random()*1.5}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3500);
    }, i * 70);
  }
}

// 💝 LOVE — hearts explosion
function actionLove() {
  showToast("💝 Sending all my love!");
  const hearts = ['❤️','💖','💗','💕','💓','💞','💝','🩷','🤍','💜','♥️'];
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'love-heart';
      el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      const startX = Math.random() * 100;
      el.style.cssText = `
        left:${startX}vw;
        font-size:${1.5 + Math.random()*2.5}rem;
        --sway:${Math.random()*80 - 40}px;
        animation-duration:${2.5 + Math.random()*2}s;
        animation-delay:${Math.random()*0.2}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }, i * 80);
  }
}

// ===== TYPEWRITER (Letter) =====
function startTypewriter(name) {
  const el = document.getElementById('typewriter');
  const text = `On this special day, I just want you to know how truly amazing you are, ${name}.\n\nYou bring so much light into everyone's life. Your smile can make the darkest day bright. Your kindness inspires everyone around you.\n\nMay this birthday be the start of the most beautiful chapter yet. You deserve all the happiness in the world and more!\n\nHappy Birthday! 🎂🎉`;

  let i = 0;
  el.textContent = '';
  const sign = document.querySelector('.letter-sign');

  // Use IntersectionObserver to start typing when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.disconnect();
        typeNext();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(el);

  function typeNext() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typeNext, text.charAt(i-1) === '\n' ? 200 : 28);
    } else {
      el.classList.add('done');
      sign.classList.add('show');
    }
  }
}

// ===== AGE COUNTER =====
let age = 1;
const ageFacts = [
  "You're a brand new adventure! 🍼",
  "Just getting started — the world is yours! 🌍",
  "Three cheers! Hip hip hooray! 🎊",
  "Every year wiser and more amazing! 🧠",
  "Still young, wild, and free! 🦅",
  "You're absolutely in your prime! 💪",
  "A whole decade of awesome! 🎯",
  "Like fine wine — getting better with time! 🍷",
  "Two decades of pure awesomeness! 🔥",
  "Thirty and absolutely thriving! 🚀",
  "Forty and fabulous! 💎",
  "Fifty and phenomenal! 🌟",
  "Sixty and spectacular! 👑",
  "Seventy years of pure gold! 🏆",
  "A legend in the making! 🦁",
  "Timeless and extraordinary! ⭐",
];

function getFact(n) {
  if (n <= 1)  return ageFacts[0];
  if (n <= 3)  return ageFacts[1];
  if (n <= 5)  return ageFacts[2];
  if (n <= 9)  return ageFacts[3];
  if (n <= 12) return ageFacts[4];
  if (n <= 17) return ageFacts[5];
  if (n <= 19) return ageFacts[6];
  if (n <= 25) return ageFacts[7];
  if (n <= 29) return ageFacts[8];
  if (n <= 39) return ageFacts[9];
  if (n <= 49) return ageFacts[10];
  if (n <= 59) return ageFacts[11];
  if (n <= 69) return ageFacts[12];
  if (n <= 79) return ageFacts[13];
  if (n <= 89) return ageFacts[14];
  return ageFacts[15];
}

function updateAgeFun() {
  const display = document.getElementById('ageDisplay');
  const fun     = document.getElementById('ageFun');
  const cands   = document.getElementById('ageCandles');
  display.textContent = age;
  display.classList.remove('pop');
  void display.offsetWidth;
  display.classList.add('pop');
  fun.textContent = getFact(age);
  cands.innerHTML = '';
  const show = Math.min(age, 30);
  for (let i = 0; i < show; i++) {
    const mc = document.createElement('span');
    mc.className = 'mini-candle';
    mc.textContent = '🕯️';
    mc.style.setProperty('--d', `${i * 0.05}s`);
    cands.appendChild(mc);
  }
  if (age > 30) {
    const more = document.createElement('span');
    more.style.cssText = 'color:rgba(255,255,255,0.5);font-size:0.85rem;';
    more.textContent = ` +${age - 30} more!`;
    cands.appendChild(more);
  }
}

document.getElementById('ageUp').addEventListener('click', () => {
  if (age < 120) { age++; updateAgeFun(); }
});
document.getElementById('ageDown').addEventListener('click', () => {
  if (age > 1) { age--; updateAgeFun(); }
});

// ===== ROTATING WORDS =====
function startRotatingWords() {
  const words = document.querySelectorAll('.rw');
  let current = 0;
  setInterval(() => {
    words[current].classList.remove('active');
    words[current].classList.add('exit');
    setTimeout(() => words[current === 0 ? words.length - 1 : current - 1].classList.remove('exit'), 500);
    current = (current + 1) % words.length;
    words[current].classList.add('active');
  }, 2500);
}

// ===== FIREWORKS (Canvas) =====
const canvas = document.getElementById('fireworks');
const ctx    = canvas.getContext('2d');
let fwParticles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createFirework(x, y) {
  const count = 80;
  const hue   = Math.random() * 360;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 / count) * i;
    const speed = Math.random() * 6 + 2;
    fwParticles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: Math.random() * 0.012 + 0.008,
      size: Math.random() * 3 + 1,
      hue: hue + Math.random() * 50 - 25,
      trail: [],
    });
  }
}

function animateFireworks() {
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fwParticles = fwParticles.filter(p => p.life > 0);
  fwParticles.forEach(p => {
    // Trail
    p.trail.push({x: p.x, y: p.y, life: p.life});
    if (p.trail.length > 5) p.trail.shift();

    p.x  += p.vx;
    p.y  += p.vy;
    p.vy += 0.06;
    p.vx *= 0.985;
    p.life -= p.decay;

    // Draw trail
    p.trail.forEach((t) => {
      ctx.beginPath();
      ctx.arc(t.x, t.y, p.size * t.life * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${t.life * 0.3})`;
      ctx.fill();
    });

    // Draw main
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.life})`;
    ctx.fill();
  });

  requestAnimationFrame(animateFireworks);
}
animateFireworks();

function burstFireworks(count = 5) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      createFirework(
        canvas.width  * (0.1 + Math.random() * 0.8),
        canvas.height * (0.1 + Math.random() * 0.5)
      );
    }, i * 250);
  }
}

let fwInterval;
function startFireworks() {
  burstFireworks(8);
  fwInterval = setInterval(() => {
    createFirework(
      canvas.width  * (0.1 + Math.random() * 0.8),
      canvas.height * (0.1 + Math.random() * 0.4)
    );
  }, 1500);
  setTimeout(() => clearInterval(fwInterval), 12000);
}

// ===== CONFETTI =====
const confettiColors = ['#ff6eb4','#ffd700','#ff2d75','#a855f7','#06b6d4','#fbbf24','#f43f5e','#34d399'];

function launchConfetti(total = 150) {
  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'confetti';
      const size  = Math.random() * 10 + 5;
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const rot   = Math.random() * 1080 - 540;
      const sx    = Math.random() > 0.5 ? 1 : -1;
      const shapes = ['50%','2px','0'];
      const shape = shapes[Math.floor(Math.random()*3)];
      c.style.cssText = `
        left:${Math.random()*100}vw;
        top:-20px;
        width:${size}px;
        height:${size * (shape === '0' ? 1.2 : 1)}px;
        background:${color};
        border-radius:${shape};
        clip-path:${shape === '0' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'};
        --dur:${Math.random()*2.5+2}s;
        --rot:${rot}deg;
        --sx:${sx};
      `;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5500);
    }, i * 15);
  }
}

// ===== SPARKS =====
function launchSparks(x, y, count = 24) {
  const colors = ['#ffd700','#ff6eb4','#a855f7','#06b6d4','#fff'];
  for (let i = 0; i < count; i++) {
    const sp = document.createElement('div');
    sp.className = 'spark';
    const angle = (Math.PI * 2 / count) * i;
    const dist  = 60 + Math.random() * 80;
    sp.style.cssText = `
      left:${x}px; top:${y}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      --dur:${Math.random()*0.5+0.3}s;
      --tx:${Math.cos(angle)*dist}px;
      --ty:${Math.sin(angle)*dist}px;
    `;
    document.body.appendChild(sp);
    setTimeout(() => sp.remove(), 1000);
  }
}

// ===== SHARE =====
document.getElementById('shareBtn').addEventListener('click', () => {
  launchConfetti(100);
  burstFireworks(5);
  showToast('🎉 Screenshot this and share the birthday love!');
});

// ===== MUSIC TOGGLE =====
const music  = document.getElementById('bgMusic');
const toggle = document.getElementById('musicToggle');
let playing = false;
toggle.addEventListener('click', () => {
  if (playing) {
    music.pause();
    toggle.classList.remove('playing');
  } else {
    music.play().catch(() => {});
    toggle.classList.add('playing');
  }
  playing = !playing;
});

// ===== TOAST =====
function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => t.classList.add('show'));
  });
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 500);
  }, 3500);
}
