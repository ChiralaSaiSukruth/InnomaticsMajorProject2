const questions = [
    {
        question: "What is wireframing?",
        answers: [
            { text: "A basic, two-dimensional visual representation of a web page, app interface, or product layout", correct: true },
            { text: "low-fi", correct: false },
            { text: "high-fi", correct: false },
            { text: "none of the above", correct: false }
        ]
    },
    {
        question: "What is UI?",
        answers: [
            { text: "User Interface", correct: true },
            { text: "User Experience", correct: false },
            { text: "high-fi", correct: false },
            { text: "none of the above", correct: false }
        ]
    },
    {
        question: "What is UX?",
        answers: [
            { text: "User Interface", correct: false },
            { text: "User Experience", correct: true },
            { text: "high-fi", correct: false },
            { text: "none of the above", correct: false }
        ]
    },
    {
        question: "What is the full form of DT?",
        answers: [
            { text: "Design Thinking", correct: true },
            { text: "Design Technology", correct: true },
            { text: "Design Principle", correct: false },
            { text: "all the above", correct: false }
        ]
    },
    {
        question: "What is HTML?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Design Text Markup Language", correct: false },
            { text: "Cascading Style Sheet", correct: false },
            { text: "JavaScript", correct: false }
        ]
    },
    {
        question: "What is CSS?",
        answers: [
            { text: "Hyper Text Markup Language", correct: false },
            { text: "Design Text Markup Language", correct: false },
            { text: "Cascading Style Sheet", correct: true },
            { text: "JavaScript", correct: false }
        ]
    },
    {
        question: "Which tools are better to create low-fidelity design?",
        answers: [
            { text: "Paper & Pens", correct: true },
            { text: "Figma", correct: true },
            { text: "Figma & Miro", correct: true },
            { text: "VS Studio", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
