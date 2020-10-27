window.addEventListener('load',() => {
    const sounds=document.querySelectorAll(".sound");
    const pads=document.querySelectorAll(".pads div");
    const visual=document.querySelector(".visual");
    const color=[
        "#60d394",
        "#d36060",
        "#c060d3",
        "#d3d160",
        "#6860d9",
        "#b6eb3a"
    ]

    // adding sound here
    pads.forEach((pad,index) =>{
        pad.addEventListener('click', function(){
            sounds[index].currentTime=0;
            sounds[index].play();
            createBubble(index);
        });
    });
    const createBubble =(index)=>{
        const bubble =document.createElement("div")
        visual.appendChild(bubble);
        bubble.style.background=color[index];
        bubble.style.animation="jump 1s ease";
        bubble.addEventListener('animationend',function(){
            visual.removeChild(this);
        });
    }
});