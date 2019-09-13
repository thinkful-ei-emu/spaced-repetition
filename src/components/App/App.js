import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute'
import LearningRoute from '../../routes/LearningRoute/LearningRoute'
import CorrectRoute from '../../routes/CorrectRoute/Correct'
import IncorrectRoute from '../../routes/IncorrectRoute/Incorrect'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import './App.css'


export default class App extends Component {
  // state = { hasError: false }
  state = {
    hasError: false, 
    // nextWord: null,
    // wordCorrectCount: null,
    // wordIncorrectCount: null,
    // totalScore: null,
    // guess: null,
    // isCorrect: null,
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  // setHead = answer => {
  //   this.setState({
  //     nextWord: answer.nextWord,
  //     wordCorrectCount: answer.wordCorrectCount,
  //     wordIncorrectCount: answer.wordIncorrectCount,
  //     totalScore: answer.totalScore
  //   })
  // }

  // setAnswer = answer => {
  //   this.setState({
  //     nextWord: answer.nextWord,
  //     wordCorrectCount: answer.wordCorrectCount,
  //     wordIncorrectCount: answer.wordIncorrectCount,
  //     totalScore: answer.totalScore,
  //     isCorrect: answer.isCorrect
  //   })
  // }



  render() {
    const { hasError} = this.state
    return (
      // <LearningContext.Provider
      // value={{ nextWord,
      //   wordCorrectCount,
      //   wordIncorrectCount, 
      //   totalScore,
      //   setAnswer: this.setAnswer,
      //   setHead: this.setHead}}>
      <div className='App'>
        <Header />
        <main>
          {hasError && (
            <p>There was an error! Oh no!</p>
          )}
          <Switch>
            <PrivateRoute
              exact
              path={'/'}
              component={DashboardRoute}
            />
            <PrivateRoute
              path={'/learn'}
              component={LearningRoute}
            />           
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginRoute}
            />
            <Route
              component={NotFoundRoute}
            />
          </Switch>
        </main>
      </div>
    //  </LearningContext.Provider>
    );
  }
}
