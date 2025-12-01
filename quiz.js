class Question{
    constructor(question,options,answer){
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
}

class Quiz{
    constructor(questions){
        this.questions = questions;
        this.currentIndex = 0;
        this.selectedAnswers = new Array(questions.length).fill(null);

    }

 
getCurrentQuestion(){
    return this.questions[this.currentIndex];
}    


next(){
    if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
        return true;
    }
    return false;
}

previous(){
    if (this.currentIndex > 0){
        this.currentIndex--;
        return true;
    }
    
    return false;
}

saveAnswer(index){
    this.selectedAnswers[this.currentIndex] = index;
}

calculateScore(){
    return this.questions.reduce((score, q ,i) => {
        return score + (q.answer === this.selectedAnswers[i] ? 1 : 0);
    }, 0);

}

}
class Timer {
    constructor(seconds,onTick,onFinish){
        this.seconds = seconds;
        this.onTick  = onTick;
        this.onFinish = onFinish;
        this.interval = null;
    }

start(){
    this.onTick(this.seconds);
    this.interval = setInterval(() => {
        this.seconds--;
        this.onTick(this.seconds);

    if(this.seconds <= 0){
        this.stop();
        this.onFinish();
    }

 },1000);
}

 stop(){
    clearInterval(this.interval);
 }

}

class UI {
    constructor(){
        this.startBtn = document.getElementById("startbtn");
        this.categorySelect = document.getElementById("category");
        this.optionBox = document.getElementById("quiz");
        this.optionCategory = document.getElementById("question");
        this.optionList = document.getElementById("option");
        this.previousBtn = document.getElementById("previousBtn");
        this.nextBtn = document.getElementById("nextBtn");
        this.timerDisplay = document.getElementById("timer");
    }


   showQuestion(question,selected){
    this.optionCategory.textContent = question.question;
    this.optionList.innerHTML = "";

    question.options.forEach((opt, i) =>{
    let li = document.createElement("li");
    li.textContent = opt;

    if (selected === i) li.style.background ="#c6ffc6";
 
    this.optionList.appendChild(li);

  });

  }

  updateTimer(time){
    this.timerDisplay.textContent = time; 
  }

  
 updateButtons(isFirst,isLast){
    this.previousBtn.disabled = isFirst;
    this.nextBtn.textContent = isLast ? "Finish" : "Next";
 }

 showResult(score,total){
    this.optionBox.innerHTML = `
    <h2>Your Score: ${score} / ${total}</h2>
    <button class = "restart-btn" onclick="location.reload()">Restart</button>
    `;
 }
}

const questionData = {
    General: [
        new Question("What is the capital of France?",["Berin","Madrid","Paris","Rome"],2),
        new Question("Which planet is the Red planet?",["Mars","Venus","Jupiter","Earth"],3),
        new Question("What is the smallest country in the world by land area?",["Monaco","Nauru","Vatician City","San Marino"],2),
        new Question("Which planet un our solar system is the hottest one?",["Mercury","Venus","Earth","Mars"],1),
        new Question("Who wrote the play Romeo and Juliet?",["Shakesphere","Jane Austen","Mark Twain","Charles Dickens"],0),
        new Question("What is the Largest mammal in the world?",["African Elephant","Blue Whale","Giraffe","Hippopotamus"],1),
        new Question("What is the captial city of Japan?",["Beijing","Seoul","Tokyo","Bangkok"],2),
        new Question("How many continents are there on Earth?",["5","6","7","8"],2),
        new Question("What is the hardest natural substance on Earth ?",["Diamond","Gold","Quartz","silver"],0),
        new Question("What is the smallest prime number?",["0","1","2","3"],2)
    ],
    Science:[

       new Question("What is H2O?",["Salt","Water","Oxygen","Hydrogen"],1),
       new Question("Plants absorb which gas",["Oxygen","Hydrogen","Carbon Dioxide","Nitrogen"],1),
       new Question("What is centre of atom called?",["Electron","Proton","Nucleus","Neutron"],2),
       new Question("What planet is known as its rings?",["Mars","Saturn","Jupiter","Venus"],1),
       new Question("What is chemical symbol of gold?",["Au","Ag","Gd","Go"],0),
       new Question("Which part of the human body produce insulin?",["Pancreas","Liver","Kidney","Heart"],0),
       new Question("What is the boiling point of water at sea level ?",["50°C","75°C","100°C","210°C"],2),
       new Question("Which organ is responsible for pumping blood throuhout the body?",["Lungs","Brain","Heart","Stomach"],2),
       new Question("What type of blood cells help fight infections in the body?",["Red Blood Cells","White Blood Cells","Platelets","Plasma"],1),
       new Question("Which vitamin is mainly produced when the skin is exposed to sunlight?",["Vitamin A","Vitamin B12","Vitamin C","Vitamin D"],3),
    ], 

    History:[

      new Question("Who was the First president of the Union States?",["Thomas Jefferson","Geroge Washington","John Adams","Abraham Lincoln"],1),
      new Question("In which year did World War 2 end?",["1940","1942","1944","1945"],3),
      new Question("The Great Wall of china was primarily built to protect against which group?",["Mongols","Romans","Vikings","Persians"],0),
      new Question("Who discovered America in 1492?",["Ferdinand Magellan","Christopher Columbus","Marco Polo","Vasco da Gama"],1),
      new Question("Which anicent civilzation built the pyramids?",["Greeks","Egyptians","Romans","Mayans"],1),
      new Question("Who was known as Iron Lady?",["Indra Gandhi","Margarat Thatcher","Golda Meir","Eleanor Roosevelt"],1),
      new Question("The French Revolution began in which year?",["1776","1789","1804","1812"],1),
      new Question("Who was the First man to step on the Moon?",["Yuri Gagarin","Neil Armstrong","Buzz Aldrin","Michael Collins"],1),
      new Question("Which empire was ruled by Genghis Khan?",["Roman Empire","Ottoman Empire","Mongol Empire","Persian Empire"],2),
      new Question("The Berlin Wall fell in which year?",["1985","1987","1989","1991"],2)
    ]
};      

const ui = new UI();
let quiz = null;
let timer = null;

ui.startBtn.addEventListener("click",() => {
    const category = ui.categorySelect.value;
    quiz = new Quiz(questionData[category]);

    ui.optionBox.style.display = "block";
    ui.startBtn.disabled =true;
    ui.categorySelect.disabled = true;


loadQuestion();

});


function loadQuestion() {
const q = quiz.getCurrentQuestion();
ui.showQuestion(q, quiz.selectedAnswers[quiz.currentIndex]);
ui.updateButtons(quiz.currentIndex === 0, quiz.currentIndex === quiz.questions.length - 1);


setupOptions();
startTimer();

}

function setupOptions() {
const optionItems = [...ui.optionList.children];
optionItems.forEach((li, index) => {
li.addEventListener("click", () => {
quiz.saveAnswer(index);


  optionItems.forEach((o) => (o.style.background = "#eef2ff"));
  li.style.background = "#c6ffc6";
 });
 });
}


function startTimer() {
 if (timer) timer.stop();


timer = new Timer(30,(time) => ui.updateTimer(time), ()=> goNext());
timer.start();

}


ui.nextBtn.addEventListener("click", () => goNext());


function goNext() {
timer.stop();


if (quiz.next()) loadQuestion();
else finishQuiz();
}


ui.previousBtn.addEventListener("click", () => {
timer.stop();
if (quiz.previous()) loadQuestion();
});



function finishQuiz() {
timer.stop();
const score = quiz.calculateScore();
ui.showResult(score, quiz.questions.length);
}

