/* =============================================
   BIRTHDAY WISHES — Romantic Premium Edition
   ============================================= */

// ===== NEBULA CANVAS (Intro Background) =====
const nebulaCanvas = document.getElementById('nebulaCanvas');
const nCtx = nebulaCanvas.getContext('2d');
let nebulaRunning = true;

function initNebula() {
  nebulaCanvas.width = window.innerWidth;
  nebulaCanvas.height = window.innerHeight;

  const stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * nebulaCanvas.width,
      y: Math.random() * nebulaCanvas.height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      da: (Math.random() - 0.5) * 0.02,
    });
  }

  const nebulae = [];
  const nColors = [
    [255, 45, 117],   // rose
    [168, 85, 247],   // purple
    [232, 168, 124],  // rosegold
    [255, 110, 180],  // pink
    [124, 58, 237],   // violet
  ];
  for (let i = 0; i < 5; i++) {
    nebulae.push({
      x: Math.random() * nebulaCanvas.width,
      y: Math.random() * nebulaCanvas.height,
      r: 150 + Math.random() * 200,
      color: nColors[i],
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    });
  }

  function drawNebula() {
    if (!nebulaRunning) return;
    nCtx.fillStyle = 'rgba(5,0,16,0.15)';
    nCtx.fillRect(0, 0, nebulaCanvas.width, nebulaCanvas.height);

    // Nebula clouds
    nebulae.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -n.r) n.x = nebulaCanvas.width + n.r;
      if (n.x > nebulaCanvas.width + n.r) n.x = -n.r;
      if (n.y < -n.r) n.y = nebulaCanvas.height + n.r;
      if (n.y > nebulaCanvas.height + n.r) n.y = -n.r;

      const grad = nCtx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      grad.addColorStop(0, `rgba(${n.color[0]},${n.color[1]},${n.color[2]},0.04)`);
      grad.addColorStop(1, 'transparent');
      nCtx.fillStyle = grad;
      nCtx.fillRect(0, 0, nebulaCanvas.width, nebulaCanvas.height);
    });

    // Stars
    stars.forEach(s => {
      s.alpha += s.da;
      if (s.alpha <= 0 || s.alpha >= 1) s.da *= -1;
      s.alpha = Math.max(0, Math.min(1, s.alpha));

      nCtx.beginPath();
      nCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      nCtx.fillStyle = `rgba(255,255,255,${s.alpha * 0.8})`;
      nCtx.fill();
    });

    requestAnimationFrame(drawNebula);
  }
  drawNebula();
}
initNebula();

window.addEventListener('resize', () => {
  nebulaCanvas.width = window.innerWidth;
  nebulaCanvas.height = window.innerHeight;
});

// ===== ROSE PETALS (Intro) =====
const rosePetals = document.getElementById('rosePetals');
for (let i = 0; i < 20; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  p.style.cssText = `
    left:${Math.random() * 100}%;
    width:${14 + Math.random() * 12}px;
    height:${10 + Math.random() * 10}px;
    --dur:${8 + Math.random() * 10}s;
    --delay:${Math.random() * 10}s;
    --rot:${Math.random() * 540 - 270}deg;
    --sway:${Math.random() * 100 - 50}px;
    opacity:0;
  `;
  rosePetals.appendChild(p);
}

// ===== 3D PARALLAX ENVELOPE (mouse follow) =====
const envelopeWrap = document.getElementById('envelopeWrap');
const envelope3d = document.getElementById('envelope3d');

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    if (!envelope3d || !envelopeWrap.offsetParent) return;
    const rect = envelopeWrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    envelope3d.style.transform = `rotateY(${dx * 15}deg) rotateX(${-dy * 15}deg)`;
  });
}

// ===== CURSOR TRAIL (Desktop) =====
const cursorTrail = document.getElementById('cursorTrail');
const trailColors = ['#ff6eb4', '#ffd700', '#a855f7', '#e8a87c', '#ff2d75'];

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    const color = trailColors[Math.floor(Math.random() * trailColors.length)];
    dot.style.cssText = `
      left:${e.clientX - 3}px;top:${e.clientY - 3}px;
      background:${color};box-shadow:0 0 6px ${color};
      opacity:0.8;transform:scale(1);
    `;
    cursorTrail.appendChild(dot);
    requestAnimationFrame(() => {
      dot.style.opacity = '0';
      dot.style.transform = 'scale(0)';
    });
    setTimeout(() => dot.remove(), 800);
    if (cursorTrail.children.length > 25) cursorTrail.firstChild.remove();
  });
}

// ===== ENVELOPE CLICK =====
const intro = document.getElementById('intro');
const envelopeFlap = document.getElementById('envelopeFlap');
const envelopeLetter = document.getElementById('envelopeLetter');
const screenName = document.getElementById('screenName');

