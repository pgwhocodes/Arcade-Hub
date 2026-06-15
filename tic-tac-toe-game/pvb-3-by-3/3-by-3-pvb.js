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
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
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
        box.style.border = "0.7vmin solid #69d2e7";
        box.style.borderInlineColor = "rgb(158, 198, 228)";
}

let botTurn = ()  =>  {

    botIndex = Math.floor(Math.random()*9); 
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
        if(boxCount<=8)   {
            botTurn();
            boxCount++;
        };    
        
        for(let pattern of winPatterns) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText; 
            let finalPattern = [pattern[0], pattern[1], pattern[2]];

            if(pos1Val != "" && pos2Val != "" && pos3Val != "")    {
                
                if(pos1Val == pos2Val && pos2Val == pos3Val)   {
                    if(pos3Val == "O")  {
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

                if(boxCount>8 && finalPattern != pattern && result=="")  {
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