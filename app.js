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

// ===== INTRO TYPEWRITER =====
const magicTextEl = document.getElementById('magicText');
const introFullText = 'Someone special sent you something...';
let introCharIdx = 0;
function typeIntro() {
  if (introCharIdx < introFullText.length) {
    magicTextEl.textContent += introFullText.charAt(introCharIdx);
    introCharIdx++;
    setTimeout(typeIntro, 60);
  } else {
    magicTextEl.classList.add('done');
  }
}
typeIntro();

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
  haptic(50);
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

  // Smooth transition to loading screen
  screenName.style.animation = 'none';
  screenName.style.transition = 'opacity 0.8s, filter 0.8s, transform 0.8s';
  screenName.style.opacity = '0';
  screenName.style.filter = 'blur(20px)';
  screenName.style.transform = 'scale(1.05)';

  const loadingScreen = document.getElementById('loadingScreen');
  const loadingRingFill = document.getElementById('loadingRingFill');
  const loadingTexts = ['Loading your surprises', 'Preparing the magic', 'Gathering love', 'Almost ready'];
  const loadingTextEl = document.getElementById('loadingText');
  let ltIdx = 0;

  setTimeout(() => {
    screenName.classList.add('hidden');
    screenName.style.cssText = '';
    loadingScreen.classList.remove('hidden');

    // Animate loading ring
    requestAnimationFrame(() => {
      loadingRingFill.style.strokeDashoffset = '0';
    });

    // Cycle loading text
    const ltInterval = setInterval(() => {
      ltIdx = (ltIdx + 1) % loadingTexts.length;
      loadingTextEl.textContent = loadingTexts[ltIdx];
    }, 600);

    // After loading completes
    setTimeout(() => {
      clearInterval(ltInterval);
      loadingScreen.style.transition = 'opacity 0.6s, filter 0.6s';
      loadingScreen.style.opacity = '0';
      loadingScreen.style.filter = 'blur(10px)';

      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        loadingScreen.style.cssText = '';
        screenMain.classList.remove('hidden');
        screenMain.style.animation = 'fadeInUp 0.6s ease both';
        initParticles();
        initSongVisualizer();
        initScrollReveal();
        runCountdown(n);
      }, 600);
    }, 2200);
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
  const sections = document.querySelectorAll('.love-section, .constellation-section, .promise-section, .cake-section, .song-section, .letter-section, .scratch-section, .wishes-section, .trivia-section, .memory-section, .cannon-section, .polaroid-section, .jar-section, .age-section, .zodiac-section, .countdown-section, .lovemeter-section, .fortune-section, .wishjar-section, .iloveyou-section, .heartbeat-section, .particle-heart-section, .infinity-section, .final-section');
  sections.forEach(s => s.classList.add('reveal-on-scroll'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Auto confetti + butterflies when final section appears
        if (entry.target.id === 'finalSection') {
          launchConfetti(100);
          burstFireworks(5);
          releaseButterflies();
          haptic(80);
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

      // NEW features
      initConstellation(name);
      buildPromiseCards(name);
      initScratchCard();
      buildPolaroids(name);
      initParticleHeart();
      initLoveMeter(name);
      initFortuneBall(name);
      initILoveYou(name);
      initInfinity(name);

      // V2 features
      buildTriviaQuiz(name);
      initConfettiCannon();
      buildMemoryJar(name);
      buildZodiac();
      initBirthdayCountdown();
      initWishJar(name);
      initHeartBeatSync(name);
      initShootingStars();
      initFinalFloatingHearts();
      document.getElementById('currentYear').textContent = new Date().getFullYear();

      // Autoplay Heeriye! 🎶
      playMusic();

      // Haptic feedback on big reveal!
      haptic(100);

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
  haptic(60);
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
  showToast("🎵 Heeriye bajj raha hai! 💕");
  if (!playing) {
    music.play().catch(() => { });
    playing = true;
    toggleBtn.classList.add('playing');
  }
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

// ===== MUSIC (Heeriye - Arijit Singh) =====
const music = document.getElementById('bgMusic');
const toggleBtn = document.getElementById('musicToggle');
let playing = false;

// Limit music to 30 seconds then loop back
const MUSIC_DURATION = 30; // seconds

function setupMusicLoop() {
  const musicRingFill = document.getElementById('musicRingFill');
  const circumference = 2 * Math.PI * 24; // r=24
  music.addEventListener('timeupdate', () => {
    if (music.currentTime >= MUSIC_DURATION) {
      music.currentTime = 0;
    }
    // Update progress ring
    if (musicRingFill) {
      const progress = music.currentTime / MUSIC_DURATION;
      musicRingFill.style.strokeDashoffset = circumference * (1 - progress);
    }
  });
}
setupMusicLoop();

function playMusic() {
  music.currentTime = 0;
  music.volume = 0.7;
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      playing = true;
      toggleBtn.classList.add('playing');
    }).catch(() => {
      // Autoplay blocked — will play on first user tap
      const resumeOnTap = () => {
        music.play().then(() => {
          playing = true;
          toggleBtn.classList.add('playing');
        }).catch(() => {});
        document.removeEventListener('click', resumeOnTap);
        document.removeEventListener('touchstart', resumeOnTap);
      };
      document.addEventListener('click', resumeOnTap);
      document.addEventListener('touchstart', resumeOnTap);
    });
  }
}

toggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (playing) {
    music.pause();
    toggleBtn.classList.remove('playing');
    playing = false;
  } else {
    music.play().catch(() => {});
    toggleBtn.classList.add('playing');
    playing = true;
  }
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

