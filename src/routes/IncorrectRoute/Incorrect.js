import React from 'react';
import './Incorrect.css';
import Button from '../../components/Button/Button'

function IncorrectRoute(props) {
  const handleClick = (event)=>{
    event.preventDefault()
    props.history.goBack()
    }
  return (
    <section className="incorrect-answer">
    <div className="incorrect-feedback"> 
      <h3>You still need more practice with this word.</h3>
        <p>
        The correct answer was hello.
        </p>
        <p>
        Correct count: 3
        </p>
        <p>
        Incorrect count: 4
        </p>
       {/*  <p>
        Your total score is: ${total_score}
        </p> */}
       {/*  <p>
        `The correct translation for ${languageHeadFixture.nextWord} was ${incorrectFixture.answer} and you chose ${guess}!`,
        </p> */}
      </div>
      <Button onClick={(e)=>handleClick(e)}>Next Word </Button>
    </section>
  )
}

export default IncorrectRoute;
