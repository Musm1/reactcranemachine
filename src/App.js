import './App.css';
import won1 from './won.jpg'
import React, { useState, useRef } from 'react';

function App (){

  const [color1,setColor1] = useState("blue");
  const [color2,setColor2] = useState("blue");
  const [color3,setColor3] = useState("blue");
  const [rolling,setRolling] = useState(false);

  const [won,setWon] = useState(false);
  let slotRef = [useRef(null), useRef(null), useRef(null)];
  const colors = ["Blue", "Green", "Red", "Brown"];
  
  
  // to trigger rolling and maintain state
  const roll = () => {
      setRolling(true);
      setWon(false);
      setTimeout(() => {
        setRolling(false);
      }, 500);

      const allEqual = arr => arr.every(val => val === arr[0]);
      var rec = [];

      // looping through all 3 slots to start rolling
      slotRef.forEach((slot, i) => {
      // this will trigger rolling effect
      

      const selected = triggerSlotRotation(slot.current);
      rec.push(selected);

      if(i+1 == 1)
      setColor1(selected);
        else if(i+1 == 2)
        setColor2(selected);
        else 
        setColor3(selected);
      });

     if(allEqual(rec) )
     {
      setWon(true);
     }

  };
  
  // this will create a rolling effect and return random selected option
  const triggerSlotRotation = ref => {

    //rotation style
    function setTop(top) {
      ref.style.top = `${top}px`;
    }

    //random value 
    let options = ref.children;
    let randomOption = Math.floor(
      Math.random() * colors.length

    );
    
    //rotation index
    let choosenOption = options[randomOption];
    setTop(-choosenOption.offsetTop + 2); 
    console.log(randomOption);
   
    //return seleceted color
    return colors[randomOption];
  };

  return (
      <div className="SlotMachine">
        <h1><span>Crane</span>Machine<span>Game</span></h1>
        <div className="box-shadow">
          <div className="enclose">
              <div className="slot">
                  <section>
                  <div className="container" ref={slotRef[0]}>
                    {colors.map((opt, i) => (
                      <div key={i}>
                        <span className={opt}>{opt}</span>
                      </div>
                    ))}
                  
                  </div>
                  </section>
              </div>
              <div className="slot">
                <section>
                  <div className="container" ref={slotRef[1]}>
                    {colors.map(opt => (
                      <div>
                        <span className={opt}>{opt}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              <div className="slot">
                <section>
                  <div className="container" ref={slotRef[2]}>
                    {colors.map(opt => (
                      <div>
                        <span className={opt}>{opt}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          <button
            className= "roll"
            onClick={!rolling && roll}
            disabled={rolling}>
            {rolling ? "Playing..." : "Play"}
          </button>
            <div>
              {won?<h2 className="centrify">Congrats! You have Won</h2>: <div></div>}
            </div>
          </div>
      </div>
    ); 
};

export default App;
