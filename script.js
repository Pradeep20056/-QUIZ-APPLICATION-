const API_URL = "https://opentdb.com/api.php?amount=1&type=multiple"; // Fetches one random question

let score = 0;

async function fetchQuestion() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayQuestion(data.results[0]);
    } catch (error) {
        console.error("Error fetching question:", error);
        document.getElementById("question").textContent = "Failed to load question. Try again!";
    }
}

function displayQuestion(data) {
    document.getElementById("question").textContent = data.question;

    let options = [...data.incorrect_answers, data.correct_answer];
    options.sort(() => Math.random() - 0.5); // Shuffle options

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    options.forEach(option => {
        let button = document.createElement("button");
        button.innerHTML = option;
        button.classList.add("option-btn", "slide-in");
        button.onclick = () => checkAnswer(option, data.correct_answer);
        optionsDiv.appendChild(button);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("next").style.display = "none";
}

function checkAnswer(selected, correct) {
    let feedback = document.getElementById("feedback");
    if (selected === correct) {
        feedback.textContent = "Correct! 🎉";
        feedback.style.color = "green";
        score++;
    } else {
        feedback.textContent = `Wrong! 😢 The correct answer was ${correct}.`;
        feedback.style.color = "red";
    }

    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("next").style.display = "block";
}

document.getElementById("next").addEventListener("click", fetchQuestion);

// Load the first question
fetchQuestion();