envelopeWrap.addEventListener('click', () => {
  envelopeFlap.classList.add('open');
  setTimeout(() => envelopeLetter.classList.add('rise'), 400);
  setTimeout(() => {
    intro.classList.add('exit');
    setTimeout(() => {
      intro.style.display = 'none';
      nebulaRunning = false;
      screenName.classList.remove('hidden');
      screenName.style.animation = 'fadeInUp 0.8s ease both';
      initHeartCanvas();
      initFloatingHearts();
    }, 1200);
  }, 1000);
});

// ===== FLOATING HEARTS (Name screen) =====
function initFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  const hearts = ['💖', '💕', '💗', '💝', '🩷', '🤍', '💜', '🌹'];
  for (let i = 0; i < 25; i++) {
    const h = document.createElement('div');
    h.className = 'float-heart';
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.cssText = `
      left:${Math.random() * 100}%;
      --size:${1 + Math.random() * 1.5}rem;
      --dur:${6 + Math.random() * 8}s;
      --delay:${Math.random() * 6}s;
      --rot:${Math.random() * 360}deg;
    `;
    container.appendChild(h);
  }
}

// ===== HEART CANVAS (Name screen) =====
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
      opacity: Math.random() * 0.12 + 0.02,
      hue: Math.random() * 40 + 330,
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
const nameInput = document.getElementById('nameInput');
const nameBtn = document.getElementById('nameBtn');
const screenMain = document.getElementById('screenMain');

function startBirthday(name) {
  if (!name.trim()) { showToast('Enter their name first! 💕'); return; }
  const n = name.trim();

  // Smooth transition
  screenName.style.animation = 'none';
  screenName.style.transition = 'opacity 0.8s, filter 0.8s, transform 0.8s';
  screenName.style.opacity = '0';
  screenName.style.filter = 'blur(20px)';
  screenName.style.transform = 'scale(1.05)';

  setTimeout(() => {
    screenName.classList.add('hidden');
    screenName.style.cssText = '';
    screenMain.classList.remove('hidden');
    screenMain.style.animation = 'fadeInUp 0.6s ease both';
    initParticles();
    initSongVisualizer();
    initScrollReveal();
    runCountdown(n);
  }, 800);
}

nameBtn.addEventListener('click', () => startBirthday(nameInput.value));
nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') startBirthday(nameInput.value); });

// ===== SONG VISUALIZER BARS =====
function initSongVisualizer() {
  const viz = document.getElementById('songVisualizer');
  for (let i = 0; i < 30; i++) {
    const bar = document.createElement('div');
    bar.className = 'viz-bar';
    bar.style.cssText = `
      --d:${0.3 + Math.random() * 0.8}s;
      --h1:${5 + Math.random() * 15}px;
      --h2:${20 + Math.random() * 40}px;
      animation-delay:${Math.random()}s;
    `;
    viz.appendChild(bar);
  }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const sections = document.querySelectorAll('.love-section, .cake-section, .song-section, .letter-section, .wishes-section, .memory-section, .age-section, .final-section');
  sections.forEach(s => s.classList.add('reveal-on-scroll'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Auto confetti when final section appears
        if (entry.target.id === 'finalSection') {
          launchConfetti(100);
          burstFireworks(5);
        }
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(s => observer.observe(s));
}

// ===== 3-2-1 COUNTDOWN =====
function runCountdown(name) {
  const burst = document.getElementById('countdownBurst');
  const num = document.getElementById('countNum');
  const hero = document.getElementById('heroReveal');
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

      // Screen flash effect!
      const flash = document.createElement('div');
      flash.className = 'screen-flash';
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 700);

      burst.classList.add('hidden');
      hero.classList.remove('hidden');

      // Letter-by-letter title reveal
      const titleEl = document.getElementById('megaTitle');
      const titleText = `Happy Birthday, ${name}!`;
      titleEl.innerHTML = '';
      [...titleText].forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'title-letter';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.setProperty('--d', `${0.6 + i * 0.04}s`);
        titleEl.appendChild(span);
      });

      document.getElementById('megaSub').innerHTML = `Today the stars aligned just for <strong>you</strong>, ${name} 💫<br/>The universe celebrates the day you were born.`;
      document.getElementById('letterGreeting').textContent = `My Dearest ${name},`;
      document.getElementById('cakeName').textContent = `♥ ${name} ♥`;

      buildCandles(5);
      buildWishCards();
      buildMemoryGrid();
      buildLoveTimeline(name);
      initLetterPetals();
      updateAgeFun();
      startFireworks();
      launchConfetti(200);
      startRotatingWords();

      setTimeout(() => showBirthdayQuote(), 1500);

      startTypewriter(name);
      startBirthdaySong(name);
    }
  }, 800);
}

