const container = document.querySelector('.container')
const questionBox = document.querySelector('.question')
const choicesBox = document.querySelector('.choices')
const nextBtn = document.querySelector('.nextBtn')
const scoreCard = document.querySelector('.scoreCard')
const alert = document.querySelector('.alert')
const startBtn = document.querySelector('.startBtn')
const timer = document.querySelector('.timer')

const quiz = [
{
    question: "What do you call a snowman with a six-pack?",
    choices: ["A) Frosty the Fit", "B) Abdominal Snowman" , "C) Snow Absurd", "D) The Shredded Snowball"],
    answer: "B) Abdominal Snowman"
},

{
    question: "Why don't scientists trust atoms?",
    choices: ["A) They're always making up stuff", "B) They're too small to be reliable" , "C) They can't be divided", "D) They have too many potential energy levels"],
    answer: "C) They can't be divided"
},

{
    question: "What do you call a bear without any teeth?",
    choices: ["A) A gummy bear", "B)A toothless grizzly" , "C) A dental disaster", " D) A gumming predator"],
    answer: "A) A gummy bear"
},

{
    question: "Why don't skeletons fight each other?",
    choices: ["A) Frosty the Fit", "B) They prefer to keep their cool" , "C) They don't have the guts", "D) They're afraid of breaking a bone"],
    answer: "B) They prefer to keep their cool"
}


];

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timeID = null;

const showQuestions = () =>{
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for(let i=0; i<questionDetails.choices.length; i++){
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);
        

        choiceDiv.addEventListener('click', ()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }
            
        });
    };
   if(currentQuestionIndex < quiz.length){
    startTimer();
   }
    
}
//funtion to check answer
const checkAnswer = ()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
       // alert("correct answer!");
        displayAlert("correct answer!");
        score++;
    }
    else{
        //alert("wrong answer");
        displayAlert(`wrong answer! ${quiz[currentQuestionIndex].answer} is the correct answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
     if(currentQuestionIndex < quiz.length){
        
        showQuestions();
     }
     else{
         stopTimer();
         showScore();
        
     }
}
//clears everything and only displays the score
const showScore = ()=>{
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `you scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed the quiz!")
    nextBtn.textContent = "Play again";
    quizOver = true;
    timer.style.display = "none";

   
}

//function to show alert
const displayAlert = (msg)=>{
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 3000);
    
}

//    function to start timer
    const startTimer = ()=>{
        clearInterval(timeID);
        timer.textContent=timeLeft;

        

        const countDown = ()=>{  
            timeLeft--;
            timer.textContent=timeLeft;
                    
            if(timeLeft === 0){
                const confirmUser = confirm("Time Up!!! Do you want to play the quiz again?");
                if(confirmUser){
                    timeLeft = 15;
                    startQuiz();
                }
                else{
                    startBtn.style.display = "block";
                    container.style.display = "none";
                    return;
                }
            }

        }
        timeID = setInterval(countDown , 1000);
    }
    
    //  Function to stop timer
    const stopTimer = ()=>{
             clearInterval(timeID);
    }
    

    //  function to shuffle questions 
    const shuffleQuestions = ()=>{
        for(let i=quiz.length-1; i>0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
        }
        currentQuestionIndex = 0;
        showQuestions();
    }

    // function to start quiz 
    const startQuiz = ()=>{
        timeLeft = 15;
        score = 0;
        timer.style.display = "flex"; //because flex is used to centre 15
        shuffleQuestions();
     }
//   adding eventlistener to start button
    startBtn.addEventListener('click', ()=>{
        startBtn.style.display = "none";    //hides button start
        container.style.display = "block"; //shows the container
        showQuestions();

    })

//funtion to show all the questions one by one
// showQuestions();
nextBtn.addEventListener('click', ()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
        //alert("Select your answer");
        displayAlert("Select your answer")
        return;
    }
    if(quizOver){
    
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        alert.style.display = "none";
        currentQuestionIndex = 0; 
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else{
        checkAnswer();
    }
      
      
});