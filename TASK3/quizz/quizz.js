const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Mark Twain", "Charles Dickens", "William Shakespeare", "Jane Austen"],
        correct: 2
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
        correct: 1
    },
];

let currentQuestionIndex = 0;
let score = 0;
let wrong = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const resultDiv = document.getElementById("result");
const submitBtn = document.querySelector(".btn");

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="q" value="${index}"> ${option}`;
        optionsContainer.appendChild(label);
    });
}

function submitAnswer() {
    const selected = document.querySelector('input[name="q"]:checked');
    if (!selected) {
        alert("Please select an answer!");
        return;
    }

    const answer = parseInt(selected.value);
    if (answer === quizData[currentQuestionIndex].correct) {
        score++;
    } else {
        wrong++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    questionText.textContent = "Quiz Completed ✅";
    optionsContainer.innerHTML = "";
    submitBtn.style.display = "none"; // Hide submit button
    resultDiv.innerHTML = `
        <p>Correct Answers: <strong>${score}</strong></p>
        <p>Incorrect Answers: <strong>${wrong}</strong></p>
        <p>Total Score: <strong>${score}/${quizData.length}</strong></p>
    `;
}

// Load the first question on page load
loadQuestion();
