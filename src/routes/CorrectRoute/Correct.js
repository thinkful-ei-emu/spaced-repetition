import React from 'react';
import './Correct.css';
import Button from '../../components/Button/Button';

function CorrectRoute(props) {
const handleClick = (event)=>{
  console.log(props)
event.preventDefault()
props.history.goBack()
}
  return (
    <section className="correct-answer">
      <div className="correct-feedback">
      <h3>Good job, you got it correct!</h3>
        <p>
        Correct count: 5
        </p>
        <p>
        Incorrect count: 2
        </p>
          {/*  <p>
        Your total score is: ${total_score}
        </p> */}
       {/*  <p>
        `The correct translation for ${languageHeadFixture.nextWord} was ${correctFixture.answer} and you chose ${guess}!`,
        </p> */}
      </div>
      <Button onClick={(e)=>handleClick(e)}type="submit">Next Word</Button>
    </section>
  )

}

export default CorrectRoute;
     
