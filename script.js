const topPage = document.querySelector(".page1");
const quizPage = document.querySelector(".que-page");
const mainQue = document.querySelector(".question");
const addOption = document.querySelector(".options");
const timeNmbr = document.querySelector(".time-count");
const timeLine = document.querySelector(".time-line");
const startBtn = document.querySelector(".start-btn");
const resultPage = document.querySelector(".result-page");
const resultText = document.querySelector(".result-text");
const nmbrPosition = document.querySelector(".position");

let index = 0;
let countMark = 0;
let timeCount = 14;
let countLine = 0;
let fixedTime;
let setLine;

function setTime() {
  timeNmbr.innerHTML = timeCount--;
  if (timeCount < 9) {
    timeNmbr.innerHTML = "0" + timeNmbr.innerHTML;
  }
  if (index == questions.length - 1) {
    if (timeCount < 0) {
      resultPage.style.display = "flex";
      showResult();
      reTry();
    }
  }
  if (timeCount < 0) {
    index++;
    addQue(index);
    timeCount = 15;
  }
  
}
function lineNmbr() {
  let timeLength = countLine++;
  timeLine.style.width = `${timeLength}px`;
  if (timeNmbr.innerHTML == 00) {
    countLine = 0;
    countLine++;
  }
}

startBtn.onclick = () => {
  startBtn.innerHTML = "Next";
  startBtn.style.display = "none";
  topPage.style.display = "none";
  quizPage.style.display = "block";
  timeNmbr.style.display = "block";
  timeLine.style.display = "block";
  fixedTime = setInterval(setTime, 1000);
  setLine = setInterval(lineNmbr,85);
  
  startBtn.onclick = () => {
    index++;
    addQue(index);
    startBtn.style.display = "none";
    timeCount = 15;
    fixedTime = setInterval(setTime, 1000);
    lineNmbr();
    setLine = setInterval(lineNmbr,85);
    
    if (index == questions.length-1) {
      startBtn.innerHTML = "Result";
      startBtn.onclick = () => {
        resultPage.style.display = "flex";
        showResult();
        reTry();
      }
    }
  }
}
function addQue() {
  data = questions[index];
  
  mainQue.innerHTML = `${index+1}. ${data.question}`;
  
  addOption.innerHTML = 
  `<p>${data.options[0]}</p>`+
  `<p>${data.options[1]}</p>`+
  `<p>${data.options[2]}</p>`+
  `<p>${data.options[3]}</p>`;
  
  let clickOption = document.querySelectorAll(".options p");
  
  clickOption.forEach(element => {
    element.onclick = () => {
    clearInterval(fixedTime);
    clearInterval(setLine);
    countLine = 0;
    countLine++;
    
    startBtn.style.display = "block";
      if (element.innerHTML == data.answer) {
        element.classList.add("correct");
        element.innerHTML = element.innerHTML+`<i class="fa-solid fa-check"></i>`;
        countMark++;
        
      } else {
        element.classList.add("incorrect");
        element.innerHTML = element.innerHTML+`<i class="fa-solid fa-xmark"></i>`;
        
        for (var i = 0; i < addOption.children.length; i++) {
          
          if (addOption.children[i].innerHTML != data.answer) {
            addOption.children[i].classList.add("incorrect");
            addOption.children[i].innerHTML = addOption.children[i].innerHTML+`<i class="fa-solid fa-xmark"></i>`;
            
          } else if (addOption.children[i].innerHTML == data.answer) {
            addOption.children[i].classList.add("correct");
            addOption.children[i].innerHTML = addOption.children[i].innerHTML + `<i class="fa-solid fa-check"></i>`;
          }
        }
      }
      for (var i = 0; i < addOption.children.length; i++) {
        addOption.children[i].classList.add
        ("disable-btn");
      }
    }
  });
}
addQue();
function showResult() {
  resultText.innerHTML =
    `You score is <span>${countMark}
    </span> of ${questions.length}`;
  if (countMark >= (questions.length / 1.2)) {
    nmbrPosition.innerHTML = "Congratulations 🏆";
  } else if (countMark >= (questions.length / 1.5)) {
    nmbrPosition.innerHTML = "You are intelligent 👌";
  } else if (countMark >= (questions.length / 3)) {
    nmbrPosition.innerHTML = "You are passed ✅";
  } else {
    nmbrPosition.innerHTML = "You are failed ❌";
  }
}

function reTry() {
  startBtn.style.display = "block";
  startBtn.style.zIndex = "2";
  startBtn.innerHTML = "Retry";
  startBtn.onclick = () => {
    window.location.reload();
  }
}