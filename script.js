// QUIZ DATA (20 QUESTIONS)
const quiz = [
  { question: "What is 5 + 3?", answers: [6, 8, 10], correct: 8 },
  { question: "What is 10 - 4?", answers: [6, 5, 7], correct: 6 },
  { question: "What is 3 × 3?", answers: [6, 9, 12], correct: 9 },
  { question: "What is 12 ÷ 4?", answers: [2, 3, 4], correct: 3 },
  { question: "What is 7 + 6?", answers: [11, 13, 14], correct: 13 },
  { question: "What is 9 - 2?", answers: [6, 7, 8], correct: 7 },
  { question: "What is 6 × 2?", answers: [10, 12, 14], correct: 12 },
  { question: "What is 15 ÷ 3?", answers: [4, 5, 6], correct: 5 },
  { question: "What is 8 + 5?", answers: [12, 13, 14], correct: 13 },
  { question: "What is 14 - 7?", answers: [6, 7, 8], correct: 7 },
  { question: "What is 4 × 5?", answers: [20, 15, 25], correct: 20 },
  { question: "What is 18 ÷ 2?", answers: [8, 9, 10], correct: 9 },
  { question: "What is 11 + 9?", answers: [18, 19, 20], correct: 20 },
  { question: "What is 16 - 8?", answers: [6, 8, 10], correct: 8 },
  { question: "What is 7 × 3?", answers: [20, 21, 24], correct: 21 },
  { question: "What is 20 ÷ 5?", answers: [2, 4, 5], correct: 4 },
  { question: "What is 13 + 6?", answers: [18, 19, 20], correct: 19 },
  { question: "What is 17 - 9?", answers: [7, 8, 9], correct: 8 },
  { question: "What is 9 × 2?", answers: [16, 18, 20], correct: 18 },
  { question: "What is 21 ÷ 7?", answers: [2, 3, 4], correct: 3 }
];

// 🔀 SHUFFLE QUESTIONS
quiz.sort(() => Math.random() - 0.5);

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

// LOAD QUESTION
function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;

  const q = quiz[currentQuestion];
  document.getElementById("questionText").textContent = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(answer);
    answersDiv.appendChild(btn);
  });

  startTimer();
}

// TIMER FUNCTION
function startTimer() {
  const timerDisplay = document.getElementById("timer");

  timerDisplay.textContent = "⏱️ Time: " + timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = "⏱️ Time: " + timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

// CHECK ANSWER
function checkAnswer(answer) {
  clearInterval(timer);

  const result = document.getElementById("quizResult");

  if (answer === quiz[currentQuestion].correct) {
    result.textContent = "✅ Correct!";
    score++;
  } else {
    result.textContent = "❌ Wrong!";
  }

  setTimeout(nextQuestion, 1000);
}

// NEXT QUESTION
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quiz.length) {
    loadQuestion();
  } else {
    document.getElementById("questionText").textContent = "🎉 Quiz Finished!";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("quizResult").textContent = "";
    document.getElementById("timer").textContent = "";
    document.getElementById("score").textContent =
      "Your Score: " + score + "/" + quiz.length;
  }
}

// MATH SOLVER
function solveMath() {
  const input = document.getElementById("mathInput").value;
  const result = document.getElementById("mathResult");

  try {
    const answer = eval(input);
    result.textContent = "Answer: " + answer;
  } catch {
    result.textContent = "Invalid expression!";
  }
}

// ASK QUESTION
function addQuestion() {
  const input = document.getElementById("questionInput");
  const list = document.getElementById("questionList");

  if (input.value.trim() === "") return;

  const li = document.createElement("li");
  li.textContent = input.value;
  list.appendChild(li);

  input.value = "";
}

// DARK MODE
function toggleMode() {
  document.body.classList.toggle("light-mode");
}

// START
loadQuestion();