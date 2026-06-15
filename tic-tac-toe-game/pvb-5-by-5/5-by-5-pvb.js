let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#new-game-btn");
let gameField = document.querySelector(".game-field");
let gameContainer = document.querySelector(".game-container");
let msgContainer = document.querySelector(".msg-container");
let cancelBtn = document.querySelector("#cancel-btn");
let playAgainBtn = document.querySelector("#play-again-btn");
let infoContainer = document.querySelector(".info-container");
let msg = document.querySelector(".msg");
let boxCount = 0;
let result = "";

const winPatterns = [
    [0,1,2,3],[1,2,3,4],[5,6,7,8],[6,7,8,9],[10,11,12,13],[11,12,13,14],[15,16,17,18],[16,17,18,19],[20,21,22,23],[21,22,23,24],
    [0,5,10,15],[5,10,15,20],[1,6,11,16],[6,11,16,21],[2,7,12,17],[7,12,17,22],[3,8,13,18],[8,13,18,23],[4,9,14,19],[9,14,19,24],
    [0,6,12,18],[6,12,18,24],[4,8,12,16],[8,12,16,20],
    [1,7,13,19],[5,11,17,23],[3,7,11,15],[9,13,17,21]
]

const disableBtns = () =>   {
    boxes.forEach((box) =>  {
        box.innerText = "";
        box.disabled = false;
        box.style.border = "1vmin solid #326771";
        boxCount = 0;     
        result = "";    
        gameField.style.opacity = "1";
        infoContainer.style.opacity = "1";
    })
}

const boxChanges = (box) => {
        box.style.fontSize = "7vmin";
        box.style.fontFamily = "'Montserrat'";
        box.style.textShadow = "0 0 20px rgba(255, 255, 255, 0.8)";
        box.style.color = "white";
        box.style.border = "0.5vmin solid #69d2e7";
        box.style.borderInlineColor = "rgb(158, 198, 228)";
}

let botTurn = ()  =>  {

    botIndex = Math.floor(Math.random()*25); 

    if(boxes[botIndex].innerText=="")   {
        boxes[botIndex].innerText = "X";
        boxChanges(boxes[botIndex]);
    }
    else{
        botTurn();
    }       
    boxes[botIndex].disabled = true;
    return botIndex;
}

boxes.forEach((box) =>  {
    box.addEventListener("click",() =>  {
        boxChanges(box);
        box.innerText = "O";
        boxCount++;
        if(boxCount<=24)   {
            botTurn();
            boxCount++;
        };    
        
        for(let pattern of winPatterns) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText; 
            let pos4Val = boxes[pattern[3]].innerText;
            let finalPattern = [pattern[0], pattern[1], pattern[2], pattern[3]];

            if(pos1Val != "" && pos2Val != "" && pos3Val != "" && pos4Val != "")    {

                if(pos1Val == pos2Val && pos2Val == pos3Val && pos3Val == pos4Val)   {
                    if(pos4Val == "O")  {
                        result = "You won";
                    } else {
                        result = "Bot won";
                    }
                    gameField.style.opacity = infoContainer.style.opacity = "0.2";
                    msgContainer.classList.remove("hide");
                    boxes.forEach((box) =>  {
                        box.disabled = true;
                    })
                }

                if(boxCount>24 && finalPattern != pattern && result=="")  {
                    result = "It's a Draw"; 
                    gameField.style.opacity = infoContainer.style.opacity = "0.2";
                    msgContainer.classList.remove("hide");
                }  
                msg.innerText = result;  

            }    
        }
        box.disabled = true;
    })
})

newGameBtn.onclick = () =>    {
    disableBtns();
    msgContainer.classList.add("hide");
}

cancelBtn.onclick = () => {
    msgContainer.classList.add("hide");
    gameField.style.opacity = "1";
    infoContainer.style.opacity = "1";
}

playAgainBtn.onclick = () =>    {
    disableBtns();
    msgContainer.classList.add("hide");
}