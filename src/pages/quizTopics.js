import { wait } from "@testing-library/user-event/dist/utils"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const QuizTopics = () =>{

    const { topic } = useParams();
    const [quiz, setQuiz] = useState([])
    
    

    const getTopic = async () =>{
        let response = await fetch(`http://127.0.0.1:8000/quiz/r/${topic}`)
        console.log('data:', response.status)
        if (response.ok){
            let data = await response.json()
            setQuiz(data);
            console.log('data:', data)
        }else{
            alert("Something is wrong, Please try again")
        }

    }

    useEffect(()=>{
        getTopic();
    }, [topic])

    return(
        <div>
            {quiz.map((item, index) =>( 
                <div key={index}>
                    <p>{item.title}</p>
                    {item.answer.map((ans, Ansindex) =>( 
                        <div key={Ansindex}>
                            <label>
                                <input type="checkbox" value={Ansindex} onChange={handleSelection}/> 
                                {ans.answer_text}
                            </label>
                        </div>
                    ))}

                    <button type="submit" onClick={CheckAnswer}>
                        Submit Answer
                    </button>
                    
   
                </div>

              
            ))}

        </div>
    )
}

export default QuizTopics;