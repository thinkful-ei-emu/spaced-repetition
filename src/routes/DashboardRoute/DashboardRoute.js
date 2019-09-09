import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import {Link} from 'react-router-dom'
class DashboardRoute extends Component {
  
  state = {
    language: {},
    words: [],
  }
  componentDidMount(){
    this.fetchLanguage();
  }
  
  fetchLanguage = () => {   
    return fetch(`${config.API_ENDPOINT}/language`, {
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
        console.log(resObj)
        this.setState({           
          language: resObj.language,
          words: resObj.words
         });
      })
      .catch(error => {        
        console.error({ error });
      });
  }

  startLearning = e => {
    e.preventDefault();
    this.props.history.push('/learn')
  }

//   When viewing the dashboard as a logged in user:
// - The app gets my language and words progress from the server
// - I'm shown my language
// - I'm shown the words to learn for the language
// - I'm shown my count for correct and incorrect responses for each word
// - I'm given a button/link to start learning
// - I'm shown the total score for guessing words correctly
  
  render() {
    const {language, words} = this.state;
    return (
      <section>
        <h2>My Dashboard</h2>
       <h3>Language:</h3>
       <p>{language.name}</p>
       <h3> Words to learn:</h3>
       <ul>
       
         {words.map(word => 
         <li key={word.id}><h4>{word.original}</h4>
         Correct:{word.correct_count}<br></br>
         Incorrect:{word.incorrect_count}
         </li>)

         }

       </ul>
       <h3>Total Score: </h3>
       <p>{language.total_score}</p>
     <button onClick={this.startLearning}>Start Learning</button>
   
      </section>
    );
  }
}

export default DashboardRoute
