import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import './learningRoute.css'

class LearningRoute extends Component {
  state = {
    nextWord: null,
    wordCorrectCount: null,
    wordIncorrectCount: null,
    totalScore: null
  }
  
  goBack = e => {
    e.preventDefault();
    this.props.history.goBack()
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
  render() {
    return (
      <section className="learning-route"> 
        <div className="word">
        <h2>Translate the word:</h2> <span>{this.state.nextWord}</span>
        </div>    
        <form className="learn-guess-input-form">
          <Label htmlFor="learn-guess-input">
            What's the translation for this word?
          </Label>
          <Input id="learn-guess-input" name="guess" type="text" required/>
          <div className="learning-buttons">
            <Button onClick={this.goBack}>Back</Button>
            <Button type="submit">Submit your answer</Button>
          </div>
        </form>
        <p>Your total score is: {this.state.totalScore}</p>
        <hr/>
        <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>          
      </section>
    );
  }
}

export default LearningRoute