// ===== LOVE TIMELINE (NEW!) =====
function buildLoveTimeline(name) {
  const container = document.getElementById('loveTimeline');
  container.innerHTML = '';

  const cards = [
    { icon: '💫', text: `The day I first saw you, <strong>everything changed</strong>. Some people just have that magic — and ${name}, you have it all.` },
    { icon: '🌹', text: `Your smile is my <strong>favorite thing</strong> in this whole world. It lights up everything around you.` },
    { icon: '🎁', text: `Every moment with you feels like a <strong>gift</strong>. You make even ordinary days feel extraordinary.` },
    { icon: '✨', text: `You have this incredible way of making <strong>everyone around you feel special</strong>. That's your superpower.` },
    { icon: '💖', text: `I'm so incredibly lucky to have you in my life. You make my world <strong>brighter, warmer, and more beautiful</strong>.` },
    { icon: '👑', text: `Today is YOUR day, ${name}. And you deserve <strong>every single bit of happiness</strong> coming your way.` },
  ];

  cards.forEach((card, i) => {
    const el = document.createElement('div');
    el.className = `love-card ${i % 2 === 0 ? 'from-left' : 'from-right'}`;
    el.innerHTML = `<span class="love-card-icon">${card.icon}</span><p class="love-card-text">${card.text}</p>`;
    container.appendChild(el);
  });

  // Observe love cards for scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  container.querySelectorAll('.love-card').forEach(c => observer.observe(c));
}

// ===== LETTER PETALS =====
function initLetterPetals() {
  const container = document.getElementById('letterPetals');
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'letter-petal';
    p.style.cssText = `
      left:${Math.random() * 90}%;
      --dur:${6 + Math.random() * 6}s;
      --delay:${Math.random() * 5}s;
      --rot:${Math.random() * 360}deg;
      --sway:${Math.random() * 40 - 20}px;
    `;
    container.appendChild(p);
  }
}

// ===== BIRTHDAY QUOTES =====
const birthdayQuotes = [
  { text: "Count your life by smiles, not tears. Count your age by friends, not years.", author: "— John Lennon" },
  { text: "The more you praise and celebrate your life, the more there is in life to celebrate.", author: "— Oprah Winfrey" },
  { text: "Today you are you! That is truer than true! There is no one alive who is you-er than you!", author: "— Dr. Seuss" },
  { text: "Every love story is beautiful, but ours is my favorite.", author: "— Unknown" },
  { text: "In all the world, there is no heart for me like yours.", author: "— Maya Angelou" },
  { text: "You are my today and all of my tomorrows.", author: "— Lee Christopher" },
  { text: "I have found the one whom my soul loves.", author: "— Song of Solomon" },
  { text: "Wherever you go, whatever you do, I will be right here waiting for you.", author: "— Richard Marx" },
  { text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known.", author: "— F. Scott Fitzgerald" },
  { text: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.", author: "— Angelita Lim" },
];

function showBirthdayQuote() {
  const quoteBox = document.getElementById('bdayQuote');
  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  const scrollHint = document.getElementById('scrollHint');

  const q = birthdayQuotes[Math.floor(Math.random() * birthdayQuotes.length)];
  quoteBox.style.display = '';
  quoteBox.style.animation = 'none';
  void quoteBox.offsetWidth;
  quoteBox.style.animation = '';
  quoteText.textContent = '';

  let i = 0;
  const fullText = q.text;

  function typeQuote() {
    if (i < fullText.length) {
      quoteText.textContent += fullText.charAt(i);
      i++;
      if (i % 30 === 0) burstFireworks(2);
      setTimeout(typeQuote, 35);
    } else {
      quoteText.classList.add('done');
      quoteAuthor.textContent = q.author;
      quoteAuthor.classList.add('show');
      setTimeout(() => {
        scrollHint.style.display = '';
        scrollHint.style.animation = 'none';
        void scrollHint.offsetWidth;
        scrollHint.style.animation = '';
      }, 800);
      burstFireworks(5);
      launchConfetti(80);
    }
  }
  typeQuote();
}

// ===== PARTICLES =====
const particlesEl = document.getElementById('particles');
const pColors = ['#ff6eb4', '#ffd700', '#e8a87c', '#a855f7', '#f7cac9', '#ff2d75'];

function initParticles() {
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 10 + 3;
    p.style.cssText = `
      width:${size}px;height:${size}px;
      background:${pColors[Math.floor(Math.random() * pColors.length)]};
      left:${Math.random() * 100}%;
      border-radius:50%;
      --dur:${Math.random() * 14 + 6}s;
      --delay:${Math.random() * 8}s;
    `;
    particlesEl.appendChild(p);
  }
}

// ===== CANDLES =====
const candleColors = ['#ff6eb4', '#a855f7', '#ffd700', '#e8a87c', '#ff2d75', '#f7cac9'];

function buildCandles(n) {
  const row = document.getElementById('candleRow');
  row.innerHTML = '';
  const count = Math.min(n, 12);
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'candle';
    c.style.background = `linear-gradient(${candleColors[i % candleColors.length]}, ${candleColors[(i + 2) % candleColors.length]})`;
    c.style.animationDelay = `${i * 0.08}s`;
    c.innerHTML = `<div class="flame"></div>`;
    row.appendChild(c);
  }
}

