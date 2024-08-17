
document.addEventListener('DOMContentLoaded', () => {
    const submitAnswersBtn = document.getElementById('submitBtn');
    const questionnaireContainer = document.getElementById('questionnaire-container');
    const answered = false;
    const questions = [
        {
            question: "What would you rather work as?",
            choices: ["cop", "slaughterer", "ticket inspector", "ordnungsamt"],
            answer: "cop"
        },
        {
            question: "It's easy to embarrass me.",
            choices: ["true", "somewhat true", "somewhat false", "false"],
            answer: "false"                                                                      // maybe add a less visible option greyed out  
        },
        {
            question: "If you had to abandon one of the following traits forever for yourself, which one would it be?",
            choices: ["empathy", "resilience", "intelligence", "creativity", "courage"],
            answer: ""                                                                                      // maybe add option to give a score++ if one choses nothing
        },       
        {
            question: "The israeli + international hostages kept captive in Gaza are fair play since there are thousands of palestinian hostages in israeli prisons.",
            choices: ["true", "somewhat true", "somewhat false", "false"],
            answer: "false"
        },                                                                                                
        {
            question: "Who are you putting that O2 mask on first?",
            choices: ["myself", "my kid", "grandma with shortness of breath", "my elderly mom"],
            answer: "myself"
        },
        {
            question: "How long ago did you cry?",
            choices: ["< 10 days ago", "10-30 days ago", "few months ago", "few years ago", "long time ago"],
            answer: "weeks"
        },
        {
            question: "I don’t mind if someone I dislike gets hurt",
            choices: ["true", "somewhat true", "somewhat false", "false"],
            answer: "somewhat false"
        },
        {
            question: "Loyalty or honesty?",
            choices: ["loyalty", "honesty", "neither"],
            answer: "loyalty"
        },
        {
            question: "I have no strong desire to parachute out of an airplane.",
            choices: ["true", "somewhat true", "somewhat false", "false"],
            answer: "somewhat false"
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
            question: "Is NATO escalating the UKR-RUS war?",
            choices: ["Yes", "No"],
            answer: "No"
        },
        {
            question: "People often abuse my trust.",
            choices: ["true", "somewhat true", "somewhat false", "false"],
            answer: "somewhat true"
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
            questionDiv.id = `question${index}`; 
    
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
        let allAnswered = true;

        questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="question${index}"]:checked`);
            const questionElement = document.getElementById(`question${index}`);

            if (selected && selected.value === q.answer) {
                score++;
            }

            if (!selected) {
                allAnswered = false;
                questionElement.classList.add('unanswered');
            } else {
                questionElement.classList.remove('unanswered');
            }
        });

        if (!allAnswered) {
            alert('Please answer all questions');
            return null; 
        }
    }
    
        submitAnswersBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            const score = calculateScore();
            if (score !== null) { 
                const resultDiv = document.getElementById('result');
                resultDiv.innerText = `Your score is: ${score} / ${questions.length}`;
                window.location.href = 'revelation.html';
            }
        });

    createQuestionnaire();
});