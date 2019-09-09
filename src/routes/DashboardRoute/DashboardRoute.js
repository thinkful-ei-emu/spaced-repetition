import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import './DashboardRoute.css'
import Button from '../../components/Button/Button'

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
       
        <h2 className="dash-title">My Dashboard</h2>  
      
      <div className="language-score">
      <h3>Language: <span>{language.name}</span></h3>      
       <h3>Total Score: <span>{language.total_score}</span></h3>
      </div>
      
       <h3> Words to learn:</h3>
       <ul className="dashboard-word-list">       
         {words.map(word => 
         <li className="dashboard-word" key={word.id}><h4>{word.original}</h4>
         Correct:{word.correct_count}<br></br>
         Incorrect:{word.incorrect_count}
         </li>)}
       </ul>
       
       <p></p>
       <div className="start-learning-container">
       <Button className="start-learning" onClick={this.startLearning}>Start Learning</Button>
       </div>
 
         </section>
    );
  }
}

export default DashboardRoute
