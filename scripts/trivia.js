import { init_import } from "./component-imports.js";
import { GetFourCategories } from "./categories.js";
import { GetQuestion } from "./api-calls.js";
let currentQuestionIndex = 0;
let correctAnswers = 0;
function start(){
    init_import();
    startScreen();
}

function startScreen(){
    $("#main-content").append('<start-card class="flex grow"></start-card>');
    $("#main-content start-card").fadeIn(3000);
    $("#main-content start-card #start-button").on("click", () => {
        $("#main-content start-card").fadeOut(1000, () => {
            $("#main-content start-card").remove();
            questionSelectScreen();
        });
    });
}

function questionSelectScreen(){
    let categories = GetFourCategories();
    $("#main-content").append('<categories-card class="flex grow"></categories-card>');
    $("#main-content categories-card").fadeIn(3000);
    for(let i = 0; i < categories.length; i++){
        $(`#main-content categories-card #category-${i} p`).html(categories[i].name);
        $(`#main-content categories-card #category-${i}`).on("click", () => {
            $(`#main-content categories-card`).fadeOut(1000, () => {
                $(`#main-content categories-card`).remove();
                nextQuestion(categories[i]);
            });
        });
    }
}

async function nextQuestion(category){
    currentQuestionIndex++;
    let question = await GetQuestion(category.id, determineDifficulty());

    let answers = [];
    answers.push({ answer: question.correct_answer, correct: true });
    for (let i = 0; i < question.incorrect_answers.length; i++){
        answers.push({ answer: question.incorrect_answers[i], correct: false });
    }
    answers.sort(() => Math.random() - 0.5);
    
    $("#main-content").append('<question-card class="flex grow"></question-card>');
    $("#main-content question-card").fadeIn(3000);
    $("#main-content question-card #question").html(question.question);
    for (let i = 0; i < answers.length; i++){
        $(`#main-content question-card #answer-${i} p`).html(answers[i].answer);
        $(`#main-content question-card #answer-${i}`).on("click", () => {
            if (answers[i].correct){
                correctAnswers++;
            }
            $("#score").html(`${correctAnswers}/10`);
            for(let j = 0; j < answers.length; j++){
                $(`#main-content question-card #answer-${j}`).off("click");
                if (answers[j].correct){
                    $(`#main-content question-card #answer-${j}`).css("border", "2px solid green");
                }
                else {
                    $(`#main-content question-card #answer-${j}`).css("border", "2px solid red");
                }
            }
            
            sleep(2000).then(() => {
                $(`#main-content question-card`).fadeOut(1000, () => {
                    $(`#main-content question-card`).remove();
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

function end(){
    $("#main-content").append('<end-card class="flex grow"></end-card>');
    $("#main-content end-card").fadeIn(3000);
    $("#main-content end-card #final-score").html(`${correctAnswers}/10`);
    $("#main-content end-card #end-button").on("click", () => {
        $("#main-content end-card").fadeOut(1000, () => {
            $("#main-content end-card").remove();
            $("#score").html("0/10");
            currentQuestionIndex = 0;
            correctAnswers = 0;
            startScreen();
            //add save score to local storage here
        });
    });
}

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

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
  

start();