// ===== CONSTELLATION NAME (Stars spelling her name) =====
function initConstellation(name) {
  const canvas = document.getElementById('constellationCanvas');
  if (!canvas) return;
  const cCtx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  cCtx.scale(dpr, dpr);
  const W = rect.width, H = rect.height;

  // Generate star positions along the name text path
  const nameStars = [];
  const bgStars = [];

  // Use a temp canvas to get text pixel positions
  const tmp = document.createElement('canvas');
  tmp.width = W; tmp.height = H;
  const tCtx = tmp.getContext('2d');
  // Much bigger font — fills the canvas properly
  const fontSize = Math.min(W / (name.length * 0.55), H * 0.55);
  tCtx.font = `900 ${fontSize}px 'Playfair Display', serif`;
  tCtx.textAlign = 'center';
  tCtx.textBaseline = 'middle';
  tCtx.fillStyle = '#fff';
  tCtx.fillText(name, W / 2, H / 2);
  const imageData = tCtx.getImageData(0, 0, W, H);

  // Sample points from the text — much denser sampling
  const step = 3;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const i = (y * W + x) * 4;
      if (imageData.data[i + 3] > 128) {
        if (Math.random() < 0.35) {
          nameStars.push({
            x: x + (Math.random() - 0.5) * 2,
            y: y + (Math.random() - 0.5) * 2,
            r: Math.random() * 2.5 + 1.2,
            alpha: Math.random(),
            da: (Math.random() - 0.5) * 0.03,
            glow: Math.random() > 0.4,
          });
        }
      }
    }
  }

  // Background stars
  for (let i = 0; i < 100; i++) {
    bgStars.push({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 0.8 + 0.2, alpha: Math.random() * 0.5,
      da: (Math.random() - 0.5) * 0.01,
    });
  }

  // Connections between nearby name stars — longer range for visible lines
  const connections = [];
  for (let i = 0; i < nameStars.length; i++) {
    let connCount = 0;
    for (let j = i + 1; j < nameStars.length && connCount < 3; j++) {
      const dx = nameStars[i].x - nameStars[j].x;
      const dy = nameStars[i].y - nameStars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 30 && Math.random() < 0.25) {
        connections.push([i, j, dist]);
        connCount++;
      }
    }
  }

  let sparkles = [];
  canvas.addEventListener('click', (e) => {
    const cr = canvas.getBoundingClientRect();
    const mx = e.clientX - cr.left;
    const my = e.clientY - cr.top;
    for (let i = 0; i < 15; i++) {
      sparkles.push({
        x: mx, y: my,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 1, size: Math.random() * 3 + 1,
        hue: Math.random() * 60 + 30,
      });
    }
    haptic();
  });
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const cr = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const mx = touch.clientX - cr.left;
    const my = touch.clientY - cr.top;
    for (let i = 0; i < 15; i++) {
      sparkles.push({
        x: mx, y: my,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 1, size: Math.random() * 3 + 1,
        hue: Math.random() * 60 + 30,
      });
    }
    haptic();
  }, { passive: false });

  function drawConst() {
    cCtx.fillStyle = 'rgba(5,0,16,0.2)';
    cCtx.fillRect(0, 0, W, H);

    // Background stars
    bgStars.forEach(s => {
      s.alpha += s.da;
      if (s.alpha <= 0 || s.alpha >= 0.5) s.da *= -1;
      cCtx.beginPath();
      cCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      cCtx.fillStyle = `rgba(255,255,255,${Math.abs(s.alpha)})`;
      cCtx.fill();
    });

    // Constellation connections
    connections.forEach(([i, j, dist]) => {
      const a = nameStars[i], b = nameStars[j];
      const avgAlpha = (a.alpha + b.alpha) / 2;
      cCtx.beginPath();
      cCtx.moveTo(a.x, a.y);
      cCtx.lineTo(b.x, b.y);
      cCtx.strokeStyle = `rgba(255,210,130,${avgAlpha * 0.25})`;
      cCtx.lineWidth = 0.7;
      cCtx.stroke();
    });

    // Name stars — bright and glowy
    nameStars.forEach(s => {
      s.alpha += s.da;
      if (s.alpha <= 0.3 || s.alpha >= 1) s.da *= -1;

      // Outer glow
      if (s.glow) {
        cCtx.beginPath();
        cCtx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        cCtx.fillStyle = `rgba(255,200,100,${s.alpha * 0.12})`;
        cCtx.fill();
      }

      // Main star
      cCtx.beginPath();
      cCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      cCtx.fillStyle = `rgba(255,${220 + Math.floor(s.alpha * 35)},${180 + Math.floor(s.alpha * 75)},${s.alpha * 0.95})`;
      cCtx.fill();

      // Bright center
      cCtx.beginPath();
      cCtx.arc(s.x, s.y, s.r * 0.4, 0, Math.PI * 2);
      cCtx.fillStyle = `rgba(255,255,240,${s.alpha * 0.9})`;
      cCtx.fill();
    });

    // Sparkles from clicks
    sparkles = sparkles.filter(s => s.life > 0);
    sparkles.forEach(s => {
      s.x += s.vx; s.y += s.vy;
      s.vy += 0.05;
      s.life -= 0.02;
      cCtx.beginPath();
      cCtx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
      cCtx.fillStyle = `hsla(${s.hue},100%,75%,${s.life})`;
      cCtx.fill();
    });

    requestAnimationFrame(drawConst);
  }

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      obs.disconnect();
      drawConst();
    }
  }, { threshold: 0.3 });
  obs.observe(canvas);
}

