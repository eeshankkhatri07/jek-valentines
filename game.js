// ═══════════════════════════════════════════
// Cover Photo Carousel — Click to Cycle
// ═══════════════════════════════════════════
const coverPhotos = [
    'images/IMG_1597.jpg',
    'images/ddcf7fc9-14cd-4eaa-a687-73c774872640.JPG',
    'images/49fa9a91-0555-40e6-860e-b67bfaf8739e.JPG',
    'images/12c3b2c9-9878-4e6e-9f9e-83b9eb88268e.JPG',
    'images/b1bc2569-4eae-4cec-a855-ee487f84a3cc.JPG',
    'images/a860ea0a-7601-4881-b1e5-4890a15c192a.JPG'
];
let coverIndex = 0;

function cycleCoverPhoto() {
    const img = document.getElementById('cover-carousel-img');
    if (!img) return;

    // Fade out
    img.style.opacity = '0';
    img.style.transform = 'scale(1.02)';

    setTimeout(() => {
        coverIndex = (coverIndex + 1) % coverPhotos.length;
        img.src = coverPhotos[coverIndex];

        // Update dot indicators
        const dots = document.querySelectorAll('#carousel-indicator .dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === coverIndex);
        });

        // Fade in
        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }, 50);
    }, 300);
}

// Preload carousel images for smooth transitions
coverPhotos.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Security Gate Logic
function checkDate() {
    const input = document.getElementById('date-input').value.toLowerCase().trim();
    const errorMsg = document.getElementById('error-msg');

    // Flexible validation for "March 16"
    if (input.includes('march 16') || input.includes('16 march') || input.includes('16th march') || input.includes('mar 16')) {
        nextScreen('landing-screen');
        fireConfetti(); // Celebrate entry!
    } else {
        errorMsg.style.display = 'block';
        errorMsg.classList.add('wrong-shake');
        setTimeout(() => errorMsg.classList.remove('wrong-shake'), 500);
    }
}

// "Things I Like About You" - Click Feature
const compliments = [
    "How incredibly dedicated you are 💪",
    "My personal dermat 🧴✨",
    "Someone who doesn't hold grudges 🕊️",
    "One of the purest souls I know 🤍",
    "The sweetest bitch 😘🔥",
    "Your laugh is my favorite sound 🎶",
    "The way your eyes twinkle ✨",
    "How kind you are to everyone ❤️",
    "Your chaotic energy 🤪",
    "Your beautiful smile 😊",
    "The way you care about small things 🌸",
    "Just YOU being YOU 💕"
];

document.addEventListener('click', (e) => {
    // Don't spawn if clicking button or input
    if (e.target.closest('button') || e.target.closest('input')) return;

    const text = document.createElement('div');
    text.className = 'floating-compliment';
    text.innerText = compliments[Math.floor(Math.random() * compliments.length)];
    text.style.left = e.pageX + 'px';
    text.style.top = e.pageY + 'px';

    document.body.appendChild(text);

    // Remove after animation
    setTimeout(() => text.remove(), 2000);
});


// GAME DATA (Customized for Bittu)
const questions = [
    {
        q: "What is our favorite place to eat out?",
        options: ["OJI Ramen 🍜", "The Sassy Spoon", "Mamagoto", "Street Food"],
        correct: 0,
        hint: "Slurp slurp! 🍜",
        image: "images/IMG_1597.jpg",
        digits: "63"
    },
    {
        q: "What was our first quality time spent together?",
        options: ["Movie Date", "Deep talks in 6003 balcony 🤝", "Long Drive", "Coffee Date"],
        correct: 1,
        hint: "Holding hands for 2 hours... 💕",
        image: "images/IMG_1598.jpg",
        digits: "82"
    },
    {
        q: "What was the first song we vibed on?",
        options: ["Tum Se Hi", "Sajni Re 🎵", "Raabta", "Pee Loon"],
        correct: 1,
        hint: "Arijit Singh magic ✨",
        image: "images/IMG_5059.JPG",
        digits: "37"
    },
    {
        q: "What is our go-to outing?",
        options: ["Beach 🏖️", "Movies 🎬", "Pani Puri khane jaana 🥙", "Shopping 🛍️"],
        correct: 2,
        hint: "Tangy and spicy! 😋",
        image: "images/IMG_6712.JPG",
        digits: "73"
    },
    {
        q: "What is the best thing about Jinal?",
        options: ["Her Style 👗", "Her heart 🍒👀", "Her Personality ✨", "Her Eyes 👀"],
        correct: 1,
        hint: "Sweet like cherries! 🍒",
        image: "images/8ffab4fd-06be-46c3-bae1-e47deeb7e732.JPG",
        digits: "05"
    },
    {
        q: "What is the best thing about Eeshank?",
        options: ["His Jokes 😂", "His Cooking 🍳", "Jinal (Bittu) ❤️", "His Coding 💻"],
        correct: 2,
        hint: "You make him complete.",
        image: "images/b0d37315-31f7-4833-a181-e469dbc35415.JPG",
        digits: null
    }
];