// ===== BLOW CANDLES =====
const blowBtn = document.getElementById('blowBtn');
const wishReveal = document.getElementById('wishReveal');

function blowAllCandles() {
  const flames = document.querySelectorAll('.flame:not(.blown)');
  if (flames.length === 0) return;
  flames.forEach((f, i) => setTimeout(() => {
    f.classList.add('blown');
    createSmoke(f);
  }, i * 200));
  blowBtn.disabled = true;
  document.getElementById('micBlowBtn').disabled = true;

  // Screen dims briefly
  const dim = document.createElement('div');
  dim.style.cssText = 'position:fixed;inset:0;background:#000;z-index:998;pointer-events:none;animation:flashBang 1.5s ease-out forwards;';
  document.body.appendChild(dim);
  setTimeout(() => dim.remove(), 1500);

  const cake = document.getElementById('cake');
  setTimeout(() => cake.classList.add('wiggle'), flames.length * 200 + 100);

  setTimeout(() => {
    wishReveal.classList.remove('hidden');
    launchConfetti(250);
    burstFireworks(10);
  }, flames.length * 200 + 800);
}

blowBtn.addEventListener('click', blowAllCandles);

// ===== MIC BLOW =====
const micBlowBtn = document.getElementById('micBlowBtn');
const micStatus = document.getElementById('micStatus');
let micStream = null;
let micContext = null;

micBlowBtn.addEventListener('click', async () => {
  try {
    micStatus.textContent = '🎤 Listening... Blow into your mic!';
    micStatus.className = 'mic-status listening';
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micStream = stream;
    micContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = micContext.createMediaStreamSource(stream);
    const analyser = micContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    let blowDetected = false;
    let blowFrames = 0;

    function detectBlow() {
      if (blowDetected) return;
      analyser.getByteFrequencyData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) sum += data[i];
      const avg = sum / data.length;
      if (avg > 50) {
        blowFrames++;
        micStatus.textContent = `🌬️ Blowing... ${'💨'.repeat(Math.min(blowFrames, 5))}`;
        if (blowFrames >= 8) {
          blowDetected = true;
          micStatus.textContent = '🎉 Candles blown! Amazing!';
          micStatus.className = 'mic-status';
          stopMic();
          blowAllCandles();
          return;
        }
      } else {
        blowFrames = Math.max(0, blowFrames - 1);
      }
      requestAnimationFrame(detectBlow);
    }
    detectBlow();
    setTimeout(() => {
      if (!blowDetected) {
        micStatus.textContent = 'Timeout — try tapping the blow button!';
        micStatus.className = 'mic-status';
        stopMic();
      }
    }, 10000);
  } catch (err) {
    micStatus.textContent = '❌ Mic access denied. Use the tap button instead!';
    micStatus.className = 'mic-status';
  }
});

function stopMic() {
  if (micStream) { micStream.getTracks().forEach(t => t.stop()); micStream = null; }
  if (micContext) { micContext.close(); micContext = null; }
}

function createSmoke(flame) {
  const rect = flame.getBoundingClientRect();
  for (let i = 0; i < 5; i++) {
    const smoke = document.createElement('div');
    smoke.style.cssText = `
      position:fixed;left:${rect.left + rect.width / 2}px;top:${rect.top}px;
      width:${6 + Math.random() * 8}px;height:${6 + Math.random() * 8}px;
      background:rgba(200,200,200,0.4);border-radius:50%;
      pointer-events:none;z-index:999;transition:all 1s ease-out;
    `;
    document.body.appendChild(smoke);
    requestAnimationFrame(() => {
      smoke.style.transform = `translate(${Math.random() * 30 - 15}px, -${40 + Math.random() * 40}px) scale(2)`;
      smoke.style.opacity = '0';
    });
    setTimeout(() => smoke.remove(), 1200);
  }
}

// ===== ROMANTIC WISH CARDS =====
const wishes = [
  { icon: "🌹", text: "May your heart always be as full as it is beautiful" },
  { icon: "💖", text: "You deserve every beautiful thing this world has to offer" },
  { icon: "💕", text: "May your smile never fade and your heart never break" },
  { icon: "✨", text: "Here's to another year of you being absolutely incredible" },
  { icon: "🥂", text: "Cheers to the most amazing person I know — you!" },
  { icon: "🦋", text: "May you spread your wings and fly to unimaginable heights" },
  { icon: "🌟", text: "Your light makes everyone around you shine brighter" },
  { icon: "💐", text: "Like flowers need sun, my world needs your smile" },
  { icon: "🎁", text: "Today is a celebration of the gift you are to everyone" },
  { icon: "💫", text: "Every year you only become more wonderful, more you" },
];

