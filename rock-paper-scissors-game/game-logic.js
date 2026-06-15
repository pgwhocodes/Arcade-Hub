let boxes = document.querySelectorAll(".selection-btns");

let userPickImgDiv = document.querySelector("#user-pick-img-div");
let userImg = document.querySelector(".user-img");
let userPickImg = document.createElement("img");
let userPickName = document.querySelector("#user-pick-name"); 

let botPickImgDiv = document.querySelector("#bot-pick-img-div");
let botImg = document.querySelector(".bot-img");
let botPickImg = document.createElement("img");
let botPickName = document.querySelector("#bot-pick-name"); 

let msg = document.querySelector("#msg");

let roundNumberText = document.querySelector("#round-number");
let roundNumber = 0;

let userScoreText = document.querySelector("#user-score");
let userScore = 0;
let botScoreText = document.querySelector("#bot-score");
let botScore = 0;

let newGameBtn = document.querySelector("#new-game");

let userIndex;
const botOptions = ["rock","paper","scissors"];

const botPick = ()  =>  {
    botIndex = Math.floor(Math.random()*3);
    if(botOptions[botIndex] == botOptions[0])    {
        botPickName.innerText = "ROCK";
        botPickImg.setAttribute("src","/images/rock.png");
        botPickImg.classList.add("pick-img");
        botPickImg.classList.remove("bot-img");
        botPickImg.classList.remove("user-pick-scissors-img");
        roundChanges();
    }    
    else if(botOptions[botIndex] == botOptions[1])    {
        botPickName.innerText = "PAPER";
        botPickImg.setAttribute("src","/images/paper.png");
        botPickImg.classList.add("pick-img");
        botPickImg.classList.remove("bot-img");
        botPickImg.classList.remove("pick-scissors-img");
        roundChanges();
    }
    else    {
        botPickName.innerText = "SCISSORS";
        botPickImg.setAttribute("src","/images/scissors.png");
        botPickImg.classList.remove("pick-img");
        botPickImg.classList.remove("bot-img");
        botPickImg.classList.add("pick-scissors-img");
        roundChanges();
    }
    return botIndex;
};

const roundChanges = () => {
    roundNumber = roundNumber+0.5;
    roundNumberText.innerText = roundNumber;
    userPickImgDiv.append(userPickImg);
    userImg.style.opacity = "0";userImg.style.height = "0";userImg.style.width = "0";
    botPickImgDiv.append(botPickImg);
    botImg.style.opacity = "0";botImg.style.height = "0";botImg.style.width = "0";
};

const box1 = boxes[0].onclick = () => {
    userPickName.innerText = "ROCK";
    userPickImg.setAttribute("src","/images/rock.png");
    userPickImg.classList.add("pick-img");
    userPickImg.classList.remove("user-img");
    userPickImg.classList.remove("pick-scissors-img");
    userIndex = boxes[0].getAttribute("id");
};

const box2 = boxes[1].onclick = () => {
    userPickName.innerText = "PAPER";
    userPickImg.setAttribute("src","/images/paper.png");
    userPickImg.classList.add("pick-img");
    userPickImg.classList.remove("user-img");
    userPickImg.classList.remove("pick-scissors-img");
    userIndex = boxes[1].getAttribute("id");
};

const box3 = boxes[2].onclick = () => {
    userPickName.innerText = "SCISSORS";
    userPickImg.setAttribute("src","/images/scissors.png");
    userPickImg.classList.remove("pick-img");
    userPickImg.classList.remove("user-img");
    userPickImg.classList.add("pick-scissors-img");
    userIndex = boxes[2].getAttribute("id");
};

const userWon = () => {
    msg.innerText = "YOU WON!! :)";
}

const botWon = () => {
    msg.innerText = "YOU LOST!! :(";
}

const draw = () =>  {
    msg.innerText = "MATCH DRAWN!!";
}

const gameScore = () => {
    if(userIndex==botIndex)  {
        userScoreText.innerText = userScore;
        botScoreText.innerText = botScore;
        draw();
    }
    else if(userIndex==0 && botIndex==2) {
        userScore = userScore+1;
        userScoreText.innerText = userScore;
        userWon();
    }
    else if(userIndex==2 && botIndex==0)    {
        botScore = botScore+1;
        botScoreText.innerText = botScore;  
        botWon(); 
    }
    else{
        if(userIndex>botIndex)  {
            userScore = userScore+1;
            userScoreText.innerText = userScore;
            userWon();            
        }
        if(userIndex<botIndex)  {
            botScore = botScore+1;
            botScoreText.innerText = botScore;  
            botWon(); 
        }
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        roundChanges();
        botPick();
        gameScore();
        
    });
});

newGameBtn.onclick = () => {

    roundNumber = userScore = botScore = 0;;
    roundNumberText.innerText = roundNumber;
    userScoreText.innerText = userScore;
    botScoreText.innerText = botScore;

    userPickName.innerText = "YOU";
    userPickImg.classList.remove("pick-img");
    userPickImg.classList.remove("pick-scissors-img");
    userPickImg.classList.add("user-img");
    userPickImg.setAttribute("src","/images/user.png");

    botPickName.innerText = "BOT";
    botPickImg.classList.remove("pick-img");
    botPickImg.classList.remove("pick-scissors-img");
    botPickImg.classList.add("bot-img");
    botPickImg.setAttribute("src","/images/bot.png");

    msg.innerText = "PICK YOUR MOVE AND START THE GAME!!";

}