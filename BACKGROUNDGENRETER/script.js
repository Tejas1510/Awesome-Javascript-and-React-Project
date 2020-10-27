var css = document.querySelector("textarea");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2"); 
var body = document.getElementById("gradient");
//var copyText = document.getElementById("myInput");

function setgradient(){
    body.style.background = "linear-gradient(to right,"
        + color1.value
        + ", "
        + color2.value
        + ")";
     css.textContent = body.style.background + ";";
    
}
color1.addEventListener("input", setgradient);
color2.addEventListener("input", setgradient);



    document.querySelector("button").onclick=function() {
      document.querySelector("textarea").select();
        document.execCommand("copy");
    }
    
    