function buildWishCards() {
  const container = document.getElementById('wishesTrack');
  container.innerHTML = '';
  wishes.forEach((w, i) => {
    const card = document.createElement('div');
    card.className = 'wish-card';
    card.style.setProperty('--d', `${0.3 + i * 0.12}s`);
    card.style.setProperty('--rot', `${Math.random() * 6 - 3}deg`);
    card.innerHTML = `<span class="wc-icon" style="--d:${i * 0.2}s">${w.icon}</span><span class="wc-text">${w.text}</span>`;
    container.appendChild(card);
  });
}

// ===== MEMORY GRID =====
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
    card.addEventListener('click', () => triggerAction(item.action, card));
    grid.appendChild(card);
  });
}

// ===== INTERACTIVE ACTIONS =====
function triggerAction(action, card) {
  card.classList.add('card-active');
  setTimeout(() => card.classList.remove('card-active'), 600);
  const rect = card.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const actions = { party: actionParty, balloons: actionBalloons, cake: actionCake, gifts: actionGifts, dance: actionDance, music: actionMusic, stars: actionStars, love: actionLove };
  if (actions[action]) actions[action](cx, cy);
}

function actionParty(cx, cy) {
  launchConfetti(200); burstFireworks(8); launchSparks(cx, cy, 30);
  showToast("🎉 Let's Party!");
  const poppers = ['🎊', '🎉', '🥳', '🪅', '🎆'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const el = document.createElement('div'); el.className = 'action-float';
      el.textContent = poppers[Math.floor(Math.random() * poppers.length)];
      el.style.cssText = `left:${Math.random() * 100}vw;--end-y:${-300 - Math.random() * 400}px;--end-x:${Math.random() * 200 - 100}px;--rot:${Math.random() * 720 - 360}deg;font-size:${1.5 + Math.random() * 2}rem;animation-duration:${1.5 + Math.random() * 1.5}s;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3500);
    }, i * 80);
  }
}

function actionBalloons() {
  showToast("🎈 Balloons for you! 💕");
  const colors = ['#ff6eb4', '#a855f7', '#ffd700', '#e8a87c', '#ff2d75', '#f7cac9', '#f43f5e'];
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const b = document.createElement('div'); b.className = 'fly-balloon';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 40 + Math.random() * 30;
      b.style.cssText = `left:${5 + Math.random() * 90}vw;width:${size}px;height:${size * 1.2}px;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,0.5),${color});--sway:${Math.random() * 80 - 40}px;animation-duration:${3 + Math.random() * 3}s;`;
      const str = document.createElement('div'); str.className = 'balloon-string';
      b.appendChild(str);
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 6500);
    }, i * 150);
  }
}

function actionCake(cx, cy) {
  showToast("🎂 Sweet as you! 💕");
  launchSparks(cx, cy, 20);
  const cakeEmojis = ['🍰', '🧁', '🎂', '🍩', '🍪', '🍫'];
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      const el = document.createElement('div'); el.className = 'action-float';
      el.textContent = cakeEmojis[Math.floor(Math.random() * cakeEmojis.length)];
      el.style.cssText = `left:${cx}px;top:${cy}px;position:fixed;--end-y:${-200 - Math.random() * 300}px;--end-x:${Math.random() * 300 - 150}px;--rot:${Math.random() * 360}deg;font-size:${1.5 + Math.random() * 1.5}rem;animation-duration:${1.5 + Math.random()}s;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }, i * 60);
  }
}

function actionGifts() {
  showToast("🎁 All the gifts for you!");
  burstFireworks(3);
  const gifts = ['🎁', '🎀', '🛍️', '📦', '💝'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const el = document.createElement('div'); el.className = 'gift-rain';
      el.textContent = gifts[Math.floor(Math.random() * gifts.length)];
      el.style.cssText = `left:${Math.random() * 100}vw;font-size:${1.5 + Math.random() * 1.5}rem;animation-duration:${2 + Math.random() * 2}s;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4500);
    }, i * 100);
  }
}

function actionDance() {
  showToast("💃 Dance with me! 🕺");
  const disco = document.createElement('div'); disco.className = 'disco-flash';
  document.body.appendChild(disco);
  setTimeout(() => disco.remove(), 3000);
  const dancers = ['💃', '🕺', '👯', '🪩', '🎶'];
  for (let i = 0; i < 14; i++) {
    setTimeout(() => {
      const el = document.createElement('div'); el.className = 'dancer-emoji';
      el.textContent = dancers[Math.floor(Math.random() * dancers.length)];
      el.style.cssText = `left:${10 + Math.random() * 80}vw;bottom:0;font-size:${2 + Math.random() * 2}rem;--sway:${Math.random() * 60 - 30}px;animation-duration:${2 + Math.random() * 2}s;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4500);
    }, i * 120);
  }
}

