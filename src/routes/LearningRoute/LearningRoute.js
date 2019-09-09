import React, { Component } from 'react'

class LearningRoute extends Component {
  
  goBack = e => {
    e.preventDefault();
    this.props.history.goBack()
  }
  render() {
    return (
      <section>      
        <button onClick={this.goBack}>Back</button>
      </section>
    );
  }
}

export default LearningRoute
