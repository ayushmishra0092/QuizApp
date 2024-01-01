import React, { useEffect, useState } from 'react';
import question_temp from '../css_files/question_temp.css'

const Question = ({ index,question,onAnswerChange }) => {
  // console.log(question);
  const initial = [];
  // const [userAnswers,setuserAnswers]=useState(initial);
  const [selectedOptions, setSelectedOptions] = useState(initial);
  const handleOptionSelect = (optionId) => {
    // Check if the option is already selected
    const isSelected = selectedOptions.includes(optionId);

    if (isSelected) {
      // Remove the option from selected options
      const updatedOptions = selectedOptions.filter((id) => id !== optionId);
      setSelectedOptions(updatedOptions);
    } else {
      // Add the option to selected options
      setSelectedOptions([...selectedOptions, optionId]);
    }
    
  };
    useEffect(() => {
    onAnswerChange(selectedOptions);
  }, [selectedOptions]);
  
  return (
    <>
    <div class="container mt-sm-5 my-1">
    <div class="question ml-sm-5 pl-sm-5 pt-2">
        <div class="py-2 h5"><b>Q.`{index+1} {question.questionText}` </b></div>
        <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
        {question.options.map((option,pos) => (
                  <div>
                    <input
                      type="checkbox"
                      id={pos}
                      checked={selectedOptions.includes(pos)}
                      onChange={() => handleOptionSelect(pos)}
                    />
                    <label htmlFor={pos}>{option}</label>
                  </div>
                ))}
        </div>
    </div>
    </div>
    </>
      );
};

  export default Question;

 