function actionMusic() {
  showToast("🎵 Our song is playing! 💕");
  const music = document.getElementById('bgMusic');
  music.play().catch(() => { });
  document.getElementById('musicToggle').classList.add('playing');
  const notes = ['🎵', '🎶', '🎼', '🎸', '🎹', '🎺'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const el = document.createElement('div'); el.className = 'action-float';
      el.textContent = notes[Math.floor(Math.random() * notes.length)];
      el.style.cssText = `left:${Math.random() * 100}vw;--end-y:${-300 - Math.random() * 400}px;--end-x:${Math.random() * 150 - 75}px;--rot:${Math.random() * 360}deg;font-size:${1.5 + Math.random() * 2}rem;animation-duration:${2 + Math.random() * 2}s;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4500);
    }, i * 100);
  }
  const beat = document.createElement('div'); beat.className = 'beat-pulse';
  document.body.appendChild(beat);
  setTimeout(() => beat.remove(), 2500);
}

function actionStars() {
  showToast("🌟 You're my star! ✨");
  burstFireworks(6);
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const star = document.createElement('div'); star.className = 'action-shooting-star';
      star.style.cssText = `top:${Math.random() * 50}vh;left:-100px;animation-duration:${0.8 + Math.random() * 0.5}s;`;
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 2000);
    }, i * 200);
  }
  const stars = ['⭐', '🌟', '✨', '💫'];
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const el = document.createElement('div'); el.className = 'action-float';
      el.textContent = stars[Math.floor(Math.random() * stars.length)];
      el.style.cssText = `left:${Math.random() * 100}vw;--end-y:${-300 - Math.random() * 300}px;--end-x:${Math.random() * 200 - 100}px;--rot:${Math.random() * 360}deg;font-size:${1.2 + Math.random() * 2}rem;animation-duration:${1.5 + Math.random() * 1.5}s;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3500);
    }, i * 70);
  }
}

function actionLove() {
  showToast("💝 I love you! 💕");
  const hearts = ['❤️', '💖', '💗', '💕', '💓', '💞', '💝', '🩷', '🌹', '💜'];
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const el = document.createElement('div'); el.className = 'love-heart';
      el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      el.style.cssText = `left:${Math.random() * 100}vw;font-size:${1.5 + Math.random() * 2.5}rem;--sway:${Math.random() * 80 - 40}px;animation-duration:${2.5 + Math.random() * 2}s;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }, i * 80);
  }
}

// ===== ROMANTIC LOVE LETTER =====
function startTypewriter(name) {
  const el = document.getElementById('typewriter');
  const text = `Every love story is beautiful, but ours is my favorite.\n\nOn your special day, I want you to know — you are the most incredible person I've ever known, ${name}. Your laugh makes my world brighter. Your eyes hold all the stars I'd ever need.\n\nThis birthday, I wish for nothing more than to see you smile. Because when you're happy, my whole universe is perfect.\n\nHappy Birthday, my love. Today, tomorrow, and always — you are my everything. 💕`;

  let i = 0;
  el.textContent = '';
  const sign = document.querySelector('.letter-sign');

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
      setTimeout(typeNext, text.charAt(i - 1) === '\n' ? 200 : 25);
    } else {
      el.classList.add('done');
      sign.classList.add('show');
    }
  }
}

// ===== AGE COUNTER =====
let age = 1;
const ageFacts = [
  "You're a brand new adventure! 🍼", "Just getting started — the world is yours! 🌍",
  "Three cheers! Hip hip hooray! 🎊", "Every year wiser and more amazing! 🧠",
  "Still young, wild, and free! 🦅", "You're absolutely in your prime! 💪",
  "A whole decade of awesome! 🎯", "Like fine wine — getting better with time! 🍷",
  "Two decades of pure awesomeness! 🔥", "Thirty and absolutely thriving! 🚀",
  "Forty and fabulous! 💎", "Fifty and phenomenal! 🌟",
  "Sixty and spectacular! 👑", "Seventy years of pure gold! 🏆",
  "A legend in the making! 🦁", "Timeless and extraordinary! ⭐",
];

function getFact(n) {
  if (n <= 1) return ageFacts[0]; if (n <= 3) return ageFacts[1];
  if (n <= 5) return ageFacts[2]; if (n <= 9) return ageFacts[3];
  if (n <= 12) return ageFacts[4]; if (n <= 17) return ageFacts[5];
  if (n <= 19) return ageFacts[6]; if (n <= 25) return ageFacts[7];
  if (n <= 29) return ageFacts[8]; if (n <= 39) return ageFacts[9];
  if (n <= 49) return ageFacts[10]; if (n <= 59) return ageFacts[11];
  if (n <= 69) return ageFacts[12]; if (n <= 79) return ageFacts[13];
  if (n <= 89) return ageFacts[14]; return ageFacts[15];
}

