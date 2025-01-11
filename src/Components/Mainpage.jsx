import {useState} from 'react'
import MealCards from './MealCards';
const Mainpage = () => {

  const [data,setData]=useState();
  const [search,setSearch]=useState("");
  const[msg,setMsg]=useState();

  const handleInput=(e)=>{
    setSearch(e.target.value);
  }



  const myFun=async ()=>{
    if(search==""){
      setMsg("Please enter a dish name");
      return;
    }else{
      const get=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      const jsonData= await get.json();
      setData(jsonData.meals);
      setMsg("");
    }
    
    // console.log(jsonData.meals);
  }
  // console.log(data);
  

  return (
    <>
    <h1 className="head">Foodify</h1>
    <div className="container">
      <div className="searchBar">
        <input type="text" placeholder="Enter dishes" onChange={handleInput}/>
        <button onClick={myFun}>Search</button>
      </div>
      <h4 className="msg">{msg}</h4>
      <div>
      <MealCards details={data}/>
      </div>
    </div>
    </>
  )
}

export default Mainpage
