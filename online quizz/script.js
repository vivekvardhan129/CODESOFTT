document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const homeScreen = document.getElementById('home');
  const createScreen = document.getElementById('create');
  const quizListScreen = document.getElementById('quiz-list');
  const takeScreen = document.getElementById('take');
  const quizResultsScreen = document.getElementById('quiz-results');

  const createQuizBtn = document.getElementById('createQuizBtn');
  const takeQuizBtn = document.getElementById('takeQuizBtn');
  const addQuestionBtn = document.getElementById('addQuestionBtn');
  const quizForm = document.getElementById('quizForm');
  const questionsContainer = document.getElementById('questionsContainer');
  const quizzesContainer = document.getElementById('quizzes-container');
  const quizDisplay = document.getElementById('quizDisplay');
  const submitQuizBtn = document.getElementById('submitQuizBtn');
  const resultDiv = document.getElementById('result');
  const scoreDiv = document.getElementById('score');
  const correctAnswersDiv = document.getElementById('correct-answers');
  const resultButtonsDiv = document.getElementById('result-buttons');

  // Quiz state
  let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
  let currentQuiz = null;
  let currentQuizIndex = -1;

  // Show a screen and hide others
  function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    screen.classList.remove('hidden');
  }
   // Handle back/forward navigation
  window.addEventListener('popstate', function (event) {
    const state = event.state;
    if (state && state.screen) {
      const screen = document.getElementById(state.screen);
      if (screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
        screen.classList.remove('hidden');
        // Special cases
        if (state.screen === 'quiz-list') renderQuizList();
        if (state.screen === 'take' && currentQuiz) renderQuiz();
      }
    }
  });
  // Handle initial page load
  window.addEventListener('load', function () {
    const hash = window.location.hash.substring(1);
    const screen = document.getElementById(hash) || document.getElementById('home');
    showScreen(screen);
    if (hash === 'quiz-list') renderQuizList();
  });

  // Home screen buttons
  createQuizBtn.addEventListener('click', () => {
    questionsContainer.innerHTML = '';
    addQuestion();
    showScreen(createScreen);
  });

  takeQuizBtn.addEventListener('click', () => {
    renderQuizList();
    showScreen(quizListScreen);
  });

  // Quiz creation
  addQuestionBtn.addEventListener('click', addQuestion);

  function addQuestion() {
    const questionIndex = document.querySelectorAll('.question').length;
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `
      <input type="text" placeholder="Question" class="question-text" required>
      <input type="text" placeholder="Option 1" class="option" required>
      <input type="text" placeholder="Option 2" class="option" required>
      <input type="text" placeholder="Option 3" class="option" required>
      <input type="text" placeholder="Option 4" class="option" required>
      <select class="correct-answer">
        <option value="0">Option 1</option>
        <option value="1">Option 2</option>
        <option value="2">Option 3</option>
        <option value="3">Option 4</option>
      </select>
      <button type="button" class="remove-question">Remove</button>
    `;
    questionsContainer.appendChild(questionDiv);
    questionDiv.querySelector('.remove-question').addEventListener('click', () => {
      questionDiv.remove();
    });
  }

  quizForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const quizName = prompt('Enter quiz name:');
    if (!quizName) return;

    const questions = Array.from(document.querySelectorAll('.question')).map(q => {
      const options = Array.from(q.querySelectorAll('.option')).map(o => o.value);
      const correct = parseInt(q.querySelector('.correct-answer').value);
      return {
        text: q.querySelector('.question-text').value,
        options,
        correct
      };
    });

    const quiz = {
      name: quizName,
      questions
    };

    quizzes.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    alert('Quiz saved successfully!');
    showScreen(homeScreen);
  });

  // Quiz listing
  function renderQuizList() {
    quizzesContainer.innerHTML = '';
    quizzes.forEach((quiz, index) => {
      const quizDiv = document.createElement('div');
      quizDiv.className = 'quiz-item';
      quizDiv.innerHTML = `
        <h3>${quiz.name}</h3>
        <button class="take-quiz" data-index="${index}">Take Quiz</button>
        <button class="delete-quiz" data-index="${index}">Delete Quiz</button>
      `;
      quizzesContainer.appendChild(quizDiv);
    });
  }

  // Quiz taking
  function renderQuiz() {
    quizDisplay.innerHTML = '';
    currentQuiz.questions.forEach((q, qIndex) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'quiz-question';
      qDiv.innerHTML = `<h4>${qIndex + 1}. ${q.text}</h4>`;
      q.options.forEach((opt, oIndex) => {
        qDiv.innerHTML += `
          <label>
            <input type="radio" name="q${qIndex}" value="${oIndex}">
            ${opt}
          </label><br>
        `;
      });
      quizDisplay.appendChild(qDiv);
    });
  }

  submitQuizBtn.addEventListener('click', () => {
    const userAnswers = [];
    let allAnswered = true;

    currentQuiz.questions.forEach((q, qIndex) => {
      const selected = document.querySelector(`input[name="q${qIndex}"]:checked`);
      if (selected) {
        userAnswers.push(parseInt(selected.value));
      } else {
        allAnswered = false;
      }
    });

    if (!allAnswered) {
      alert('Please answer all questions!');
      return;
    }

    let score = 0;
    const correct = [];
    currentQuiz.questions.forEach((q, qIndex) => {
      if (userAnswers[qIndex] === q.correct) {
        score++;
        correct.push(true);
      } else {
        correct.push(false);
      }
    });

    // Show results
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `You scored ${score} out of ${currentQuiz.questions.length}`;

    // Detailed results
    correctAnswersDiv.innerHTML = '<h3>Correct Answers:</h3>';
    currentQuiz.questions.forEach((q, qIndex) => {
      correctAnswersDiv.innerHTML += `
        <p><strong>${q.text}</strong><br>
        Correct: ${q.options[q.correct]}<br>
        Your answer: ${q.options[userAnswers[qIndex]]} (${correct[qIndex] ? '✔️' : '❌'})</p>
      `;
    });

    // Buttons to retake or go home
    resultButtonsDiv.innerHTML = `
      <button id="retakeQuizBtn">Retake Quiz</button>
      <button id="homeBtn">Back to Home</button>
    `;

    showScreen(quizResultsScreen);
  });

  // Event delegation for all dynamic buttons
  document.addEventListener('click', function (e) {
    // Take Quiz button
    if (e.target && e.target.classList.contains('take-quiz')) {
      const index = parseInt(e.target.getAttribute('data-index'));
      currentQuiz = quizzes[index];
      currentQuizIndex = index;
      renderQuiz();
      showScreen(takeScreen);
    }
    // Delete Quiz button
    if (e.target && e.target.classList.contains('delete-quiz')) {
      if (confirm('Are you sure you want to delete this quiz?')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        quizzes.splice(index, 1);
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
        renderQuizList();
      }
    }
    // Retake Quiz button
    if (e.target && e.target.id === 'retakeQuizBtn') {
      renderQuiz();
      resultDiv.classList.add('hidden');
      showScreen(takeScreen);
    }
    // Home button
    if (e.target && e.target.id === 'homeBtn') {
      showScreen(homeScreen);
    }
  });
});
