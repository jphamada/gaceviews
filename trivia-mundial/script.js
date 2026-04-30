const questions = [
    {
        image: "images/02.jpg",
        question: "¿Qué selección fue la primera en ganar dos Mundiales consecutivos?",
        options: ["Brasil", "Italia", "Alemania", "Uruguay"],
        correctIndex: 1,
    },
    {
        image: "images/03.jpg",
        question: "¿En qué Mundial se implementaron por primera vez las tarjetas amarilla y roja?",
        options: ["México 1970", "Inglaterra 1966", "Alemania 1974", "España 1982"],
        correctIndex: 0,
    },
    {
        image: "images/04.jpg",
        question: "¿Qué jugador argentino fue el máximo goleador del Mundial 1978?",
        options: ["Mario Kempes", "Leopoldo Luque", "Daniel Bertoni", "Osvaldo Ardiles"],
        correctIndex: 0,
    },
    {
        image: "images/05.jpg",
        question: "¿Cuál fue la única selección africana que llegó a semifinales de un Mundial hasta 2022?",
        options: ["Nigeria", "Senegal", "Ghana", "Marruecos"],
        correctIndex: 3,
    },
    {
        image: "images/06.jpg",
        question: "¿Qué selección eliminó a Argentina en el Mundial 2002 en fase de grupos?",
        options: ["Inglaterra", "Suecia", "Nigeria", "Dinamarca"],
        correctIndex: 1,
    },
    {
        image: "images/07.jpg",
        question: "¿Quién fue el goleador del Mundial 1998?",
        options: ["Ronaldo", "Davor Šuker", "Zinedine Zidane", "Gabriel Batistuta"],
        correctIndex: 1,
    },
    {
        image: "images/08.jpg",
        question: "¿En qué Mundial se jugó la final conocida como el “Maracanazo”?",
        options: ["1930", "1950", "1954", "1962"],
        correctIndex: 1,
    },
    {
        image: "images/09.jpg",
        question: "¿Qué arquero fue figura en la tanda de penales de Argentina ante Países Bajos en Qatar 2022?",
        options: ["Sergio Romero", "Emiliano Martínez", "Franco Armani", "Willy Caballero"],
        correctIndex: 1,
    },
    {
        image: "images/10.jpg",
        question: "¿Qué selección ganó el Mundial de 1954, conocido como el “Milagro de Berna”?",
        options: ["Hungría", "Alemania Federal", "Austria", "Suiza"],
        correctIndex: 1,
    },
    {
        image: "images/11.jpg",
        question: "¿Quién fue el técnico de Argentina campeón en 1986?",
        options: ["César Luis Menotti", "Alfio Basile", "Carlos Bilardo", "Marcelo Bielsa"],
        correctIndex: 2,
    },
    {
        image: "images/12.jpg",
        question: "¿Qué selección europea ganó su primer Mundial en 2010?",
        options: ["Países Bajos", "España", "Portugal", "Inglaterra"],
        correctIndex: 1,
    },
    {
        image: "images/13.jpg",
        question: "¿Qué país organizó el Mundial de 1986 tras la renuncia de Colombia?",
        options: ["Brasil", "Estados Unidos", "México", "Argentina"],
        correctIndex: 2,
    },
    {
        image: "images/14.jpg",
        question: "¿Qué jugador argentino convirtió el gol más rápido de la historia de los Mundiales?",
        options: ["Diego Maradona", "Claudio Caniggia", "Gabriel Batistuta", "(Ninguno, no es argentino)"],
        correctIndex: 3,
    },
    {
        image: "images/15.jpg",
        question: "¿Qué selección fue la primera en ganar un Mundial fuera de su continente?",
        options: ["Brasil", "Alemania", "Argentina", "España"],
        correctIndex: 0,
    },
    {
        image: "images/16.jpg",
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
const startHeroImage = document.querySelector("#start-screen .hero-image img");
const endHeroImage = document.querySelector("#end-screen .hero-image img");

startHeroImage.src = "images/01.jpg";
endHeroImage.src = "images/01.jpg";

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
