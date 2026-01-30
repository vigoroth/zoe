/* ========================================
   ROMANTIC QUIZ FOR ZOE - JAVASCRIPT
   ======================================== */

// ========================================
// QUIZ DATA - PERSONALIZED FOR ZOE!
// ========================================
const quizData = [
    {
        question: "2 × ∞ = ?",
        answers: [
            "2∞",
            "∞",
            "Αόριστο",
            "Πολύ μεγάλο"
        ],
        correctIndex: 1,
        correctFeedback: "Η μαθηματικός μου ξέρει! Το άπειρο επί οποιαδήποτε σταθερά είναι πάντα άπειρο 💕"
    },
    {
        question: "lim(days together → ∞) happiness = ?",
        answers: [
            "0",
            "1",
            "∞",
            "Αόριστο"
        ],
        correctIndex: 2,
        correctFeedback: "Σωστά! Η αγάπη μου για σένα δεν έχει άνω φράγμα ∞💕"
    },
    {
        question: "εσύ + εγώ = ?",
        answers: [
            "2",
            "∞",
            "αόριστο",
            "NaN"
        ],
        correctIndex: 1,
        correctFeedback: "Μαζί είμαστε άπειροι 🥰"
    }
];

// ========================================
// LETTER FRAGMENTS - Revealed after each correct answer
// ========================================
const letterFragments = [
    "Κάθε στιγμή μαζί σου είναι σαν να λύνω την πιο όμορφη εξίσωση...",
    "Αγαπώ τον τρόπο που πέφτουν τα μαλλιά σου, τον τρόπο που σκέφτεσαι..."
];

// ========================================
// SCREEN MANAGEMENT
// ========================================
const screens = {
    welcome: document.getElementById('welcomeScreen'),
    challenge1: document.getElementById('challenge1Screen'),
    challenge2: document.getElementById('challenge2Screen'),
    challenge3: document.getElementById('challenge3Screen'),
    puzzle: document.getElementById('puzzleScreen'),
    letter: document.getElementById('letterScreen')
};

let currentQuestion = 0;

// ========================================
// FLOATING HEARTS BACKGROUND
// ========================================
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💕', '💗', '💖', '💝', '❤️', '💜', '💛'];

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createHeart(container, hearts);
        }, i * 500);
    }

    // Continue creating hearts periodically
    setInterval(() => {
        createHeart(container, hearts);
    }, 2000);
}

function createHeart(container, hearts) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (6 + Math.random() * 4) + 's';
    heart.style.fontSize = (15 + Math.random() * 20) + 'px';
    heart.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(heart);

    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 12000);
}

// ========================================
// NAVIGATION FUNCTIONS
// ========================================
function showScreen(screenId) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    screens[screenId].classList.add('active');
}

function startQuiz() {
    currentQuestion = 0;
    loadQuestion(0);
    showScreen('challenge1');
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion === 1) {
        loadQuestion(1);
        showScreen('challenge2');
    } else if (currentQuestion === 2) {
        loadQuestion(2);
        showScreen('challenge3');
    } else {
        showPuzzle();
    }
}

// ========================================
// MATH PUZZLE
// ========================================
function showPuzzle() {
    showScreen('puzzle');
}

function decodePuzzle() {
    // Highlight variables with staggered animation
    const vars = document.querySelectorAll('.puzzle-card .var');
    vars.forEach((v, i) => {
        setTimeout(() => {
            v.classList.add('highlighted');
        }, i * 200);
    });

    // After highlighting, show decoded message
    setTimeout(() => {
        document.getElementById('decodedMessage').classList.remove('hidden');
        document.getElementById('decodedMessage').classList.add('visible');
        document.getElementById('puzzleNextBtn').classList.add('visible');
        document.querySelector('.decode-btn').style.display = 'none';
        createCelebrationHearts();
    }, vars.length * 200 + 500);
}

function showLetter() {
    showScreen('letter');
}

// ========================================
// QUIZ LOGIC
// ========================================
function loadQuestion(index) {
    const data = quizData[index];
    const questionNum = index + 1;

    // Set question text
    document.getElementById(`question${questionNum}Text`).textContent = data.question;

    // Create answer buttons
    const container = document.getElementById(`answers${questionNum}Container`);
    container.innerHTML = '';

    data.answers.forEach((answer, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer;
        btn.onclick = () => checkAnswer(index, i, btn);
        container.appendChild(btn);
    });

    // Add next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn next-btn';
    nextBtn.innerHTML = '<span>Επόμενο</span> <span class="btn-heart">→</span>';
    nextBtn.onclick = nextQuestion;
    container.appendChild(nextBtn);

    // Reset feedback
    const feedback = document.getElementById(`feedback${questionNum}`);
    feedback.className = 'feedback';
    feedback.textContent = '';
}

function checkAnswer(questionIndex, answerIndex, button) {
    const data = quizData[questionIndex];
    const questionNum = questionIndex + 1;
    const container = document.getElementById(`answers${questionNum}Container`);
    const feedback = document.getElementById(`feedback${questionNum}`);
    const allAnswerBtns = container.querySelectorAll('.answer-btn');
    const nextBtn = container.querySelector('.next-btn');

    if (answerIndex === data.correctIndex) {
        // Correct answer!
        button.classList.add('correct');
        feedback.textContent = data.correctFeedback;
        feedback.className = 'feedback visible correct';

        // Disable all answer buttons
        allAnswerBtns.forEach(btn => btn.disabled = true);

        // Show letter fragment if available (questions 1 and 2)
        if (questionIndex < letterFragments.length) {
            const fragmentEl = document.getElementById(`fragment${questionNum}`);
            if (fragmentEl) {
                fragmentEl.textContent = letterFragments[questionIndex];
                fragmentEl.classList.add('visible');
            }
        }

        // Show next button
        nextBtn.classList.add('visible');

        // Add celebration effect
        createCelebrationHearts();
    } else {
        // Wrong answer
        button.classList.add('wrong');
        feedback.textContent = "Όχι ακριβώς! Ξαναπροσπάθησε, αγάπη μου! 💭";
        feedback.className = 'feedback visible wrong';

        // Remove wrong class after animation
        setTimeout(() => {
            button.classList.remove('wrong');
            feedback.className = 'feedback';
        }, 1500);
    }
}

function createCelebrationHearts() {
    const hearts = ['💕', '💗', '💖', '💝', '✨', '🌟'];

    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'celebration-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = (20 + Math.random() * 60) + 'vw';
            heart.style.bottom = '20vh';
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 3000);
        }, i * 100);
    }
}

// ========================================
// LOVE LETTER REVEAL
// ========================================
const envelopeContainer = document.getElementById('envelopeContainer');
const envelope = document.getElementById('envelope');
const letterContainer = document.getElementById('letterContainer');

envelopeContainer.addEventListener('click', openEnvelope);

function openEnvelope() {
    // Open envelope flap
    envelope.classList.add('open');

    // After envelope opens, show letter
    setTimeout(() => {
        envelopeContainer.style.display = 'none';
        letterContainer.classList.remove('hidden');
        letterContainer.classList.add('visible');

        // Grand celebration!
        createGrandCelebration();
    }, 800);
}

function createGrandCelebration() {
    const hearts = ['💕', '💗', '💖', '💝', '❤️', '✨', '🌟', '💜', '💛'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'celebration-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.bottom = '0';
            heart.style.fontSize = (20 + Math.random() * 25) + 'px';
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 3000);
        }, i * 150);
    }
}

// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
});
