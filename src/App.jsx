import Mainpage from './Components/Mainpage'
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Mealinfo from './Components/Mealinfo';


const App = () => {
  return (
    <>
    {/* <Mainpage /> */}
    <Routes>
      <Route path='/' element={<Mainpage />}/>
      <Route path='/:mealid' element={<Mealinfo/>}/>
    </Routes>
    
    </>
  )
}

export default App