// ===== PROMISE CARDS (Flip reveal) =====
function buildPromiseCards(name) {
  const grid = document.getElementById('promiseGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const promises = [
    { icon: '🌅', front: 'Tap to reveal', back: `I promise to make you smile every single day, ${name}`, emoji: '😊' },
    { icon: '🛡️', front: 'Tap to reveal', back: 'I promise to always protect your heart and keep it safe', emoji: '💖' },
    { icon: '🌍', front: 'Tap to reveal', back: 'I promise to take you on adventures you\'ve only dreamed of', emoji: '✈️' },
    { icon: '🌙', front: 'Tap to reveal', back: 'I promise to be your calm in every storm', emoji: '🌈' },
    { icon: '👂', front: 'Tap to reveal', back: 'I promise to always listen, always understand, always care', emoji: '💕' },
    { icon: '♾️', front: 'Tap to reveal', back: `I promise to love you endlessly, ${name}, forever and always`, emoji: '💍' },
  ];

  promises.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'promise-card';
    card.style.setProperty('--d', `${0.2 + i * 0.1}s`);
    card.innerHTML = `
      <div class="promise-card-inner">
        <div class="promise-front">
          <span class="promise-front-icon">${p.icon}</span>
          <span class="promise-front-text">${p.front}</span>
        </div>
        <div class="promise-back">
          <span class="promise-back-emoji">${p.emoji}</span>
          <p class="promise-back-text">${p.back}</p>
        </div>
      </div>
    `;
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      haptic();
      launchSparks(
        card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2,
        card.getBoundingClientRect().top + card.getBoundingClientRect().height / 2,
        12
      );
    });
    grid.appendChild(card);
  });
}

// ===== SCRATCH CARD =====
function initScratchCard() {
  const canvas = document.getElementById('scratchCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  // Draw scratch overlay
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, '#c9a0dc');
  grad.addColorStop(0.3, '#e8a87c');
  grad.addColorStop(0.6, '#ff6eb4');
  grad.addColorStop(1, '#a855f7');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add "Scratch Me" text
  ctx.font = 'bold 24px Poppins, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🎁 Scratch Me! 🎁', canvas.width / 2, canvas.height / 2 - 15);
  ctx.font = '14px Poppins, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('A surprise awaits...', canvas.width / 2, canvas.height / 2 + 15);

  // Add sparkle pattern
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 + 0.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.4 + 0.1})`;
    ctx.fill();
  }

  let isScratching = false;
  let scratchedPixels = 0;
  const totalPixels = canvas.width * canvas.height;

  function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // Check percentage scratched
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) clear++;
    }
    const pct = clear / (data.length / 16);
    if (pct > 0.4) {
      canvas.style.transition = 'opacity 0.8s';
      canvas.style.opacity = '0';
      canvas.style.pointerEvents = 'none';
      document.getElementById('scratchHint').classList.add('hidden-hint');
      haptic();
      launchConfetti(100);
      burstFireworks(5);
    }
  }

  canvas.addEventListener('mousedown', () => isScratching = true);
  canvas.addEventListener('mouseup', () => isScratching = false);
  canvas.addEventListener('mouseleave', () => isScratching = false);
  canvas.addEventListener('mousemove', (e) => {
    if (!isScratching) return;
    const r = canvas.getBoundingClientRect();
    scratch(e.clientX - r.left, e.clientY - r.top);
  });

  canvas.addEventListener('touchstart', (e) => { isScratching = true; e.preventDefault(); }, { passive: false });
  canvas.addEventListener('touchend', () => isScratching = false);
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!isScratching) return;
    const touch = e.touches[0];
    const r = canvas.getBoundingClientRect();
    scratch(touch.clientX - r.left, touch.clientY - r.top);
  }, { passive: false });
}

// ===== POLAROID MEMORIES =====
function buildPolaroids(name) {
  const grid = document.getElementById('polaroidGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const memories = [
    { emoji: '🌅', bg: 'linear-gradient(135deg,#ff9a9e,#fad0c4)', caption: 'Every sunrise with you', tapeRot: '-3deg' },
    { emoji: '🎵', bg: 'linear-gradient(135deg,#a18cd1,#fbc2eb)', caption: 'Our favorite songs', tapeRot: '2deg' },
    { emoji: '🍕', bg: 'linear-gradient(135deg,#fbc2eb,#a6c1ee)', caption: 'Late night conversations', tapeRot: '-1deg' },
    { emoji: '🌸', bg: 'linear-gradient(135deg,#ffecd2,#fcb69f)', caption: `${name}'s beautiful smile`, tapeRot: '3deg' },
    { emoji: '✈️', bg: 'linear-gradient(135deg,#667eea,#764ba2)', caption: 'Adventures together', tapeRot: '-2deg' },
    { emoji: '🌙', bg: 'linear-gradient(135deg,#0c3547,#634778)', caption: 'Stargazing nights', tapeRot: '1deg' },
  ];

  memories.forEach((m, i) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.style.setProperty('--rot', `${Math.random() * 8 - 4}deg`);
    card.style.setProperty('--d', `${0.3 + i * 0.15}s`);
    card.innerHTML = `
      <div class="polaroid-tape" style="--tape-rot:${m.tapeRot}"></div>
      <div class="polaroid-img" style="background:${m.bg}">
        <span>${m.emoji}</span>
      </div>
      <p class="polaroid-caption">${m.caption}</p>
    `;
    card.addEventListener('click', () => {
      haptic();
      launchSparks(
        card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2,
        card.getBoundingClientRect().top + card.getBoundingClientRect().height / 2,
        15
      );
    });
    grid.appendChild(card);
  });
}

