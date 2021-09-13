import React, { Component } from 'react';
import './App.css';
import Calculator from './components/Calculator'

class App extends Component {
  state = {
    activeTemplate: 'coloring'
  }

  changeTemplate = (event) => {
    event.preventDefault()
    const newTemplate = event.target.value;
    this.setState({ activeTemplate: newTemplate })
  }

  render() {
    
    return (
      <div className={`App `}>
        <div className={`${this.state.activeTemplate} gradient`}></div>
        <Calculator />
      </div>
    );
  }
}

export default App;