function updateAgeFun() {
  const display = document.getElementById('ageDisplay');
  const fun = document.getElementById('ageFun');
  const cands = document.getElementById('ageCandles');
  display.textContent = age;
  display.classList.remove('pop'); void display.offsetWidth; display.classList.add('pop');
  fun.textContent = getFact(age);
  cands.innerHTML = '';
  const show = Math.min(age, 30);
  for (let i = 0; i < show; i++) {
    const mc = document.createElement('span'); mc.className = 'mini-candle';
    mc.textContent = '🕯️'; mc.style.setProperty('--d', `${i * 0.05}s`);
    cands.appendChild(mc);
  }
  if (age > 30) {
    const more = document.createElement('span');
    more.style.cssText = 'color:rgba(255,255,255,0.4);font-size:0.85rem;';
    more.textContent = ` +${age - 30} more!`;
    cands.appendChild(more);
  }
}

document.getElementById('ageUp').addEventListener('click', () => { if (age < 120) { age++; updateAgeFun(); } });
document.getElementById('ageDown').addEventListener('click', () => { if (age > 1) { age--; updateAgeFun(); } });

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

// ===== FIREWORKS =====
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let fwParticles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createFirework(x, y) {
  const count = 80;
  const hue = Math.random() * 360;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 / count) * i;
    const speed = Math.random() * 6 + 2;
    fwParticles.push({
      x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      life: 1, decay: Math.random() * 0.012 + 0.008,
      size: Math.random() * 3 + 1, hue: hue + Math.random() * 50 - 25, trail: [],
    });
  }
}

function animateFireworks() {
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  fwParticles = fwParticles.filter(p => p.life > 0);
  fwParticles.forEach(p => {
    p.trail.push({ x: p.x, y: p.y, life: p.life });
    if (p.trail.length > 5) p.trail.shift();
    p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.vx *= 0.985; p.life -= p.decay;
    p.trail.forEach(t => {
      ctx.beginPath(); ctx.arc(t.x, t.y, p.size * t.life * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},100%,70%,${t.life * 0.3})`; ctx.fill();
    });
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue},100%,65%,${p.life})`; ctx.fill();
  });
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

function burstFireworks(count = 5) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createFirework(canvas.width * (0.1 + Math.random() * 0.8), canvas.height * (0.1 + Math.random() * 0.5)), i * 250);
  }
}

let fwInterval;
function startFireworks() {
  burstFireworks(8);
  fwInterval = setInterval(() => {
    createFirework(canvas.width * (0.1 + Math.random() * 0.8), canvas.height * (0.1 + Math.random() * 0.4));
  }, 1500);
  setTimeout(() => clearInterval(fwInterval), 12000);
}

// ===== CONFETTI =====
const confettiColors = ['#ff6eb4', '#ffd700', '#ff2d75', '#a855f7', '#e8a87c', '#f7cac9', '#f43f5e'];

function launchConfetti(total = 150) {
  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const c = document.createElement('div'); c.className = 'confetti';
      const size = Math.random() * 10 + 5;
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const shapes = ['50%', '2px', '0'];
      const shape = shapes[Math.floor(Math.random() * 3)];
      c.style.cssText = `left:${Math.random() * 100}vw;top:-20px;width:${size}px;height:${size * (shape === '0' ? 1.2 : 1)}px;background:${color};border-radius:${shape};clip-path:${shape === '0' ? 'polygon(50% 0%,0% 100%,100% 100%)' : 'none'};--dur:${Math.random() * 2.5 + 2}s;--rot:${Math.random() * 1080 - 540}deg;--sx:${Math.random() > 0.5 ? 1 : -1};`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5500);
    }, i * 15);
  }
}

// ===== SPARKS =====
function launchSparks(x, y, count = 24) {
  const colors = ['#ffd700', '#ff6eb4', '#a855f7', '#e8a87c', '#fff'];
  for (let i = 0; i < count; i++) {
    const sp = document.createElement('div'); sp.className = 'spark';
    const angle = (Math.PI * 2 / count) * i;
    const dist = 60 + Math.random() * 80;
    sp.style.cssText = `left:${x}px;top:${y}px;background:${colors[Math.floor(Math.random() * colors.length)]};--dur:${Math.random() * 0.5 + 0.3}s;--tx:${Math.cos(angle) * dist}px;--ty:${Math.sin(angle) * dist}px;`;
    document.body.appendChild(sp);
    setTimeout(() => sp.remove(), 1000);
  }
}

// ===== SHARE =====
document.getElementById('shareBtn').addEventListener('click', () => {
  launchConfetti(100); burstFireworks(5);
  showToast('📸 Screenshot this and share the love!');
});