// ===== PARTICLE HEART CANVAS =====
function initParticleHeart() {
  const canvas = document.getElementById('heartParticleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const W = rect.width, H = rect.height;

  const particles = [];
  const heartPoints = [];
  const cx = W / 2, cy = H / 2 - 10;
  const scale = Math.min(W, H) / 25;

  // Heart parametric equation
  for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
    const x = 16 * Math.pow(Math.sin(angle), 3);
    const y = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
    heartPoints.push({ x: cx + x * scale, y: cy + y * scale });
  }

  // Create particles that will form the heart
  for (let i = 0; i < heartPoints.length; i++) {
    const hp = heartPoints[i];
    for (let j = 0; j < 2; j++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        targetX: hp.x + (Math.random() - 0.5) * 8,
        targetY: hp.y + (Math.random() - 0.5) * 8,
        size: Math.random() * 2.5 + 0.5,
        hue: Math.random() * 40 + 330,
        speed: 0.02 + Math.random() * 0.02,
        arrived: false,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.02,
      });
    }
  }

  let animating = false;

  function drawParticleHeart() {
    ctx.fillStyle = 'rgba(5,0,16,0.15)';
    ctx.fillRect(0, 0, W, H);

    particles.forEach(p => {
      if (!p.arrived) {
        p.x += (p.targetX - p.x) * p.speed;
        p.y += (p.targetY - p.y) * p.speed;
        if (Math.abs(p.x - p.targetX) < 1 && Math.abs(p.y - p.targetY) < 1) {
          p.arrived = true;
        }
      } else {
        p.wobble += p.wobbleSpeed;
        p.x = p.targetX + Math.sin(p.wobble) * 1.5;
        p.y = p.targetY + Math.cos(p.wobble) * 1.5;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},80%,65%,${p.arrived ? 0.8 : 0.4})`;
      ctx.fill();
    });

    if (animating) requestAnimationFrame(drawParticleHeart);
  }

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (!animating) {
        animating = true;
        drawParticleHeart();
      }
    } else {
      animating = false;
    }
  }, { threshold: 0.2 });
  obs.observe(canvas);
}

// ===== BUTTERFLY RELEASE =====
function releaseButterflies() {
  const container = document.getElementById('butterflyRelease');
  if (!container) return;
  const butterflies = ['🦋', '🦋', '🦋', '🦋'];
  const colors = ['', 'filter:hue-rotate(30deg)', 'filter:hue-rotate(60deg)', 'filter:hue-rotate(-30deg)'];

  for (let i = 0; i < 12; i++) {
    const b = document.createElement('div');
    b.className = 'butterfly';
    b.textContent = butterflies[i % butterflies.length];
    const startX = (Math.random() - 0.5) * 50;
    b.style.cssText = `
      left:50%;top:60%;${colors[i % colors.length]};
      --dur:${4 + Math.random() * 3}s;
      --delay:${i * 0.3}s;
      --x1:${startX + (Math.random() - 0.5) * 80}px;
      --y1:${-30 - Math.random() * 50}px;
      --x2:${startX + (Math.random() - 0.5) * 150}px;
      --y2:${-80 - Math.random() * 80}px;
      --x3:${startX + (Math.random() - 0.5) * 200}px;
      --y3:${-140 - Math.random() * 100}px;
      --x4:${startX + (Math.random() - 0.5) * 250}px;
      --y4:${-200 - Math.random() * 120}px;
      --x5:${startX + (Math.random() - 0.5) * 300}px;
      --y5:${-300 - Math.random() * 150}px;
      font-size:${1.2 + Math.random() * 1}rem;
    `;
    container.appendChild(b);
    setTimeout(() => b.remove(), 8000);
  }
}

// ===== LOVE METER =====
function initLoveMeter(name) {
  const fill = document.getElementById('lovemeterFill');
  const pct = document.getElementById('lovemeterPct');
  const label = document.getElementById('lovemeterLabel');
  const glow = document.getElementById('lovemeterGlow');
  if (!fill) return;

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      obs.disconnect();
      let current = 0;
      const target = 100;
      const steps = [
        { at: 0, text: 'Scanning heart...' },
        { at: 20, text: 'Feeling the love...' },
        { at: 50, text: 'Love levels rising...' },
        { at: 75, text: 'Almost there...' },
        { at: 95, text: 'Off the charts!' },
        { at: 100, text: `${name} = Infinite Love 💕` },
      ];

      fill.style.width = '100%';
      glow.style.boxShadow = 'inset 0 0 20px rgba(255,45,117,0.4),0 0 30px rgba(255,45,117,0.3)';

      const counter = setInterval(() => {
        current++;
        pct.textContent = current + '%';
        const step = steps.filter(s => s.at <= current).pop();
        if (step) label.textContent = step.text;
        if (current >= target) {
          clearInterval(counter);
          haptic(80);
          launchConfetti(80);
        }
      }, 30);
    }
  }, { threshold: 0.3 });
  obs.observe(fill.parentElement);
}

// ===== MAGIC FORTUNE BALL =====
function initFortuneBall(name) {
  const ball = document.getElementById('fortuneBall');
  if (!ball) return;

  const fortunes = [
    `This year, ${name}, all your dreams come true ✨`,
    `Love and happiness follow you everywhere you go, ${name} 💕`,
    `A beautiful surprise is coming your way very soon 🎁`,
    `The stars say: ${name} is destined for greatness 🌟`,
    `Your smile will open a thousand doors this year 😊`,
    `Someone very special is thinking about you right now 💖`,
    `This birthday marks the beginning of your best chapter yet 📖`,
    `The universe has big plans for you, ${name} 🌌`,
    `You will find joy in the smallest moments this year 🌸`,
    `A love deeper than the ocean awaits you 🌊💕`,
  ];

  let revealed = false;

  ball.addEventListener('click', () => {
    if (revealed) {
      // Reset
      document.getElementById('fortuneAnswer').classList.add('hidden');
      document.querySelector('.fortune-inner').style.opacity = '1';
      revealed = false;
      return;
    }

    ball.classList.add('shake');
    haptic(50);

    setTimeout(() => {
      ball.classList.remove('shake');
      const answer = document.getElementById('fortuneAnswer');
      const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      answer.textContent = fortune;
      answer.classList.remove('hidden');
      document.querySelector('.fortune-inner').style.opacity = '0';
      revealed = true;
      haptic(30);
      burstFireworks(2);
    }, 700);
  });
}

// ===== I LOVE YOU IN EVERY LANGUAGE =====
function initILoveYou(name) {
  const display = document.getElementById('iloveyouDisplay');
  if (!display) return;

  const translations = [
    { text: 'I Love You', lang: 'English' },
    { text: 'Main Tumse Pyaar Karta Hoon', lang: 'Hindi' },
    { text: 'Te Amo', lang: 'Spanish' },
    { text: 'Je T\'aime', lang: 'French' },
    { text: '사랑해요', lang: 'Korean' },
    { text: '愛してる', lang: 'Japanese' },
    { text: 'أحبك', lang: 'Arabic' },
    { text: 'Ich Liebe Dich', lang: 'German' },
    { text: 'Ti Amo', lang: 'Italian' },
    { text: 'Eu Te Amo', lang: 'Portuguese' },
    { text: 'Seni Seviyorum', lang: 'Turkish' },
    { text: 'Я тебя люблю', lang: 'Russian' },
    { text: `${name}, I Love You`, lang: 'My Heart 💕' },
  ];

  const textEl = document.createElement('div');
  textEl.className = 'ily-text';
  const langEl = document.createElement('div');
  langEl.className = 'ily-lang';
  display.appendChild(textEl);
  display.appendChild(langEl);

  let index = 0;
  let running = false;

  function showNext() {
    if (!running) return;
    const t = translations[index];
    textEl.classList.remove('show');
    textEl.classList.add('exit');

    setTimeout(() => {
      textEl.textContent = t.text;
      langEl.textContent = `— ${t.lang}`;
      textEl.classList.remove('exit');
      textEl.classList.add('show');
      index = (index + 1) % translations.length;
    }, 500);

    setTimeout(showNext, 2500);
  }

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !running) {
      running = true;
      textEl.textContent = translations[0].text;
      langEl.textContent = `— ${translations[0].lang}`;
      textEl.classList.add('show');
      index = 1;
      setTimeout(showNext, 2500);
    }
  }, { threshold: 0.3 });
  obs.observe(display);
}

// ===== INFINITY SECTION =====
function initInfinity(name) {
  const sub = document.getElementById('infinitySub');
  if (!sub) return;
  sub.textContent = `My love for you, ${name}, has no end`;
}

// ===== DOUBLE TAP HEART EXPLOSION =====
let lastTap = 0;
document.addEventListener('click', (e) => {
  const now = Date.now();
  if (now - lastTap < 350) {
    // Double tap detected!
    const hearts = ['❤️', '💖', '💗', '💕', '💓', '💝'];
    for (let i = 0; i < 8; i++) {
      const h = document.createElement('div');
      h.className = 'doubletap-heart';
      h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      h.style.cssText = `left:${e.clientX + (Math.random() - 0.5) * 60}px;top:${e.clientY + (Math.random() - 0.5) * 60}px;animation-delay:${i * 0.05}s;font-size:${2 + Math.random() * 3}rem;`;
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1200);
    }
    haptic(40);
  }
  lastTap = now;
});

// ===== GYROSCOPE PARALLAX (mobile) =====
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', (e) => {
    const meshBg = document.getElementById('meshBg');
    if (!meshBg || !meshBg.offsetParent) return;
    const beta = (e.beta || 0) * 0.3;
    const gamma = (e.gamma || 0) * 0.3;
    meshBg.style.transform = `translate(${gamma}px, ${beta}px)`;
  }, { passive: true });
}

// ===== HAPTIC VIBRATION (mobile) =====
function haptic(duration = 30) {
  if (navigator.vibrate) {
    navigator.vibrate(duration);
  }
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.createElement('div'); t.className = 'toast';
  t.textContent = msg; document.body.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 500); }, 3500);
}

// ===== V2: TRIVIA QUIZ =====
function buildTriviaQuiz(name) {
  const container = document.getElementById('triviaContainer');
  const scoreEl = document.getElementById('triviaScore');
  if (!container) return;
  container.innerHTML = '';

  const questions = [
    {
      q: `What's my favorite thing about ${name}?`,
      options: ['Your beautiful smile', 'Your kind heart', 'Everything about you'],
      correct: 2,
      reveal: `It's EVERYTHING! There's nothing about ${name} I don't love 💕`
    },
    {
      q: `Where would I take ${name} on a dream date?`,
      options: ['Paris — The City of Love', 'A private beach at sunset', 'Anywhere, as long as we\'re together'],
      correct: 2,
      reveal: `The destination doesn't matter — being with ${name} is the real adventure! ✈️`
    },
    {
      q: `What do I love most about us?`,
      options: ['The way we laugh together', 'How we understand each other', 'That our love grows stronger every day'],
      correct: 2,
      reveal: `Every single day our love only gets deeper and more beautiful 💖`
    },
  ];

  let score = 0;
  let answered = 0;

  questions.forEach((qObj, qi) => {
    const card = document.createElement('div');
    card.className = 'trivia-card';
    card.innerHTML = `<p class="trivia-question">${qObj.q}</p><div class="trivia-options"></div>`;
    const optionsDiv = card.querySelector('.trivia-options');

    qObj.options.forEach((opt, oi) => {
      const btn = document.createElement('button');
      btn.className = 'trivia-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) return;
        optionsDiv.querySelectorAll('.trivia-option').forEach(b => b.classList.add('disabled'));
        if (oi === qObj.correct) {
          btn.classList.add('correct');
          score++;
          launchConfetti(60);
          haptic(50);
        } else {
          btn.classList.add('wrong');
          optionsDiv.children[qObj.correct].classList.add('correct');
        }
        const reveal = document.createElement('p');
        reveal.className = 'trivia-answer';
        reveal.textContent = qObj.reveal;
        card.appendChild(reveal);

        answered++;
        if (answered === questions.length) {
          setTimeout(() => showTriviaScore(score, questions.length, name), 800);
        }
      });
      optionsDiv.appendChild(btn);
    });
    container.appendChild(card);
  });

  function showTriviaScore(s, total, name) {
    scoreEl.classList.remove('hidden');
    const msgs = [
      `We have a beautiful journey ahead, ${name}!`,
      `You know me so well, ${name}! 💕`,
      `${name}, we're truly soulmates! 🥰`,
    ];
    scoreEl.innerHTML = `
      <div class="trivia-score-num">${s}/${total}</div>
      <p class="trivia-score-text">${msgs[s] || msgs[2]}</p>
    `;
    if (s === total) { launchConfetti(150); burstFireworks(5); }
  }
}

