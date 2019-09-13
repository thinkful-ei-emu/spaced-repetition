import React from 'react';
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'

class LearningForm extends React.Component{
  
  render(){
    return(
      <form onSubmit={this.props.submitGuess} className="learn-guess-input-form">
      <Label htmlFor="learn-guess-input">
        What's the translation for this word?
      </Label>
      <Input onChange={e => this.props.setGuess(e)} id="learn-guess-input" name="guess" type="text" required/>
      <div className="learning-buttons">
        <Button type="submit">Submit your answer</Button>
      </div>
    </form>
    );
  }
}

export default LearningForm;