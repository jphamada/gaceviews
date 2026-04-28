const questions = [
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    question: "¿Cuál es el planeta más grande del sistema solar?",
    options: ["Tierra", "Marte", "Júpiter", "Venus", "Saturno"],
    correctIndex: 2,
  },
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    question: "¿Qué lenguaje se ejecuta directamente en el navegador web?",
    options: ["Python", "Java", "C#", "JavaScript", "PHP"],
    correctIndex: 3,
  },
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    question: "¿Cuántos continentes se reconocen habitualmente en el modelo más usado?",
    options: ["5", "6", "7", "8", "9"],
    correctIndex: 2,
  },
  {
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
    question: "¿Cuál de estas obras fue escrita por Gabriel García Márquez?",
    options: [
      "Rayuela",
      "Cien años de soledad",
      "Ficciones",
      "La tregua",
      "Pedro Páramo",
    ],
    correctIndex: 1,
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    question: "¿Qué etiqueta HTML se usa para enlazar un archivo JavaScript externo?",
    options: ["<style>", "<script>", "<link>", "<meta>", "<section>"],
    correctIndex: 1,
  },
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
