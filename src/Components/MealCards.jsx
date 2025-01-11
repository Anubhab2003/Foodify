import React from 'react'
import { NavLink } from 'react-router-dom';

const MealCards = ({details}) => {
    console.log(details);
  return (
    <>
    <div className="meals">
        {!details ? "" : 
        details.map((curItem)=>{
            return(
                <div className='mealImg'>
                    <img src={curItem.strMealThumb}/>
                    <p>{curItem.strMeal}</p>
                    <NavLink to={`/${curItem.idMeal}`}>
                        <button >Recipe</button>
                    </NavLink> 
                    
                </div>
            )
        })

        }
    </div>
    
    </>
  )
}

export default MealCards