// ===== V2: CONFETTI CANNON =====
function initConfettiCannon() {
  const btn = document.getElementById('cannonBtn');
  if (!btn) return;
  let cooling = false;

  btn.addEventListener('click', () => {
    if (cooling) return;
    cooling = true;
    btn.classList.add('cooldown');
    haptic(100);

    // MEGA celebration!
    launchConfetti(300);
    burstFireworks(15);

    // Emoji rain
    const emojis = ['🎉', '🎊', '🥳', '🎂', '💕', '✨', '🎈', '🎁', '🌹', '💖', '👑', '🦋'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const el = document.createElement('div'); el.className = 'action-float';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.cssText = `left:${Math.random() * 100}vw;--end-y:${-300 - Math.random() * 400}px;--end-x:${Math.random() * 200 - 100}px;--rot:${Math.random() * 720}deg;font-size:${1.5 + Math.random() * 2}rem;animation-duration:${2 + Math.random() * 2}s;`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 4500);
      }, i * 60);
    }

    // Screen shake
    document.body.style.animation = 'none';
    document.body.style.animation = 'screenShake 0.5s ease';
    setTimeout(() => document.body.style.animation = '', 500);

    showToast('🎉 MAXIMUM CELEBRATION! 🎊');

    setTimeout(() => {
      cooling = false;
      btn.classList.remove('cooldown');
    }, 3000);
  });
}

