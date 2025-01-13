import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Mealinfo = () => {
  const { mealid } = useParams(); // Gives the id from the link
  const [info, setInfo] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false); // To track speech state
  const speechInstance = new SpeechSynthesisUtterance(); // Create a SpeechSynthesisUtterance instance

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

  const listen = () => {
    if (isSpeaking) {
      window.speechSynthesis.pause(); // Pause if currently speaking
    } else {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.resume(); // Resume if paused
      } else {
        // Configure the SpeechSynthesisUtterance instance
        speechInstance.text = info.strInstructions;
        speechInstance.volume = 1;
        speechInstance.rate = 1;
        speechInstance.pitch = 1;
        window.speechSynthesis.speak(speechInstance); // Start speech
      }
    }
    setIsSpeaking(!isSpeaking); // Toggle speech state
  };

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
        <button onClick={listen}>
          {isSpeaking ? "Pause Recipe" : "Listen Recipe"}
        </button>
      </div>
    </>
  );
};

export default Mealinfo;
