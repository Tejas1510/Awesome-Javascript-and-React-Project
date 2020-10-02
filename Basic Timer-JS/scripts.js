//Define vars to hold time values
let seconds = 0;
let minutes = 0;
let maxsec = 20;
let maxmin = 0;

//Define vars to hold "display" value
let displaySeconds = 0;
let displayMinutes = 0;

//Define var to hold setInterval() function
let interval = null;

//Define var to hold stopwatch status
let status = "stopped";

//Stopwatch function (logic to determine when to increment next value, etc.)
function stopWatch(){

    seconds++;

    //Logic to determine when to increment next value
    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;

    }

    //If seconds/minutes are only one digit, add a leading 0 to the value
    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }

    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }

    if(seconds === maxsec && minutes === maxmin){
        status = "max";
        window.clearInterval(interval);
        document.getElementById("display").style.color = "red";
        document.getElementById("display").innerHTML = "00:00";
        document.getElementById("startStop").innerHTML = "Reset";
    }

    //Display updated time values to user
    if(status !== "max") {
        document.getElementById("display").innerHTML = displayMinutes + ":" + displaySeconds;
    }

}



function startStop(){

    if(status === "stopped"){
        //Start the stopwatch (by calling the setInterval() function)
        interval = window.setInterval(stopWatch, 1000);
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started";

    }
    else if(status === "started"){
        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped";

    }
    else if (status === "max"){
        document.getElementById("display").style.color = "black";
        window.clearInterval(interval);
        seconds = 0;
        minutes = 0;
        document.getElementById("display").innerHTML = "00:00";
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped";
    }

}