// Screen shake keyframes (added dynamically)
if (!document.getElementById('screenShakeStyle')) {
  const style = document.createElement('style');
  style.id = 'screenShakeStyle';
  style.textContent = `@keyframes screenShake{0%,100%{transform:translate(0)}10%{transform:translate(-5px,3px)}20%{transform:translate(5px,-3px)}30%{transform:translate(-3px,5px)}40%{transform:translate(3px,-5px)}50%{transform:translate(-2px,2px)}}`;
  document.head.appendChild(style);
}

// ===== V2: MEMORY JAR =====
function buildMemoryJar(name) {
  const notesContainer = document.getElementById('jarNotes');
  const sparklesContainer = document.getElementById('jarSparkles');
  if (!notesContainer) return;

  const memories = [
    { emoji: '🌅', text: `Every sunrise reminds me of the first time I saw ${name}'s smile — pure magic.` },
    { emoji: '💬', text: `Our late-night conversations are my favorite thing in the world.` },
    { emoji: '🎵', text: `Every love song I hear, I think of you, ${name}.` },
    { emoji: '🤗', text: `Your hugs feel like home. I never want to let go.` },
    { emoji: '😊', text: `The way you laugh makes my entire day better, ${name}.` },
    { emoji: '🌙', text: `You're the last thought on my mind every night and the first every morning.` },
    { emoji: '💪', text: `You make me a better person, ${name}. Thank you for being you.` },
    { emoji: '🌈', text: `After every storm, you are my rainbow. Always.` },
  ];

  const noteColors = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#e8baff', '#ffc9de', '#c9f0ff'];

  memories.forEach((m, i) => {
    const note = document.createElement('div');
    note.className = 'jar-note';
    note.style.background = noteColors[i % noteColors.length];
    note.style.setProperty('--dur', `${3 + Math.random() * 3}s`);
    note.style.setProperty('--delay', `${Math.random() * 2}s`);
    note.style.setProperty('--rot', `${Math.random() * 20 - 10}deg`);
    note.textContent = m.emoji;
    note.addEventListener('click', () => {
      haptic(30);
      showJarModal(m.emoji, m.text);
    });
    notesContainer.appendChild(note);
  });

  // Sparkle particles inside jar
  for (let i = 0; i < 12; i++) {
    const sp = document.createElement('div');
    sp.className = 'jar-sparkle';
    sp.style.left = `${10 + Math.random() * 80}%`;
    sp.style.top = `${10 + Math.random() * 80}%`;
    sp.style.setProperty('--dur', `${2 + Math.random() * 3}s`);
    sp.style.setProperty('--delay', `${Math.random() * 3}s`);
    sparklesContainer.appendChild(sp);
  }
}

function showJarModal(emoji, text) {
  const modal = document.getElementById('jarModal');
  document.getElementById('jarModalEmoji').textContent = emoji;
  document.getElementById('jarModalText').textContent = text;
  modal.classList.remove('hidden');
  launchSparks(window.innerWidth / 2, window.innerHeight / 2, 15);
}

document.getElementById('jarModalClose').addEventListener('click', () => {
  document.getElementById('jarModal').classList.add('hidden');
});
document.getElementById('jarModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) document.getElementById('jarModal').classList.add('hidden');
});

