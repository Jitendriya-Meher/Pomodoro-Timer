
const focusBtn = document.querySelector("#focus");
const buttons = document.querySelectorAll(".btn");
const shortBreakBtn = document.querySelector("#shortbreak");
const longBreakBtn = document.querySelector("#longbreak");
const startBtn = document.querySelector("#btn-start");
const reset = document.querySelector("#btn-reset");
const pause = document.querySelector("#btn-pause");
const time = document.querySelector("#timer");

console.log(focusBtn,buttons,shortBreakBtn,longBreakBtn,startBtn,reset,pause,time);

let set;
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount+1}:00`;
let active = "focus";

const appendZero = (value) => {
    if( value < 10){
        return '0'+value;
    }
    return value;
}

reset.addEventListener("click", (
    resetTime = () => {

        switch( active){
            case "long":
                minCount = 14;
                break;
            case "short":
                minCount = 4;
                break;
            default:
                minCount = 24;
        }

        pauseTime();
        minCount = 24;
        time.textContent = `${minCount+1}:00`;
    })    
);

const removeFocus = () => {
    buttons.forEach( (btn) => {
        btn.classList.remove("btn-focus");
    })
}

focusBtn.addEventListener('click', () =>{
    removeFocus();
    focusBtn.classList.add("btn-focus");
    pauseTime();
    minCount = 24;
    count = 59;
    time.textContent = `${minCount+1}:00`;
});

shortBreakBtn.addEventListener("click",()=> {
    active="short";
    removeFocus();
    shortBreakBtn.classList.add("btn-focus");
    pauseTime();
    minCount = 4;
    count = 59;
    time.textContent = `${appendZero(minCount+1)}:00`;
});

longBreakBtn.addEventListener("click",()=> {
    active="long";
    removeFocus();
    longBreakBtn.classList.add("btn-focus");
    pauseTime();
    minCount = 14;
    count = 59;
    time.textContent = `${appendZero(minCount+1)}:00`;
});

pause.addEventListener("click", (
    pauseTime = () => {
        paused = true;
        clearInterval(set);
        startBtn.classList.remove("hide");
        pause.classList.remove("show");
        reset.classList.remove("show");
    }
));

startBtn.addEventListener("click", () => {
        startBtn.classList.add("hide");
        pause.classList.add("show");
        reset.classList.add("show");
        startBtn.classList.remove("show");

        if( paused){
            paused = false;
            time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;

            set = setInterval( ()=> {
                count--;
                time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;

                if( count == 0 ){
                    if( minCount != 0){
                        minCount --;
                        count = 60;
                    }
                    else{
                        clearInterval(set);
                    }
                }
            },1000);
        }
    }
);