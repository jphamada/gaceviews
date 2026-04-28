const questions = [
    {
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        question: "¿Qué selección fue la primera en ganar dos Mundiales consecutivos?",
        options: ["Brasil", "Italia", "Alemania", "Uruguay"],
        correctIndex: 1,
    },
    {
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
        question: "¿En qué Mundial se implementaron por primera vez las tarjetas amarilla y roja?",
        options: ["México 1970", "Inglaterra 1966", "Alemania 1974", "España 1982"],
        correctIndex: 0,
    },
    {
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
        question: "¿Qué jugador argentino fue el máximo goleador del Mundial 1978?",
        options: ["Mario Kempes", "Leopoldo Luque", "Daniel Bertoni", "Osvaldo Ardiles"],
        correctIndex: 0,
    },
    {
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
        question: "¿Cuál fue la única selección africana que llegó a semifinales de un Mundial hasta 2022?",
        options: ["Nigeria", "Senegal", "Ghana", "Marruecos"],
        correctIndex: 3,
    },
    {
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        question: "¿Qué selección eliminó a Argentina en el Mundial 2002 en fase de grupos?",
        options: ["Inglaterra", "Suecia", "Nigeria", "Dinamarca"],
        correctIndex: 1,
    },
    {
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        question: "¿Quién fue el goleador del Mundial 1998?",
        options: ["Ronaldo", "Davor Šuker", "Zinedine Zidane", "Gabriel Batistuta"],
        correctIndex: 1,
    },
    {
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
        question: "¿En qué Mundial se jugó la final conocida como el “Maracanazo”?",
        options: ["1930", "1950", "1954", "1962"],
        correctIndex: 1,
    },
    {
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
        question: "¿Qué arquero fue figura en la tanda de penales de Argentina ante Países Bajos en Qatar 2022?",
        options: ["Sergio Romero", "Emiliano Martínez", "Franco Armani", "Willy Caballero"],
        correctIndex: 1,
    },
    {
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
        question: "¿Qué selección ganó el Mundial de 1954, conocido como el “Milagro de Berna”?",
        options: ["Hungría", "Alemania Federal", "Austria", "Suiza"],
        correctIndex: 1,
    },
    {
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        question: "¿Quién fue el técnico de Argentina campeón en 1986?",
        options: ["César Luis Menotti", "Alfio Basile", "Carlos Bilardo", "Marcelo Bielsa"],
        correctIndex: 2,
    },
    {
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        question: "¿Qué selección europea ganó su primer Mundial recién en 2010?",
        options: ["Países Bajos", "España", "Portugal", "Inglaterra"],
        correctIndex: 1,
    },
    {
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
        question: "¿Qué país organizó el Mundial de 1986 tras la renuncia de Colombia?",
        options: ["Brasil", "Estados Unidos", "México", "Argentina"],
        correctIndex: 2,
    },
    {
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
        question: "¿Qué jugador argentino convirtió el gol más rápido de la historia de los Mundiales?",
        options: ["Diego Maradona", "Claudio Caniggia", "Gabriel Batistuta", "(Ninguno, no es argentino)"],
        correctIndex: 3,
    },
    {
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
        question: "¿Qué selección fue la primera en ganar un Mundial fuera de su continente?",
        options: ["Brasil", "Alemania", "Argentina", "España"],
        correctIndex: 0,
    },
    {
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        question: "¿Qué país fue campeón del Mundial de 1990?",
        options: ["Argentina", "Alemania Federal", "Italia", "Brasil"],
        correctIndex: 1,
    }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const progressLabel = document.getElementById("progress-label");
const progressFill = document.getElementById("progress-fill");
const feedback = document.getElementById("feedback");
const scoreChip = document.getElementById("score-chip");
const finalScore = document.getElementById("final-score");
const quizHeroImage = document.querySelector("#quiz-screen .hero-image img");

let currentQuestionIndex = 0;
let score = 0;
let isLocked = false;

function showScreen(screen) {
    [startScreen, quizScreen, endScreen].forEach((section) => {
        section.classList.remove("screen--active");
    });
    screen.classList.add("screen--active");
}

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    isLocked = false;
    scoreChip.textContent = `Aciertos: ${score}`;
    feedback.textContent = "";
    feedback.className = "feedback";
    showScreen(quizScreen);
    renderQuestion();
}

function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

    progressLabel.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
    progressFill.style.width = `${progressPercent}%`;
    questionText.textContent = currentQuestion.question;
    quizHeroImage.src = currentQuestion.image;
    optionsContainer.innerHTML = "";
    feedback.textContent = "";
    feedback.className = "feedback";
    isLocked = false;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "option-btn";
        button.textContent = option;
        button.addEventListener("click", () => handleAnswer(index, button));
        optionsContainer.appendChild(button);
    });
}

function handleAnswer(selectedIndex, selectedButton) {
    if (isLocked) {
        return;
    }

    isLocked = true;

    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = Array.from(document.querySelectorAll(".option-btn"));
    const isCorrect = selectedIndex === currentQuestion.correctIndex;

    optionButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === currentQuestion.correctIndex) {
            button.classList.add("is-correct");
        }
    });

    if (isCorrect) {
        score += 1;
        selectedButton.classList.add("is-correct");
        feedback.textContent = "Correcta. Sumaste un punto.";
        feedback.classList.add("success");
    } else {
        selectedButton.classList.add("is-wrong");
        feedback.textContent = "Incorrecta. La opción correcta quedó marcada.";
        feedback.classList.add("error");
    }

    scoreChip.textContent = `Aciertos: ${score}`;

    window.setTimeout(() => {
        currentQuestionIndex += 1;

        if (currentQuestionIndex < questions.length) {
            renderQuestion();
            return;
        }

        renderFinalScreen();
    }, 1300);
}

function renderFinalScreen() {
    finalScore.textContent = `Acertaste ${score} de ${questions.length} preguntas.`;
    showScreen(endScreen);
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
