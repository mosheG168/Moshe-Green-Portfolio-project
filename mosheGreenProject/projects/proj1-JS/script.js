let question = "";
        const questionElement = document.querySelector('#question');
        const answerContainerElement = document.querySelector('#answerContainer');
        let answerInputElement = document.querySelector('#answer');
        const feedbackElement = document.querySelector('#feedback');
        const btn = document.querySelector('#btn');
        const topicsDropdown = document.querySelector('#topics');
        const startBtn = document.querySelector('#startBtn');
        const backBtn = document.querySelector('#backBtn');
        const topicSelection = document.querySelector('#topic-selection');
        const quizContainer = document.querySelector('#quiz');

        let currentAnswer = [];
        let count = 0;
        const scoreElement = document.querySelector('#score');
        let selectedTopic = "simpleArithmetic";

    function generateQuestion() {
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;

        if (selectedTopic === "quadraticFunctions") {
            generateQuadraticQuestion();
        } else if (selectedTopic === "simpleArithmetic") {
            generateArithmeticQuestion(num1, num2);
        } else if (selectedTopic === "exponentsAndRoots") {
            generateExponentsAndRootsQuestion(num1, num2);
        }

        questionElement.textContent = `Solve: ${question}`;
    }

    function generateQuadraticQuestion() {
        let a, b, c, root1, root2;
        do {
            root1 = Math.floor(Math.random() * 10) - 5;
            root2 = Math.floor(Math.random() * 10) - 5;
            a = Math.floor(Math.random() * 5) + 1;
            b = -a * (root1 + root2);
            c = a * root1 * root2;
        } while (root1 === root2);

        question = `${a}x² + ${b}x + ${c} = 0`;
        currentAnswer = [root1.toFixed(0), root2.toFixed(0), `${root1}/1`, `${root2}/1`];

        answerContainerElement.innerHTML = `
            <label for="x1">x₁ =</label>
            <input type="text" id="x1" placeholder="Enter x₁">
            <label for="x2">x₂ =</label>
            <input type="text" id="x2" placeholder="Enter x₂">
        `;
    }

    function generateArithmeticQuestion(num1, num2) {
        const operations = ['+', '-', '*', '/'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        question = `${num1} ${operation} ${num2}`;

        switch (operation) {
            case '+':
                currentAnswer = [String(num1 + num2)];
                break;
            case '-':
                currentAnswer = [String(num1 - num2)];
                break;
            case '*':
                currentAnswer = [String(num1 * num2)];
                break;
            case '/':
                let exactAnswer = num1 / num2; 
                currentAnswer = [exactAnswer.toFixed(2), `${num1}/${num2}`, exactAnswer.toPrecision(3)];
                
                // Add the integer result if applicable
                if (Number.isInteger(num1 / num2)) {
                    currentAnswer.push(String(num1 / num2));
                }

                // Add the simplified fraction form
                let simplifiedFraction = simplifyFraction(num1, num2);
                currentAnswer.push(simplifiedFraction);
                break;
        }

        answerContainer.innerHTML = `
            <label for="answer">Your Answer:</label>
            <input type="text" id="answer" placeholder="Enter your answer">
        `;
        answerInputElement = document.querySelector('#answer');
    }

    function generateExponentsAndRootsQuestion(num1, num2) {
        if (Math.random() < 0.5) {
            // Exponentiation case
            question = `${num1}^${num2}`;
            currentAnswer = [String(Math.pow(num1, num2))];
        } else {
            // Root case (Square roots only)
            num1 = Math.pow(num2, 2); // Ensures perfect square
            question = `√${num1}`;
            currentAnswer = [String(num2)];
        }

        answerContainer.innerHTML = `
            <label for="answer">Your Answer:</label>
            <input type="text" id="answer" placeholder="Enter your answer">
        `;
        answerInputElement = document.querySelector('#answer');
    }

        function simplifyFraction(numerator, denominator) {
            function gcd(a, b) {
                return b ? gcd(b, a % b) : a;
            }
            let divisor = gcd(numerator, denominator);
            return `${numerator / divisor}/${denominator / divisor}`;
        }

        startBtn.addEventListener("click", () => {
            selectedTopic = topicsDropdown.value;
            topicSelection.style.display = "none";
            quizContainer.style.display = "block";
            generateQuestion();
        });

        btn.addEventListener('click', function () {
            if (selectedTopic === "quadraticFunctions") {
                const userX1 = document.querySelector('#x1').value.trim();
                const userX2 = document.querySelector('#x2').value.trim();

                if ((currentAnswer.includes(userX1) && currentAnswer.includes(userX2)) && userX1 !== userX2) {
                    feedbackElement.textContent = "Correct! Moving on...";
                    feedbackElement.className = "correct";
                    count++;
                    scoreElement.textContent = `Correct Answers: ${count}`;
                    generateQuestion();
                } else {
                    feedbackElement.textContent = "Incorrect. Try again!";
                    feedbackElement.className = "incorrect";
                }
            } else {
                const userAnswer = answerInputElement.value.trim();
                if (currentAnswer.includes(userAnswer) || (!isNaN(parseFloat(userAnswer)) && Math.abs(parseFloat(userAnswer) - parseFloat(currentAnswer[0])) < 0.01)) {
                    feedbackElement.textContent = "Correct!";
                    feedbackElement.className = "correct";
                    count++;
                    scoreElement.textContent = `Correct Answers: ${count}`;
                    generateQuestion();
                } else {
                    feedbackElement.textContent = "Incorrect. Try again!";
                    feedbackElement.className = "incorrect";
                }
            }
        });

        backBtn.addEventListener("click", () => {
            topicSelection.style.display = "block";
            quizContainer.style.display = "none";
            count = 0;
            scoreElement.textContent = `Correct Answers: 0`;
            feedbackElement.textContent = '';
            currentAnswer = [];
        });