// ===== V2: ZODIAC PERSONALITY =====
function buildZodiac() {
  const monthsContainer = document.getElementById('zodiacMonths');
  if (!monthsContainer) return;

  const zodiacData = [
    { month: 1, sign: 'Capricorn / Aquarius', emoji: '♑♒', dates: 'Dec 22 – Jan 19 / Jan 20 – Feb 18', traits: ['Ambitious', 'Disciplined', 'Innovative', 'Loyal'], lucky: '🎨 Lucky Color: Blue', compat: '💕 Compatible: Taurus, Virgo' },
    { month: 2, sign: 'Aquarius / Pisces', emoji: '♒♓', dates: 'Jan 20 – Feb 18 / Feb 19 – Mar 20', traits: ['Creative', 'Dreamy', 'Compassionate', 'Intuitive'], lucky: '🎨 Lucky Color: Turquoise', compat: '💕 Compatible: Cancer, Scorpio' },
    { month: 3, sign: 'Pisces / Aries', emoji: '♓♈', dates: 'Feb 19 – Mar 20 / Mar 21 – Apr 19', traits: ['Imaginative', 'Brave', 'Passionate', 'Gentle'], lucky: '🎨 Lucky Color: Sea Green', compat: '💕 Compatible: Leo, Sagittarius' },
    { month: 4, sign: 'Aries / Taurus', emoji: '♈♉', dates: 'Mar 21 – Apr 19 / Apr 20 – May 20', traits: ['Bold', 'Determined', 'Reliable', 'Energetic'], lucky: '🎨 Lucky Color: Red', compat: '💕 Compatible: Leo, Gemini' },
    { month: 5, sign: 'Taurus / Gemini', emoji: '♉♊', dates: 'Apr 20 – May 20 / May 21 – Jun 20', traits: ['Patient', 'Curious', 'Devoted', 'Charming'], lucky: '🎨 Lucky Color: Green', compat: '💕 Compatible: Virgo, Cancer' },
    { month: 6, sign: 'Gemini / Cancer', emoji: '♊♋', dates: 'May 21 – Jun 20 / Jun 21 – Jul 22', traits: ['Versatile', 'Nurturing', 'Witty', 'Emotional'], lucky: '🎨 Lucky Color: Yellow', compat: '💕 Compatible: Libra, Pisces' },
    { month: 7, sign: 'Cancer / Leo', emoji: '♋♌', dates: 'Jun 21 – Jul 22 / Jul 23 – Aug 22', traits: ['Caring', 'Confident', 'Protective', 'Generous'], lucky: '🎨 Lucky Color: Silver', compat: '💕 Compatible: Scorpio, Aries' },
    { month: 8, sign: 'Leo / Virgo', emoji: '♌♍', dates: 'Jul 23 – Aug 22 / Aug 23 – Sep 22', traits: ['Charismatic', 'Analytical', 'Warm', 'Perfectionist'], lucky: '🎨 Lucky Color: Gold', compat: '💕 Compatible: Sagittarius, Gemini' },
    { month: 9, sign: 'Virgo / Libra', emoji: '♍♎', dates: 'Aug 23 – Sep 22 / Sep 23 – Oct 22', traits: ['Thoughtful', 'Harmonious', 'Kind', 'Elegant'], lucky: '🎨 Lucky Color: Navy Blue', compat: '💕 Compatible: Taurus, Capricorn' },
    { month: 10, sign: 'Libra / Scorpio', emoji: '♎♏', dates: 'Sep 23 – Oct 22 / Oct 23 – Nov 21', traits: ['Diplomatic', 'Mysterious', 'Artistic', 'Intense'], lucky: '🎨 Lucky Color: Pink', compat: '💕 Compatible: Aquarius, Leo' },
    { month: 11, sign: 'Scorpio / Sagittarius', emoji: '♏♐', dates: 'Oct 23 – Nov 21 / Nov 22 – Dec 21', traits: ['Passionate', 'Adventurous', 'Resourceful', 'Optimistic'], lucky: '🎨 Lucky Color: Crimson', compat: '💕 Compatible: Cancer, Pisces' },
    { month: 12, sign: 'Sagittarius / Capricorn', emoji: '♐♑', dates: 'Nov 22 – Dec 21 / Dec 22 – Jan 19', traits: ['Free-spirited', 'Ambitious', 'Honest', 'Philosophical'], lucky: '🎨 Lucky Color: Purple', compat: '💕 Compatible: Aries, Aquarius' },
  ];

  for (let m = 1; m <= 12; m++) {
    const btn = document.createElement('button');
    btn.className = 'zodiac-month-btn';
    btn.textContent = m;
    btn.addEventListener('click', () => {
      monthsContainer.querySelectorAll('.zodiac-month-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showZodiacCard(zodiacData[m - 1]);
      haptic(30);
    });
    monthsContainer.appendChild(btn);
  }

  function showZodiacCard(data) {
    const card = document.getElementById('zodiacCard');
    document.getElementById('zodiacEmoji').textContent = data.emoji;
    document.getElementById('zodiacName').textContent = data.sign;
    document.getElementById('zodiacDates').textContent = data.dates;
    const traitsEl = document.getElementById('zodiacTraits');
    traitsEl.innerHTML = '';
    data.traits.forEach(t => {
      const span = document.createElement('span');
      span.className = 'zodiac-trait';
      span.textContent = t;
      traitsEl.appendChild(span);
    });
    document.getElementById('zodiacLucky').textContent = data.lucky;
    document.getElementById('zodiacCompat').textContent = data.compat;
    card.classList.remove('hidden');
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = '';
    launchSparks(window.innerWidth / 2, card.getBoundingClientRect().top, 12);
  }
}

// ===== V2: BIRTHDAY COUNTDOWN =====
function initBirthdayCountdown() {
  const daysEl = document.getElementById('cdDays');
  const hoursEl = document.getElementById('cdHours');
  const minsEl = document.getElementById('cdMins');
  const secsEl = document.getElementById('cdSecs');
  if (!daysEl) return;

  function update() {
    const now = new Date();
    let nextBday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    // Set next birthday as exactly 365 days from today (since we don't know actual date)
    nextBday = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

    const diff = nextBday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(3, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// ===== V2: WISH JAR =====
function initWishJar(name) {
  const wrap = document.getElementById('wishjarWrap');
  const shakeBtn = document.getElementById('wishjarShakeBtn');
  const result = document.getElementById('wishjarResult');
  const resultText = document.getElementById('wishjarResultText');
  const resetBtn = document.getElementById('wishjarReset');
  const particlesContainer = document.getElementById('wishjarParticles');
  if (!shakeBtn) return;

  const wishes = [
    `This year, ${name}, every dream you have will come true ✨`,
    `May your life overflow with love, laughter, and endless adventures 🌟`,
    `Someone special is thinking about you right now and always will 💕`,
    `A year full of beautiful surprises awaits you, ${name} 🎁`,
    `Your smile has the power to change the world — never stop smiling 😊`,
    `The universe is conspiring to bring you everything you deserve 🌌`,
    `This is your year to shine brighter than ever before, ${name} 👑`,
    `Love will find you in unexpected places this year 🌹`,
    `Every wish you make tonight will come true — I promise 🌙`,
    `You are destined for greatness, and this year proves it 🚀`,
  ];

  // Add particles inside jar
  const pColors = ['rgba(168,85,247,0.6)', 'rgba(255,110,180,0.5)', 'rgba(255,215,0,0.5)', 'rgba(232,168,124,0.4)'];
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'wishjar-particle';
    const size = 3 + Math.random() * 5;
    p.style.cssText = `
      width:${size}px;height:${size}px;
      background:${pColors[Math.floor(Math.random() * pColors.length)]};
      left:${10 + Math.random() * 80}%;
      top:${20 + Math.random() * 60}%;
      border-radius:50%;
      --dur:${3 + Math.random() * 4}s;
      --delay:${Math.random() * 3}s;
    `;
    particlesContainer.appendChild(p);
  }

  shakeBtn.addEventListener('click', () => {
    // Shake animation
    wrap.classList.add('shaking');
    haptic(80);
    setTimeout(() => wrap.classList.remove('shaking'), 600);

    setTimeout(() => {
      const wish = wishes[Math.floor(Math.random() * wishes.length)];
      resultText.textContent = wish;
      result.classList.remove('hidden');
      result.style.animation = 'none';
      void result.offsetWidth;
      result.style.animation = '';
      resetBtn.classList.remove('hidden');
      shakeBtn.classList.add('hidden');
      launchConfetti(80);
      burstFireworks(3);
    }, 700);
  });

  resetBtn.addEventListener('click', () => {
    result.classList.add('hidden');
    resetBtn.classList.add('hidden');
    shakeBtn.classList.remove('hidden');
  });
}

// ===== V2: HEART BEAT SYNC =====
function initHeartBeatSync(name) {
  const bpmEl = document.getElementById('bpmNum');
  const textEl = document.getElementById('heartbeatText');
  if (!bpmEl) return;

  textEl.textContent = `My heart beats only for you, ${name}`;
  let running = false;

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !running) {
      running = true;
      let bpm = 0;
      const target = 143; // "I Love You" = 143
      const interval = setInterval(() => {
        bpm += Math.ceil(Math.random() * 5) + 2;
        if (bpm >= target) {
          bpm = target;
          clearInterval(interval);
          bpmEl.textContent = bpm;
          showToast(`💓 143 = I Love You, ${name}!`);
          haptic(50);
        }
        bpmEl.textContent = bpm;
      }, 30);
    }
  }, { threshold: 0.3 });
  obs.observe(bpmEl.parentElement.parentElement);
}

