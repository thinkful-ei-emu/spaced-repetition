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
      </div>
      <Button onClick={(e)=>handleClick(e)}type="submit">Next Word</Button>
    </section>
  )

}

export default CorrectRoute;
     
