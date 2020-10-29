import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ gameOver }) => {
  const [time, setTime] = useState(0);
  const timerId = useRef(null);

  /* Clean up runs when React performs the cleanup when the dependencies to that hook changes and the effect hook needs to run again with new values.*/
  useEffect(() => {
    if (!gameOver) {
      setTime(0);
      timerId.current = setInterval(() => {
        setTime((prevState) => {
          return prevState + 1;
        })
      }, 1000);
      return () => {
        clearInterval(timerId.current);
      }
    }

  }, [gameOver]);
  return (
    <section id="timer">
      {gameOver ? 
        <h3>Finished in {time} seconds!</h3> :
        <p>{time} seconds elasped</p>
      }
    </section>
  )
};

export default Timer;