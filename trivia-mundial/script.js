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
        question: "¿Qué selección europea ganó su primer Mundial recién en 2010?",
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
const loseScreen = document.getElementById("lose-screen");
const winScreen = document.getElementById("win-screen");
const successScreen = document.getElementById("success-screen");
const startButton = document.getElementById("start-button");
const restartButtonLose = document.querySelector("#lose-screen #restart-button");
const restartButtonSuccess = document.getElementById("restart-button-success");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const progressLabel = document.getElementById("progress-label");
const progressFill = document.getElementById("progress-fill");
const feedback = document.getElementById("feedback");
const scoreChip = document.getElementById("score-chip");
const loseScore = document.getElementById("lose-score");
const quizHeroImage = document.querySelector("#quiz-screen .hero-image img");
const startHeroImage = document.querySelector("#start-screen .hero-image img");
const loseHeroImage = document.querySelector("#lose-screen .hero-image img");
const winHeroImage = document.querySelector("#win-screen .hero-image img");
const successHeroImage = document.querySelector("#success-screen .hero-image img");
const sorteoForm = document.getElementById("sorteo-form");

startHeroImage.src = "images/01.jpg";
loseHeroImage.src = "images/01.jpg";
winHeroImage.src = "images/01.jpg";
successHeroImage.src = "images/01.jpg";

let currentQuestionIndex = 0;
let score = 0;
let isLocked = false;

function showScreen(screen) {
    [startScreen, quizScreen, loseScreen, winScreen, successScreen].forEach((section) => {
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
    if (score === questions.length) {
        showScreen(winScreen);
    } else {
        loseScore.textContent = `Acertaste ${score} de ${questions.length} preguntas.`;
        showScreen(loseScreen);
    }
}

startButton.addEventListener("click", startGame);
restartButtonLose.addEventListener("click", startGame);
restartButtonSuccess.addEventListener("click", startGame);

sorteoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById("submit-sorteo");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;

    try {
        const response = await fetch('/api/sorteo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email, telefono })
        });

        if (!response.ok) {
            console.error("Error en la respuesta del servidor:", response.status);
            alert("Hubo un error al enviar tus datos. Por favor, intentá nuevamente.");
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }

        const data = await response.json();

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        sorteoForm.reset();
        showScreen(successScreen);

    } catch (error) {
        console.error("Error de red:", error);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert("No se pudo conectar con el servidor. Por favor, intentá nuevamente.");
    }
});