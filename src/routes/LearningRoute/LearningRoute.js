import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import LearningFrom from './LearningForm'
import './learningRoute.css'

class LearningRoute extends Component {
  state = {
    nextWord: null,
    wordCorrectCount: null,
    wordIncorrectCount: null,
    totalScore: null,
    guess: null,
    isCorrect: false
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
        totalScore: resObj.totalScore,
        isCorrect: resObj.isCorrect
      })
      /**
       *     (resObj.isCorrect) ? display correct : display incorrect
       */

      //  let correct = <p>Good job, you got it correct!
      //    Correct count: {resObj.wordCorrectCount}
      //    Incorrect count: {resObj.wordIncorrectCount}
      //    <button>Next Word</button>
      //  </p>

      // let incorrect = <p>You still need more practice with this word.
      //   The correct answer was {resObj.answer}.
      //   Correct count: {resObj.wordCorrectCount}
      //   Incorrect count: {resObj.wordIncorrectCount}
      //   <button>Next Word </button>
      // </p>
    })
    .catch(error => {  
      console.error({ error });
    });
  }

  render() {
    return (
      <section className="learning-route"> 
        <div className="word">
        <h2>Translate the word:</h2> <span>{this.state.nextWord}</span>
        </div>
        
        <LearningFrom setGuess={this.setGuess} submitGuess={this.submitGuess}/>
        
        {/* <Correct/>
        <Incorrect/> */}

        <p>Your total score is: {this.state.totalScore}</p>
        <hr/>
        <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>          
      </section>
    );
  }
}

export default LearningRoute
