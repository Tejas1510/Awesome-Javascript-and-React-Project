
function makeBubble(){
    let some = "";
    for(let i=1; i<161;i++){
    some +=` <div class="bub">${Math.floor(Math.random()*10)}</div>`;
    document.querySelector(".pbotm").innerHTML=some;
}
}
makeBubble();

var timer=60;
function runTimer(){
    var timeint=setInterval(function(){
        if(timer>0){
            timer--;
            document.querySelector("#timerval").textContent=timer;
        }
        else{
            clearInterval(timeint);
            document.querySelector("#pbtm").innerHTML=`<h1>Game Over!!<h1> `;
            // document.querySelector("#pbtm").innerText=`Your Score is ${score}`;
        }
       
    },1000)
}
runTimer();
var rn=0;
function hitval(){
    rn = Math.floor(Math.random()*10);
    document.querySelector("#hitter").textContent=rn;
}
hitval();
var score=0;
function increaseScore(){
    score+=10;
    document.querySelector("#scoreval").textContent=score;
}
document.querySelector("#pbtm").addEventListener("click",
function(dets){
    var clickedNum =Number(dets.target.textContent);
    if(rn===clickedNum){
        increaseScore();
    }
    hitval();
    makeBubble();
});



