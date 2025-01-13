import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Mealinfo = () => {
  const { mealid } = useParams(); // Gives the id from the link
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      if (mealid) {
        const get = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
        );
        const jsonData = await get.json();
        console.log(jsonData.meals[0]);
        setInfo(jsonData.meals[0]);
      }
    };
    getInfo();
  }, [mealid]);

  if (!info) {
    return <div>Loading...</div>;
  }
  function listen() {
    const speech = new SpeechSynthesisUtterance();
    speech.text = info.strInstructions;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
    
    }
    // function pause(){
    //     window.speechSynthesis.pause();
    // }

  return (
    <>
      <div className="mealInfo">
        <img src={info.strMealThumb} alt={info.strMeal} />
        <div className="info">
          <h1>Recipe Details</h1>
          <button>{info.strMeal}</button>
          <h3>Instructions:</h3>
          <p>{info.strInstructions}</p>
        </div>
        <button onClick={listen}>Listen Recipe</button>
        {/* <button onClick={pause}>Pause</button>
         */}
      </div>
      
    </>
  );
};

export default Mealinfo;
