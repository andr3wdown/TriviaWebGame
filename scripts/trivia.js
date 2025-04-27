import { init_import } from "./component-imports.js";
import { GetFourCategories } from "./categories.js";
import { GetQuestion } from "./api-calls.js";
let currentQuestionIndex = 0;
let correctAnswers = 0;
let name = "";

// Initialize the trivia game
// This function is called when the page loads
function start(){
    init_import();
    startScreen();
}

// This function is called when the user clicks the start button
// It shows the start screen
function startScreen(){
    // add the start card to the main content area
    $("#main-content").append('<start-card class="flex grow"></start-card>');
    // fade in the start card
    $("#main-content start-card").fadeIn(3000);
    // add the event listeners for the start and scores buttons
    $("#main-content start-card #start-button").on("click", () => {
        // get the name from the input field
        // if the name is empty, show an alert and return
        name = $("#main-content start-card #name-input").val();
        if (name == ""){
            alert("Please enter a name.");
            return;
        }
        // fade out the start card and remove it from the DOM
        $("#main-content start-card").fadeOut(1000, () => {
            $("#main-content start-card").remove();
            //show the categories screen
            questionSelectScreen();
        });
    });
    $("#main-content start-card #scores-button").on("click", () => {
        // fade out the start card and remove it from the DOM
        $("#main-content start-card").fadeOut(1000, () => {
            $("#main-content start-card").remove();
            // show the scores screen
            scoresScreen();
        });
    });
}
// This function is called to show the categories screen
function questionSelectScreen(){
    // get 4 random categories from the stored categories
    let categories = GetFourCategories();
    // add the categories card to the main content area
    $("#main-content").append('<categories-card class="flex grow"></categories-card>');
    // fade in the categories card
    $("#main-content categories-card").fadeIn(3000);
    // add the event listeners for the categories
    for(let i = 0; i < categories.length; i++){
        // set the category name
        $(`#main-content categories-card #category-${i} p`).html(categories[i].name);
        // add the event listener for the category
        $(`#main-content categories-card #category-${i}`).on("click", () => {
            // fade out the categories card and remove it from the DOM
            $(`#main-content categories-card`).fadeOut(1000, () => {
                $(`#main-content categories-card`).remove();
                // show the question screen for the selected category
                nextQuestion(categories[i]);
            });
        });
    }
}
// This function is called to show the next question
async function nextQuestion(category){
    //increment the question index
    currentQuestionIndex++;
    //get the question from the API
    let question = await GetQuestion(category.id, determineDifficulty());

    let answers = [];
    //add the correct answer to the answers array
    //add the incorrect answers to the answers array
    answers.push({ answer: question.correct_answer, correct: true });
    for (let i = 0; i < question.incorrect_answers.length; i++){
        answers.push({ answer: question.incorrect_answers[i], correct: false });
    }
    //shuffle the answers array
    answers.sort(() => Math.random() - 0.5);
    
    //add the question card to the main content area
    $("#main-content").append('<question-card class="flex grow"></question-card>');
    //fade in the question card
    $("#main-content question-card").fadeIn(3000);
    //set the question text and add the event listeners for the answers
    $("#main-content question-card #question").html(question.question);
    //loop through the answers array
    for (let i = 0; i < answers.length; i++){
        //set the answer text and add the event listener for the answer
        $(`#main-content question-card #answer-${i} p`).html(answers[i].answer);
        $(`#main-content question-card #answer-${i}`).on("click", () => {
            //if the answer is correct, increment the correct answers counter
            if (answers[i].correct){
                correctAnswers++;
            }
            //update the score
            $("#score").html(`${correctAnswers}/10`);
            //change the color of the answer boxes to green or red based on the correctness of the answer
            for(let j = 0; j < answers.length; j++){
                $(`#main-content question-card #answer-${j}`).off("click");
                if (answers[j].correct){
                    $(`#main-content question-card #answer-${j}`).css("border", "2px solid green");
                }
                else {
                    $(`#main-content question-card #answer-${j}`).css("border", "2px solid red");
                }
            }
            //wait for 1.5 seconds before fading out and removing the question card
            sleep(1500).then(() => {
                $(`#main-content question-card`).fadeOut(1000, () => {
                    $(`#main-content question-card`).remove();
                    //if the current question index is less than 10, show the categories screen again
                    //if the current question index is 10, show the end screen
                    if (currentQuestionIndex < 10){
                        questionSelectScreen();
                    }
                    else {
                        end();
                    }
                });
            });
        });
    }
}
// This function is called to show the end screen
function end(){
    //add the end card to the main content area
    $("#main-content").append('<end-card class="flex grow"></end-card>');
    //fade in the end card
    $("#main-content end-card").fadeIn(3000);
    //set the final score text and add the event listener for the end button
    $("#main-content end-card #final-score").html(`${correctAnswers}/10`);
    $("#main-content end-card #end-button").on("click", () => {
        //fade out the end card and remove it from the DOM
        $("#main-content end-card").fadeOut(1000, () => {
            $("#main-content end-card").remove();
            //reset the score element
            $("#score").html("0/10");
            //add the scores to local storage
            let scores = JSON.parse(localStorage.getItem("scores")) || [];
            scores.push({ name: name, score: correctAnswers });
            //sort scores by score
            scores.sort((a, b) => b.score - a.score);
            localStorage.setItem("scores", JSON.stringify(scores));
            
            //reset the name, current question index and correct answers counter
            name = "";
            currentQuestionIndex = 0;
            correctAnswers = 0;
            //show the start screen again
            startScreen();
            
        });
    });
}
// This function is called to show the scores screen
// It shows the scores stored in local storage
function scoresScreen(){
    //add the scores card to the main content area
    $("#main-content").append('<scores-card class="flex grow"></scores-card>');
    //fade in the scores card
    $("#main-content scores-card").fadeIn(3000);
    //get the scores from local storage
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    //get the score container element
    let scoreContainer = $("#main-content scores-card #score-container");
    //empty the score container
    scoreContainer.empty();
    //if there are no scores, show a message
    //if there are scores, loop through the scores and add them to the score container
    if (scores.length == 0){
        scoreContainer.append("<p>No scores yet.</p>");
    }
    else {
        for (let i = 0; i < scores.length; i++){
            scoreContainer.append( /*html*/`
                    <div class="flex flex-row justify-between p-4 m-4 bg-pink-700/40 backdrop-contrast-200 rounded-xl">
                        <p>${scores[i].name}</p>
                        <p>${scores[i].score}/10</p>
                    </div>
                `);
        }
    }
    //add the event listener for the end button
    $("#main-content scores-card #end-button").on("click", () => {
        //fade out the scores card and remove it from the DOM
        $("#main-content scores-card").fadeOut(1000, () => {
            $("#main-content scores-card").remove();
            //return to the start screen
            startScreen();
        });
    });
}
// This function is called to determine the difficulty of the question based on the current question index
function determineDifficulty(){
    if (currentQuestionIndex < 3){
        return "easy";
    }
    else if (currentQuestionIndex < 6){
        return "medium";
    }
    else {
        return "hard";
    }
}
// This function is called to sleep for a given amount of time
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
  

start();
