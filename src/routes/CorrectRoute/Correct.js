import React from 'react';
import './Correct.css';
import Button from '../../components/Button/Button';

function CorrectRoute() {

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
      <Button type="submit">Next Word</Button>
    </section>
  )

}

export default CorrectRoute;
     
