const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: " 1: What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
      { text: "222", correct: false },
      { text: "2222", correct: false },
    ],
  },
  {
    question: " 2: What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "HighText Machine Language", correct: false },
      { text: "HyperText Machine Language", correct: false },
      { text: "HighText Markup Language", correct: false },
    ],
  },
  {
    question: " 3: Which property is used to change the background color?",
    answers: [
      { text: "color", correct: false },
      { text: "bgColor", correct: false },
      { text: "background-color", correct: true },
      { text: "background", correct: false },
    ],
  },
  {
    question: " 4: Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
      { text: "<scripting>", correct: false },
    ],
  },
  {
    question: " 5: What is JavaScript?",
    answers: [
      { text: "A programming language", correct: true },
      { text: "A database management system", correct: false },
      { text: "A markup language", correct: false },
      { text: "An operating system", correct: false },
    ],
  },
  {
    question: " 6: What is the purpose of the typeof operator in JavaScript?",
    answers: [
      { text: "To check the data type of a variable", correct: true },
      { text: "To create a new variable", correct: false },
      { text: "To concatenate strings", correct: false },
      { text: "To define a function", correct: false },
    ],
  },
  {
    question: " 7: How do you declare a variable in JavaScript? ",
    answers: [
      { text: "var", correct: true },
      { text: "variable", correct: false },
      { text: "v", correct: false },
      { text: "let", correct: false },
    ],
  },
  {
    question: " 8: What does the === operator in JavaScript do ",
    answers: [
      { text: "Compares values for equality without type coercion", correct: true },
      { text: "Assigns a value to a variable", correct: false },
      { text: " Checks if a variable is defined", correct: false },
      { text: "Performs bitwise XOR operation", correct: false },
    ],
  },
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}