// ===== V2: SHOOTING STARS (Final Section) =====
function initShootingStars() {
  const container = document.getElementById('shootingStarsBg');
  if (!container) return;

  for (let i = 0; i < 6; i++) {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = `${Math.random() * 40}%`;
    star.style.left = `-120px`;
    star.style.setProperty('--dur', `${4 + Math.random() * 6}s`);
    star.style.setProperty('--delay', `${i * 2 + Math.random() * 3}s`);
    star.style.width = `${60 + Math.random() * 80}px`;
    container.appendChild(star);
  }
}

// ===== V2: FINAL FLOATING HEARTS =====
function initFinalFloatingHearts() {
  const container = document.getElementById('finalFloatingHearts');
  if (!container) return;

  const hearts = ['💕', '💖', '💗', '💝', '🩷', '🤍'];
  for (let i = 0; i < 12; i++) {
    const h = document.createElement('div');
    h.className = 'final-float-heart';
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = `${Math.random() * 100}%`;
    h.style.setProperty('--size', `${0.8 + Math.random() * 1.2}rem`);
    h.style.setProperty('--dur', `${6 + Math.random() * 8}s`);
    h.style.setProperty('--delay', `${Math.random() * 8}s`);
    container.appendChild(h);
  }
}

// ===== V2: POLAROID DOUBLE-TAP HEART =====
(function() {
  let lastPolaroidTap = 0;
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.polaroid-card');
    if (!card) return;
    const now = Date.now();
    if (now - lastPolaroidTap < 350) {
      // Double tap on polaroid — Instagram heart
      const rect = card.getBoundingClientRect();
      const heart = document.createElement('div');
      heart.className = 'polaroid-heart';
      heart.textContent = '❤️';
      heart.style.left = `${e.clientX - rect.left - 20}px`;
      heart.style.top = `${e.clientY - rect.top - 20}px`;
      card.appendChild(heart);
      setTimeout(() => heart.remove(), 900);
      haptic(30);
    }
    lastPolaroidTap = now;
  });
})();
