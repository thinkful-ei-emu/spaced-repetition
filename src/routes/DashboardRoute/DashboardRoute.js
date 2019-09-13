import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import Context from '../../contexts/Context'
import config from '../../config'
import './DashboardRoute.css'
import Button from '../../components/Button/Button'

class DashboardRoute extends Component {
  state = {
    language: {},
    words: [],
  }
  static contextType = Context;

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
        if(resObj.error){
          const {history} = this.props 
          this.context.processLogout();
          history.push('/login');
        }
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
        <div className="dash-header">
        <h2 className="dash-title">{language.name}</h2> 
          <div className="language-score"> 
          Total Score: {language.total_score}
          </div>
      </div>    
      
       <h3> Words to learn:</h3>
       <ul className="dashboard-word-list">       
         {words.map(word => 
         <li className="dashboard-word" key={word.id}>
         <h4>{word.original}</h4>
         Correct: {word.correct_count}<br></br>
         Incorrect: {word.incorrect_count}
         </li>)}
       </ul>
      
        <footer className="dash-footer">
          <div className="start-learning-container">
           <Button className="start-learning" onClick={this.startLearning}>Start Learning</Button>
          </div>
        </footer>
      </section>
    );
  }
}

export default DashboardRoute
