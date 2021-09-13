import React, { Component } from 'react';

class Calculator extends Component {
  state = {
    value: '',
    history: [' ', ' ', ' ']
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyPressHandler)
  }

  checkAddable = (char,extended) => {
    const operations = ['/', '*', '+', '-', '.']
    if (operations.includes(this.state.value.slice(-1)) && operations.includes(char)) return false;
    return true
  }

  calculate = () => {
    let {value} = this.state
    if(!this.checkAddable(value.slice(-1))) return;
    if(isNaN(+value[0]) && (value[0] === '*' || value[0] === '/')) value = '1' + value 
    let result = eval(value)
    if (result !== Math.round(result)) {
      result = result.toFixed(2)
    }
    let newHistory = [...this.state.history]
    newHistory.push(`${value} = ${result}`)
    newHistory = newHistory.slice(-3)
    if(isNaN(result)) result = ''
    this.setState({ history: newHistory, value: `${result}` });
  }


  onClickHandler = (event) => {
    if (this.state.value && event.target.value === '=') {
      this.calculate()
    } else {
      if (!this.checkAddable(event.target.value)) return;
      if (event.target.value === 'AC') {
        this.setState({ history: [' ', ' ', ' '], value: '' })
      }
      else if (event.target.value === 'C') {
        this.setState({ value: '' })
      }else {
        this.setState({
          value: this.state.value + event.target.value
        })
      }
    }
  }

  keyPressHandler = (event) => {
    if (this.state.value && (event.key === '=' || event.key === 'Enter')) {
      this.calculate()
    } else if(event.key === 'Backspace') {
      this.setState({ value: this.state.value.slice(0, -1) })
    }
    else {
      if (!this.checkAddable(event.key)) return;
      if (/^([0-9+*/.^$-]+)$/.test(event.key)) {
        this.setState({ value: this.state.value + event.key })
      } else if (!event.target.value) this.setState({ value: '' })
    }
  }


  render() {
    const buttons= ['AC', 'C', '/', '*', 7, 8, 9, '-', 4, 5, 6, '+', 1, 2, 3, '=', 0, '.']
    return (
      <div className='calculator'>
        <div className='history'>
          {this.state.history.map((his,i) => (
            <div key={'history' + i}>{his}</div>
          ))}
        </div>
        <div className='active-calculation'>
          <input
            value={this.state.value}
            placeholder='0'
            autoFocus />
        </div>
        <div className='buttons'>
          {buttons.map((button,i )=> (
            <button onClick={this.onClickHandler} value={button} key={i}>{button}</button>
          ))}
        </div>
      </div>
    )
  }




}

export default Calculator;