import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import LearningForm from './LearningForm'
import Context from '../../contexts/Context'
import './learningRoute.css'
import Correct from '../CorrectRoute/Correct'
import Incorrect from '../IncorrectRoute/Incorrect'

class LearningRoute extends Component {
  static contextType = Context;
  state = { 
    guess: null, 
    nextWord: null,
    wordCorrectCount: null,
    wordIncorrectCount: null,
    nextWordCorrectCount: 0,
    nextWordIncorrectCount: 0,
    totalScore: null,
    isCorrect: null,  
  }

  componentDidMount(){
    this.fetchWord();
  }
  
  fetchWord = () => {   
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) => {
      if (!res) {
        return res.json().then(e => Promise.reject(e));
      }
      return res.json()
    })
      .then((resObj) => {       
        this.setState({
          nextWord: resObj.nextWord,
          wordCorrectCount: resObj.wordCorrectCount,
          wordIncorrectCount: resObj.wordIncorrectCount,
          totalScore: resObj.totalScore
        })    
      })
      .catch(error => {  
        console.error({ error });
      });
  }

  setGuess = (e) => {
    this.setState({
      guess: e.target.value
    })
  }

  submitGuess = (e) => {
    e.preventDefault();   
    const { guess } = e.target     
    const submittedGuess = {
      guess: guess.value
    }
    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      body: JSON.stringify(submittedGuess),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) => {
      if (!res) {
        return res.json().then(e => Promise.reject(e));
      }
      return res.json()
    })
    .then((resObj) => {      
      this.setState({
        nextWord: resObj.nextWord,
        wordCorrectCount: resObj.wordCorrectCount,
        wordIncorrectCount: resObj.wordIncorrectCount,
        nextWordCorrectCount: resObj.nextWordCorrectCount,
        nextWordIncorrectCount: resObj.nextWordIncorrectCount,
        totalScore: resObj.totalScore,
        isCorrect: resObj.isCorrect
      })    
    })
    .catch(error => {  
      console.error({ error });
    });
  }

  resetCorrect = () => {
    this.setState({
      isCorrect : null,
    })
  }

  render() {
    const {isCorrect, nextWord, guess, nextWordCorrectCount, nextWordIncorrectCount, wordCorrectCount, wordIncorrectCount, totalScore} = this.state;
     return (     
      <section className="learning-route">
       {isCorrect === null ?
       <> 
        <div className="word">
        <h2>Translate the word:</h2> <span>{nextWord}</span>
        </div>
        <LearningForm setGuess={this.setGuess} submitGuess={this.submitGuess}/>       
        <p>Your total score is: {totalScore}</p>
        
        <hr/>
        <p>You have answered this word correctly {nextWordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {nextWordIncorrectCount} times.</p>  
        </>: isCorrect ? <Correct guess={guess} resetCorrect={this.resetCorrect} nextWord={nextWord} wordCorrectCount={wordCorrectCount}
         wordIncorrectCount={wordIncorrectCount} totalScore={totalScore}
        /> : <Incorrect guess={guess}  resetCorrect={this.resetCorrect} nextWord={nextWord} wordCorrectCount={wordCorrectCount}
        wordIncorrectCount={wordIncorrectCount} totalScore={totalScore}/>}       
      </section>
     
    );
  }
}

export default LearningRoute
