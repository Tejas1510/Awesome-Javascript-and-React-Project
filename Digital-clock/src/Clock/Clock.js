/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import "./Clock.css";

export function Clock() {
  const [date, setDate] = useState(new Date());
  const [switched, setSwitched] = useState(0);
  let timerId;

  function padStartDigit(digit) {
    return digit.toString().padStart(2, "0");
  }

  useEffect(() => {
    timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  });

  function toggle(){
    if(switched === 0){
      setSwitched(1)
    }
    else if(switched == 1){
      setSwitched(0)
    }
  }

  return (
    <div className="all">
    <div className="clock">
      {
        (switched===0) ?
        <div>
        <span>{padStartDigit(date.getHours())}: </span>
        <span>{padStartDigit(date.getMinutes())}: </span>
        <span>{padStartDigit(date.getSeconds())}</span>
        </div> : < Timer toggle={toggle}/>      
      }
    </div>
    <div className="button">
        <button type="button" class="btn btn-outline-success" onClick={toggle}>Turn</button>
    </div>
    </div>
  );
}

export function Timer({toggle}) {
  const [hour, setHour] = useState(0)
  const [seconde, setSeconde] = useState(0);
  const [minute, setMinute] = useState(1);
  let timerId;

  function padStartDigit(digit) {
    return digit.toString().padStart(2, "0");
  }

  useEffect(() => {
    timerId = setInterval(() => { 
      if(hour == padStartDigit(0) && minute == padStartDigit(0) && seconde == padStartDigit(0)){
        alert("End Time")
        setHour(0)
        setMinute(0)
        setSeconde(0)
        toggle()
      }
      else if(hour != padStartDigit(0) && minute == padStartDigit(0) && seconde == padStartDigit(0)){
        setHour(hour - 1)
        setMinute(59)
        setSeconde(59)
      }
      else if(minute != padStartDigit(0) && seconde == padStartDigit(0)){
            setMinute(minute - 1)
            setSeconde(59)
      }
      else{
            setSeconde(seconde - 1);
      }
    }, 1000);

    return () => clearInterval(timerId);
})

    return (
      <div className="timer">
        <span>{padStartDigit(hour)}: </span>
        <span>{padStartDigit(minute)}: </span>
        <span>{padStartDigit(seconde)} </span>
      </div>
    )
  };