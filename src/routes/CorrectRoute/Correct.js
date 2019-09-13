import React from 'react';
import './Correct.css';
import Button from '../../components/Button/Button';


class CorrectRoute extends React.Component { 
 
  handleClick = (event)=>{
    event.preventDefault()   
    this.props.resetCorrect();
    
  }
   
  render(){
    return (
     
      <section className="correct-answer">
        <div className="correct-feedback">
        <h3>Good job, you got it correct!</h3>
        <p>Correct count: {this.props.wordCorrectCount}</p>
        <p>Incorrect count: {this.props.wordIncorrectCount}</p>
        <p>Your total score is: {this.props.totalScore}</p>         
        <p>The correct translation for <span className="bold">{this.props.original}</span> was <span className="bold">{this.props.answer}</span> and you chose <span className="bold">{this.props.guess}</span>!</p>      
        </div>
        <Button onClick={(e)=>this.handleClick(e)}type="submit">Next Word</Button>
      </section>
    )
  
  }

}

export default CorrectRoute;
     
