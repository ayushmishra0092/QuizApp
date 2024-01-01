import React, {useState} from 'react'
import Question from './Question'

export default function Specific_quiz({Quiz}) {
    const [answers, setAnswers] = useState([]);
    const [result,setResult]=useState("Best of luck");
  const handleAnswerChange = (questionId, selectedOptions) => {
         // Find the index of the question in the answers array
         const questionIndex = answers.findIndex((answer) => answer.questionId === questionId);
  

         if (questionIndex !== -1) {
           // Update the selected options for an existing question
           const updatedAnswers = [...answers];
           updatedAnswers[questionIndex].selectedOptions = selectedOptions;
           setAnswers(updatedAnswers);
         } else {
           // Add a new answer for a new question
           setAnswers([...answers, { questionId, selectedOptions }]);
         }
        //  console.log(answers);
       };
       const handlesubmit=()=>{
        let correct_answer=[];
         {Quiz.questions.map((question)=>{
          correct_answer.push({"questionId":question._id,"selectedOptions":question.correctAnswerIndices})
         })}
         const participant_answer=answers;
         console.log(correct_answer);
         console.log(participant_answer);
         let count=0;
        //  {participant_answer.map((element)=>
        //   {
        //     let ans=correct_answer.find( correct_answer=>element && element.questionId);
        //     console.log(ans);
        //       // if(toString(element.selectedOptions)===toString(ans.correctAnswerIndices))
        //       //   count++;
        //   })}
        for(let i=0;i<correct_answer.length;i++)
        {
          for(let j=0;j<participant_answer.length;j++)
          {
            if(participant_answer[j].questionId==correct_answer[i].questionId)
            {
              if(participant_answer[j].selectedOptions.toString()===correct_answer[i].selectedOptions.toString())
               count++;
            }
          }
        }
          console.log(count);
          setResult(count);
  }
  return (
    <>
    <div> 
    {Quiz.questions.map((question,index) => {
          return <Question  index={index}
                  question={question}
                  onAnswerChange={(selectedOptions) => handleAnswerChange(question._id, selectedOptions)}/>
          
})}
 <button onClick={handlesubmit} > submit </button>
  <div>Your Result:{result} </div>

</div>
    </>
  )
}
