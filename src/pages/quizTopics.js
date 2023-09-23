import { wait } from "@testing-library/user-event/dist/utils"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const QuizTopics = () =>{

    const { topic } = useParams();
    const [quiz, setQuiz] = useState([])
    const [answer, setAnswer] = useState({});
    const [a, setA] = useState([])

    

    const InitialAnswers = (a, ac) =>{
        let z = a.flatMap((obj) => obj.topic)
        var object = {};
        for (var x=0; x<ac; x++){
            object[z[x]] = false;
        }

        return object;

    };

    

    const GetTopic = async () =>{
        let response = await fetch(`http://127.0.0.1:8000/quiz/r/${topic}`)
        console.log('data:', response.status)
        if (response.ok){
            let data = await response.json()
            setQuiz(data);
            console.log('data:', data)


            const aData = data.flatMap((q) => q.answer)
            setA(aData);
            const ac = aData.length;

            const initialAnswerState = InitialAnswers(aData, ac)
            if (Object.keys(answer).length === 0){
                    setAnswer(initialAnswerState);
                }

    
            console.log("answers:",answer)

            
        }else{
            alert("Something is wrong, Please try again")
        }

        
    }

    useEffect(()=>{
        GetTopic();
    }, [topic])

    
    

    const checkAnswer = (e) =>{
        e.preventDefault()

        let correctAnswers = a.map((obj) => obj.is_right);
        console.log("correct_answers:", correctAnswers)

        function arrayEquals(o, p){
            return(
                Array.isArray(o) &&
                Array.isArray(p) &&
                o.length === p.length &&
                o.every((val, index) => val === p[index])
            )
        }
        let userAnswers = Object.values(answer);

        correctAnswers.sort();
        userAnswers.sort();
      
        if (arrayEquals(correctAnswers, userAnswers)) {
          console.log("correct");
        } else {
          console.log("incorrect");
        }
    }



    const handleSelection = (e) =>{
        setAnswer({...answer, [e.target.value]: e.target.checked});
    }
    console.log(answer)

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

                    <button type="submit" onClick={checkAnswer}>
                        Submit Answer
                    </button>
                    
   
                </div>

              
            ))}

        </div>
    )
}

export default QuizTopics;