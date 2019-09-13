import React from 'react';
import './Incorrect.css';
import Button from '../../components/Button/Button'


class IncorrectRoute extends React.Component {
 
  handleClick = (event)=>{
    event.preventDefault()
    this.props.resetCorrect();
    }
  render(){
    return (
      <section className="incorrect-answer">
      <div className="incorrect-feedback"> 
        <h3>You still need more practice with this word.</h3>
        <p>Correct count: {this.props.wordCorrectCount}</p>
        <p>Incorrect count: {this.props.wordIncorrectCount}</p>
        <p>Your total score is: {this.props.totalScore}</p>
        {/* <p>`The correct translation for ${languageHeadFixture.nextWord} was ${incorrectFixture.answer} and you chose ${this.props.guess}!`,</p> */}
        </div>
        <Button onClick={(e)=>this.handleClick(e)}>Next Word </Button>
      </section>
    )
  }
  
 
}

export default IncorrectRoute;