// Collected digit fragments
let collectedDigits = [];



let currentQuestion = 0;
let timeLeft = 60; // 60 seconds
let timerInterval;
let correctScale = 1; // For growing effect
const letters = ['A', 'B', 'C', 'D'];

// Navigation
function nextScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    // Auto-start game when entering game screen
    if (screenId === 'game-screen') {
        startGame();
    }
}

// Game Logic
function startGame() {
    currentQuestion = 0;
    collectedDigits = [];
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        // Assemble the secret number and show it on the final screen
        const secretNumber = collectedDigits.join('');
        const finalMsg = document.getElementById('final-msg');
        finalMsg.innerHTML = `
            <div style="margin-bottom: 20px; font-size: 1rem; letter-spacing: 2px; color: var(--secondary-color);">
                🔓 SECRET CODE UNLOCKED
            </div>
            <div style="font-size: 2rem; font-family: 'Montserrat'; letter-spacing: 4px; color: #fff; margin-bottom: 10px;">
                📞 ${secretNumber}
            </div>
            <div style="font-size: 0.85rem; opacity: 0.7; margin-bottom: 30px;">
                Call this number for your surprise gift 🎁✨
            </div>
            <div style="font-size: 1.5rem;">
                "You were always the answer.<br>
                Will you be my Valentine? 🌹"
            </div>
        `;
        nextScreen('final-screen');
        fireConfetti();
        return;
    }

    const q = questions[currentQuestion];
    document.getElementById('question-number').innerText = `Question ${currentQuestion + 1} / ${questions.length}`;
    document.getElementById('question-text').innerText = q.q;
    document.getElementById('hint-card').style.display = 'none';

    // Update Image if available (and if verify img element exists)
    const gameImg = document.querySelector('.game-image-panel img');
    if (gameImg && q.image) {
        gameImg.src = q.image;
    }

    // Reset visuals
    correctScale = 1;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-letter">${letters[index]}</span> ${opt}`;
        // Pass the option text for logic checks (like "Beach")
        btn.onclick = () => checkAnswer(index, q.correct, btn, opt);
        optionsContainer.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    timeLeft = 60; // 60 seconds
    const fill = document.getElementById('timer-fill');
    fill.style.width = '100%';
    fill.style.background = 'linear-gradient(90deg, #ffd700, #ff8c00)';

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        const percentage = (timeLeft / 60) * 100; // Updated for 60s
        fill.style.width = `${percentage}%`;

        if (timeLeft <= 10) {
            fill.style.background = 'linear-gradient(90deg, #ff0000, #800000)';
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // Auto-advance or show timeout? Let's show a timeout/skip option to prevent sticking
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    // Show the "Next" button even if they didn't answer, to prevent being stuck
    const hintCard = document.getElementById('hint-card');
    const hintText = document.getElementById('hint-text');
    const rewardText = document.getElementById('reward-text');

    rewardText.innerHTML = `<strong>TIME'S UP!</strong>`;
    hintText.innerText = `Let's move to the next one!`;
    hintCard.style.display = 'block';
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
}


function checkAnswer(selectedIndex, correctIndex, btnElement, optionText) {
    // Special Logic for "Beach" in Question 4 (Index 3)
    if (currentQuestion === 3 && optionText.includes("Beach")) {
        alert("Subah jaldi uthna hota hai! 😴☀️ Only if you can wake up at 5 AM!");
        btnElement.classList.add('wrong-shake');
        setTimeout(() => btnElement.classList.remove('wrong-shake'), 500);
        return; // Don't process as a normal wrong answer, just a hint
    }

    const options = document.querySelectorAll('.option-btn');
    const correctBtn = options[correctIndex];

    if (selectedIndex === correctIndex) {
        // CORRECT!
        clearInterval(timerInterval);
        btnElement.classList.add('correct-lock');
        fireConfetti();
        setTimeout(() => showReward(), 1000);
    } else {
        // WRONG!
        btnElement.classList.add('wrong-shake');
        setTimeout(() => btnElement.classList.remove('wrong-shake'), 500);

        // 1. Correct Answer Increases Size
        if (correctBtn) {
            correctScale += 0.2;
            correctBtn.style.transform = `scale(${correctScale})`;
            correctBtn.style.borderColor = '#ffd700';
            correctBtn.style.boxShadow = `0 0 ${10 * correctScale}px #ffd700`;
        }

        // 2. Give More Time (e.g., +10 seconds)
        timeLeft += 10;
        if (timeLeft > 60) timeLeft = 60; // Cap at max
    }
}

