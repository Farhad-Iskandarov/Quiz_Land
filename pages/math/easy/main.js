var questions = [
    {
        question: "Which is greater than 4?",
        choices: {
            a: "-4",
            b: "5",
            c: "-5"
        },
        answer: "b"
    },
    {
        question: "What is 1004 divided by 2?",
        choices: {
            a: "52",
            b: "520",
            c: "502"
        },
        answer: "c"
    },
    {
        question: "106 × 106 – 94 × 94 = ?",
        choices: {
            a: "1904",
            b: "2400",
            c: "856"
        },
        answer: "b"
    },
    {
        question: "Subtract 457 from 832 ?",
        choices: {
            a: "375",
            b: "57",
            c: "376"
        },
        answer: "a"
    },
    {
        question: "Solve : 200 – (96 ÷ 4)",
        choices: {
            a: "176",
            b: "26",
            c: "16"
        },
        answer: "a"
    }
];

function quiz(){
    // stores HTML output
    var output = [];

    // build HTML for each question
    questions.forEach((currentQuestion, questionNumber) => {
        // store list of answer choices
        var choices = [];

        // for each answer
        for(letter in currentQuestion.choices) {

            // add HTML radio button
            choices.push(
                // template literals
                `<label><input type="radio" name="question${questionNumber}" value="${letter}">
                    <span class="customRadio"></span>
                        ${letter} :
                        ${currentQuestion.choices[letter]}
                </label>`
            );
        }

        // add this question and answer to output
        output.push(
            `<div class="slide">
                <div class="question">${currentQuestion.question}</div>
                <div class="choices">${choices.join("")}</div>
            </div>`
             // 'join' expression takes list of answers and puts them together in one string
        );
    });
    // combine output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
}

function results(){

    //gather answer containers from quiz
    var answerContainers = quizContainer.querySelectorAll(".choices");

    // keep track of user's answers
    var numCorrect = 0;

    // for each question 
    questions.forEach((currentQuestion, questionNumber) => {
        // find selected answer 
        var answerContainer = answerContainers[questionNumber];
        // selects which radio button has been checked
        var selector = `input[name=question${questionNumber}]:checked`;
        // userAnswer is which button has been checked
        // {} empty object for if user didn't select answer
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if(userAnswer === currentQuestion.answer) {
            // add to number of correct answers
            numCorrect++;

            // green when correct
            answerContainers[questionNumber].style.color = "rgb(0, 88, 4)";
        } else {   
            // red when incorrect
            answerContainers[questionNumber].style.color = "rgb(141, 0, 0)";
        }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `Dear ${localStorage.getItem('name')}, your result is ${numCorrect} out of ${questions.length}`;
}

function showSlide(n) {
    // Hide all slides by removing "active-slide" class from all questions
    slides[currentSlide].classList.remove("active-slide");
    // Show new slide by adding "active-slide" class to current question
    slides[n].classList.add("active-slide");
    // Update the current slide number
    currentSlide = n;

    // First slide - hide previous button - Else show previous button
    if(currentSlide === 0) {
        previousButton.style.display = "none";
    } else {
        previousButton.style.display = "inline-block";
    }

    // Last slide - hide next button and show submit button - Else show next button and hide submit button
    if(currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
    progressPercent += 25;
    progressBar.style.width = progressPercent +  "%";
}

function previousSlide() {
    showSlide(currentSlide - 1);
    progressPercent -= 25;
    progressBar.style.width = progressPercent + "%";
}

var progressBar = document.getElementById("progress-bar");
var progressPercent = 0;

var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");

//display quiz 
quiz();

var previousButton = document.getElementById("previous");
var nextButton = document.getElementById("next");
var slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// Display Slides
showSlide(0);

// click submit, show results
submitButton.addEventListener("click", results);

// Click to show next or previous slides
previousButton.addEventListener("click", previousSlide);
nextButton.addEventListener("click", nextSlide);

document.onreadystatechange = function() {
    setTimeout(function (){
        if (document.readyState !== "complete") {
            document.querySelector("body").style.visibility = "hidden";
            document.querySelector("#loading").style.visibility = "visible";
        } else {
            document.querySelector("#loading").style.display = "none";
            document.querySelector("body").style.visibility = "visible";
        }
    }, 3000);
};

