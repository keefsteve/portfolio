
document.addEventListener('DOMContentLoaded', () => {
    const submitAnswersBtn = document.getElementById('submitBtn');
    const questionnaireContainer = document.getElementById('questionnaire-container');
    const questions = [
        {
            question: "What would you rather work as?",
            choices: ["cop", "slaughterer", "ticket inspector", "ordnungsamt"],
            answer: "cop"
        },
        {
            question: "What trait is most pronounced in your persona?",
            choices: ["empathy", "determination", "intelligence", "creativity"],
            answer: "determination"
        },
        {
            question: "Who are you putting that O2 mask on first?",
            choices: ["myself", "my kid", "grandma with shortness of breath", "my elderly mom"],
            answer: "myself"
        },
        {
            question: "How long ago did you cry?",
            choices: ["days", "weeks", "months", "years"],
            answer: "weeks"
        },
        {
            question: "Loyalty or honesty?",
            choices: ["loyalty", "honesty", "neither", "both"],
            answer: "both"
        },
        {
            question: "How often do you consume alcohol?",
            choices: ["never", "rarely", "sometimes", "often"],
            answer: "rarely"
        },
        {
            question: "How often do you consume psychocative drugs?",
            choices: ["never", "rarely", "sometimes", "often"],
            answer: "sometimes"
        },
        {
            question: "Money or Luck?",
            choices: ["Money", "Luck"],
            answer: "Luck"
        },
    ];

    function createQuestionnaire() {
        const questionnaireDiv = document.getElementById('questionnaire');
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
    
            const questionText = document.createElement('p');
            questionText.innerText = q.question;
            questionDiv.appendChild(questionText);
    
            q.choices.forEach(choice => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question${index}`;
                input.value = choice;
                label.appendChild(input);
                label.appendChild(document.createTextNode(choice));
                questionDiv.appendChild(label);
                questionDiv.appendChild(document.createElement('br'));
            });
    
            questionnaireDiv.appendChild(questionDiv);
        });
    }
    
    function calculateScore() {
        let score = 0;
        questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="question${index}"]:checked`);
            if (selected && selected.value === q.answer) {
                score++;
            }
        });
        return score;
    }
    
    if (submitAnswersBtn) {
        submitAnswersBtn.addEventListener('click', () => {
            const score = calculateScore();
            const resultDiv = document.getElementById('result');
            resultDiv.innerText = `Your score is: ${score} / ${questions.length}`;
            window.location.href = 'revelation.html';
        });
    }

    createQuestionnaire();
});