function showReward() {
    const hintCard = document.getElementById('hint-card');
    const hintText = document.getElementById('hint-text');
    const rewardText = document.getElementById('reward-text');

    const q = questions[currentQuestion];

    // Collect and display digit fragment
    let digitDisplay = '';
    if (q.digits) {
        collectedDigits.push(q.digits);
        digitDisplay = `<div class="digit-reveal">
            <span class="digit-label">🔑 SECRET FRAGMENT ${collectedDigits.length}/5:</span>
            <span class="digit-value">${q.digits}</span>
            <span class="digit-collected">Collected so far: ${collectedDigits.join(' · ')}</span>
        </div>`;
    } else {
        // Last question — no new digits, just tease
        digitDisplay = `<div class="digit-reveal">
            <span class="digit-label">🔓 ALL FRAGMENTS COLLECTED!</span>
            <span class="digit-collected">Finish to reveal the secret... ✨</span>
        </div>`;
    }

    rewardText.innerHTML = `<strong>CORRECT ANSWER!</strong>`;
    hintText.innerHTML = `${digitDisplay}`;

    hintCard.style.display = 'block';

    // Disable options
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

// Confetti Effect
function fireConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4536a', '#ffd700', '#f5c6c6']
    });
}

// Celebrate Final - Slow Gold Confetti
function celebrateFinal() {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // Slow gold confetti
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#FFD700', '#F0E68C', '#B8860B'], // Gold shades
            gravity: 0.6,
            scalar: 1.2
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#FFD700', '#F0E68C', '#B8860B'], // Gold shades
            gravity: 0.6,
            scalar: 1.2
        }));
    }, 250);
}

// ═══════════════════════════════════════════
// Valentine Yes/No Logic
// ═══════════════════════════════════════════
const rejectionMessages = [
    "sochlo 🥺",
    "sachme? 🥺",
    "mai itna bura hoon kya? 🥺",
    "ek baar aur soch le 🥺👉👈",
    "please yaar 🥺💔",
    "tujhe chocolate dunga 🍫🥺",
    "ruk, ro raha hoon 😭",
    "tera heart of gold hai na? toh bol de yes 🥺✨",
    "ab toh haan bol de 🥺🌹",
    "last chance de de mujhe 🥺💕"
];
let rejectionCount = 0;
let yesBtnScale = 1;

function sayNo() {
    const msgEl = document.getElementById('rejection-msg');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    // Show rejection message
    const msg = rejectionMessages[rejectionCount % rejectionMessages.length];
    msgEl.textContent = msg;
    msgEl.style.display = 'block';
    msgEl.classList.remove('shake-msg');
    void msgEl.offsetWidth; // trigger reflow
    msgEl.classList.add('shake-msg');

    rejectionCount++;

    // Grow the Yes button and shrink the No button
    yesBtnScale += 0.15;
    btnYes.style.transform = `scale(${yesBtnScale})`;
    btnNo.style.fontSize = Math.max(0.5, 1 - rejectionCount * 0.05) + 'rem';
    btnNo.style.opacity = Math.max(0.4, 1 - rejectionCount * 0.06);
}

function sayYes() {
    const msgEl = document.getElementById('rejection-msg');
    const buttonsEl = document.getElementById('valentine-buttons');
    const finalMsg = document.getElementById('final-msg');

    // Hide buttons and rejection message
    buttonsEl.style.display = 'none';
    msgEl.style.display = 'none';

    // Update message
    finalMsg.innerHTML = "BEST. DECISION. EVER. 💖<br><span style='font-size: 1.1rem; opacity: 0.8; margin-top: 10px; display: inline-block;'>I knew it all along 🌹</span>";

    // Fire confetti!
    celebrateFinal();
}

// Particle Background
function createParticles() {
    const container = document.getElementById('hearts-container'); // Reusing id for simplicity or need to change HTML
    // Actually better to clear old hearts if any

    // Generate static stars/particles
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = (Math.random() * 10 + 5) + 's';
        p.style.width = Math.random() * 3 + 'px';
        p.style.height = p.style.width;
        container.appendChild(p);
    }
}

// Run once
createParticles();
