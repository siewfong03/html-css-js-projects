
//variabes
const startBtn = document.getElementById('start-button');
const homeScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen')
const currentQuesSpan = document.getElementById('current-question-number'); 
const quizQues = document.getElementById('quiz-question'); 
const subText = document.getElementById('currentQues-subText');
const scoreSpan = document.getElementById('score');
const totalQuest = document.getElementById('total-questions');
const answerContainer = document.getElementById('ans-container');
const progressBar = document.getElementById('progress-bar');
const finalScore = document.getElementById('user-result');
const resultTxt = document.getElementById('result-msg');
const restartBtn = document.getElementById('restart-button');
//quiz question 
const quesList = [
{
    question: 'What’s my weekend vibe?' ,
    subText: '(*I\'m just a nerdy)',
    answers: [{text: 'Cleaning my room' , correct: false},
              {text: 'Scrolling TikTok for 6 hours' , correct: true},
              {text: 'Going out then regretting it' , correct: false}, 
              {text: 'Sleeping like a panda', correct: false}] 
},


{
    question: 'What happens after I catch feelings?' ,
    subText: '(tmi: I ruin everything for no reason 😭)',
    answers: [{text: 'I confess' , correct: false},
              {text: 'I act weird' , correct: false},
              {text: 'I cry and tell you everything' , correct: false}, 
              {text: 'I ignore them', correct: true}] 
},

{
    question: 'What city was I born in?' ,
    subText: '(idk what say if u dk this)',
    answers: [{text: 'Terengganu' , correct: false},
              {text: 'Kuala Terengganu' , correct: false},
              {text: 'Kelantan' , correct: false}, 
              {text: 'Kota Bharu', correct: true}] 
},

{
    question: 'Which one is my comfort food?' ,
    subText: '(tbh, i also having hard time choosing this so i dont blame you)',
    answers: [{text: 'Traditional dry Pan Mee' , correct: true},
              {text: 'Maggi tomyam soup' , correct: false},
              {text: 'Zapfan' , correct: false}, 
              {text: 'Apam balik', correct: false}] 
},

{
    question: 'What’s my BIGGEST pet peeve?' ,
    subText: '(tbh: i also having hard time choosing this so i dont blame you)',
    answers: [{text: 'When someone says "I told you so"' , correct: false},
              {text: 'Someone who interrupts and only talks about themselves' , correct: true},
              {text: 'People who is loud in public transport' , correct: false}, 
              {text: 'People who constantly check their phone when you talk', correct: false}] 
},

];


//button listener
startBtn.addEventListener('click', startQuiz); 

let score = 0 ; 
let currentQuestIndex = 0 ; 
totalQuest.textContent= quesList.length; 
let answerDisabled = false ; 

//startQuiz class
function startQuiz() {


    score = 0 ; 
    currentQuestIndex = 0 ; 
    scoreSpan.textContent = 0 ; 

    homeScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion() ; 
}

//showQuest class
function showQuestion(){
    answerDisabled = false;
 //1. get the current question 
const currentQuest = quesList[currentQuestIndex];

 //2. update the current question txt 
quizQues.textContent = currentQuest.question; 
subText.textContent = currentQuest.subText ;

 //3. update the current question index 
currentQuesSpan.textContent = currentQuestIndex+1 ; 

 //5. clear the answer container 
answerContainer.innerHTML = ""; 

 //6. loop to display the answer button
currentQuest.answers.forEach((answer)=>{
    const button = document.createElement('button');
    button.textContent = answer.text ; 
    button.classList.add('answer-btn');

    button.dataset.correct = answer.correct; 
    button.addEventListener('click',selectAnswer);

    answerContainer.appendChild(button);
}

)

 //7. update progress bar
const progress  = (currentQuestIndex/quesList.length)*100 ; 
progressBar.style.width = progress + "%";
}

function selectAnswer (event) {
    if (answerDisabled) return ; 

    answerDisabled = true; 
    const selectedAns = event.target ; 
    const correctAns = selectedAns.dataset.correct == "true";
    
    Array.from(answerContainer.children).forEach((button)=>{
        if(button.dataset.correct==="true"){
            button.classList.add('correct');
        }else if (selectedAns===button){
            button.classList.add('incorrect');
        }
    }); 

    if(correctAns){
        score++ ; 
        scoreSpan.textContent = score ;
    }


    setTimeout(() => {
    currentQuestIndex ++ ; 
    if(currentQuestIndex < quesList.length){
        showQuestion(); 
    }else{
        showResult(); 
    }

},1000);
}

function showResult () {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    finalScore.textContent = score ; 

    const percentage = (score/quesList.length)*100;
    if (percentage ===100){
        resultTxt.textContent = "Bestie certified!! You are litt"
    }
    else if (percentage>=60){
        resultTxt.textContent = "Mid-level bestie :) Do We hang out??? 😭"
    }
    else {
        resultTxt.textContent = "🚩 Who are you? Unfriend me immediately 💀"
    }
    restartBtn.addEventListener('click', restart);
}

function restart() {
    resultScreen.classList.remove('active');
    homeScreen.classList.add('active');
    startQuiz(); 
}