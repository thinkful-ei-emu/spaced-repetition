import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'

const Context = React.createContext({
  user: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
  nextWord: null,
  wordCorrectCount: null,
  wordIncorrectCount: null,
  totalScore: null,
  setAnswer: () => {}, 
  setHead : () => {},
})

export default Context

export class ContextProvider extends Component {
  constructor(props) {
    super(props)
    const state = { 
    user: {}, 
    error: null,
    nextWord: null,
    wordCorrectCount: null,
    wordIncorrectCount: null,
    totalScore: null,
    guess: null,
    isCorrect: null, }

    const jwtPayload = TokenService.parseAuthToken()

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      }

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle)
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    this.setState({ user })
  }

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    })
    IdleService.regiserIdleTimerResets()
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken()
    })
  }

  processLogout = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.setUser({})
  }

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.setUser({ idle: true })
  }

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken()
        })
      })
      .catch(err => {
        this.setError(err)
      })
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
  //   console.log('answer in setAnswer', answer)
  //   this.setState({
  //     nextWord: answer.nextWord,
  //     wordCorrectCount: answer.wordCorrectCount,
  //     wordIncorrectCount: answer.wordIncorrectCount,
  //     totalScore: answer.totalScore,
  //     isCorrect: answer.isCorrect
  //   })
  // }

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      // nextWord: this.state.nextWord,
      // wordCorrectCount: this.state.wordCorrectCount,
      // wordIncorrectCount: this.state.wordIncorrectCount, 
      // totalScore: this.state.totalScore,
      // setAnswer: this.setAnswer,
      // setHead: this.setHead
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
