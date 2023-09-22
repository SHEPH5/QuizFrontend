import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ListItem from "../components/framework/ListItem";


const GETAPI = () =>{

    let [quizes, setQuizes] = useState([])

    let Nav = useNavigate();



    let CollectData = async () => {
        try {
          let response = await fetch('http://127.0.0.1:8000/quiz/');
          let data = await response.json();
          console.log('data:', data);
          setQuizes(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      useEffect(() =>{
        CollectData();
      },[])


      let handleSubmit = (selectedTopic) =>{
        Nav(`quiz/r/${selectedTopic}`)
      }
    

    return(
        <>
          <div className="homepage-container">
            {quizes.map((item, index) =>(
               <div key={index} className="item-container">
                <ListItem key={index} data={item} />
                <button onClick={() => handleSubmit(item.title)}className="button"> Start Quiz </button>
                </div>
          
            ))}
          </div>

        </>
    )




}

export default GETAPI;