// ===== MUSIC TOGGLE =====
const music = document.getElementById('bgMusic');
const toggleBtn = document.getElementById('musicToggle');
let playing = false;
toggleBtn.addEventListener('click', () => {
  if (playing) { music.pause(); toggleBtn.classList.remove('playing'); }
  else { music.play().catch(() => { }); toggleBtn.classList.add('playing'); }
  playing = !playing;
});

// ===== ROMANTIC BIRTHDAY SONG =====
let currentSongName = '';

function startBirthdaySong(name) {
  currentSongName = name;
  const lyrics = document.getElementById('songLyrics');
  const notes = document.getElementById('songNotes');
  const replay = document.getElementById('songReplay');
  playSongAnimation(name, lyrics, notes, replay);
}

function playSongAnimation(name, lyrics, notes, replay) {
  lyrics.innerHTML = ''; notes.innerHTML = '';
  replay.classList.remove('show');
  ['🎵', '🎶', '🎵', '🎶', '🎵'].forEach((n, i) => {
    const span = document.createElement('span'); span.className = 'song-note';
    span.textContent = n; span.style.setProperty('--d', `${i * 0.15}s`);
    notes.appendChild(span);
  });

  const lines = [
    `🎵 Happy Birthday to you...`,
    `🎶 Happy Birthday to you...`,
    `🎵 Happy Birthday my love, ${name}...`,
    `🎶 Happy Birthday to you! 🌹`,
    ``,
    `💫 You light up my world,`,
    `💖 You make my heart sing,`,
    `✨ On this beautiful day,`,
    `🌹 You're my everything!`,
    ``,
    `🥰 Happy Birthday, ${name}! I love you! 💕`,
  ];

  let lineIndex = 0;
  function showNextLine() {
    if (lineIndex >= lines.length) {
      replay.classList.add('show');
      burstFireworks(3);
      return;
    }
    const line = lines[lineIndex];
    const div = document.createElement('div'); div.className = 'song-line';
    div.textContent = line; lyrics.appendChild(div);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      div.classList.add('show');
      if (line.includes(name)) setTimeout(() => div.classList.add('highlight'), 300);
    }));
    lineIndex++;
    setTimeout(showNextLine, line === '' ? 400 : line.includes(name) ? 1200 : 800);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.disconnect();
        setTimeout(showNextLine, 500);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(lyrics);
}

document.getElementById('songReplay').addEventListener('click', () => {
  playSongAnimation(currentSongName, document.getElementById('songLyrics'), document.getElementById('songNotes'), document.getElementById('songReplay'));
});

// ===== WHATSAPP SHARE =====
document.getElementById('whatsappBtn').addEventListener('click', () => {
  const name = document.getElementById('megaTitle').textContent.replace('Happy Birthday, ', '').replace('!', '');
  const msg = `💕🎂 *Happy Birthday, ${name}!* 🎂💕\n\n🌹 To the most amazing person I know...\n\n💖 May this year bring you endless happiness, beautiful adventures, and all the love your heart can hold!\n\n✨ You make my world brighter just by being in it.\n\n🥰 Happy Birthday, my love! 💕\n\n🎁 Sent with all my love`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  launchConfetti(80);
  showToast('💬 Opening WhatsApp...');
});

// ===== ROMANTIC EMOJI RAIN (Rose petals + hearts) =====
const emojiRainLayer = document.getElementById('emojiRainLayer');
const rainEmojis = ['🌹', '💕', '💖', '💗', '✨', '🌸', '💫', '💝', '🩷', '🤍', '💐', '🦋', '🌺'];

emojiRainLayer.addEventListener('click', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div'); el.className = 'emoji-burst';
    el.textContent = rainEmojis[Math.floor(Math.random() * rainEmojis.length)];
    const angle = (Math.PI * 2 / 12) * i;
    const dist = 60 + Math.random() * 80;
    el.style.cssText = `left:${x}px;top:${y}px;--ex:${Math.cos(angle) * dist}px;--ey:${Math.sin(angle) * dist}px;--rot:${Math.random() * 360}deg;--dur:${0.8 + Math.random() * 0.6}s;--size:${1.2 + Math.random()}rem;`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }
});

emojiRainLayer.addEventListener('wheel', () => {
  emojiRainLayer.style.pointerEvents = 'none';
  setTimeout(() => { emojiRainLayer.style.pointerEvents = 'all'; }, 100);
}, { passive: true });

let touchStartY = 0;
emojiRainLayer.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
emojiRainLayer.addEventListener('touchmove', (e) => {
  if (Math.abs(e.touches[0].clientY - touchStartY) > 10) {
    emojiRainLayer.style.pointerEvents = 'none';
    setTimeout(() => { emojiRainLayer.style.pointerEvents = 'all'; }, 300);
  }
}, { passive: true });

// ===== TOAST =====
function showToast(msg) {
  const t = document.createElement('div'); t.className = 'toast';
  t.textContent = msg; document.body.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 500); }, 3500);
}
