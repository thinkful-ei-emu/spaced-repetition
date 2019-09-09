import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import './DashboardRoute.css'
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

  
  render() {
    const {language, words} = this.state;
    return (
      <section className="dashboard">
        <h2>My Dashboard</h2>
       <h3>Language:</h3>
       <p>{language.name}</p>
       <h3> Words to learn:</h3>
       <ul className="dashboard-word-list">       
         {words.map(word => 
         <li className="dashboard-word" key={word.id}><h4>{word.original}</h4>
         Correct:{word.correct_count}<br></br>
         Incorrect:{word.incorrect_count}
         </li>)}
       </ul>
       <h3>Total Score: </h3>
       <p>{language.total_score}</p>
       <div className="start-learning-container">
       <button className="start-learning" onClick={this.startLearning}>Start Learning</button>
       </div>
     
         </section>
    );
  }
}

export default DashboardRoute
