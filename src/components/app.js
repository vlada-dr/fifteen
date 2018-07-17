import React, { Component } from 'react'
import Game from './game'


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      cells: this.generate(),
      current: {
        x: 4,
        y: 4,
      },
    }
  }

  shuffle = () => {
    const newCells = this.state.cells.sort((a, b) => 0.5 - Math.random())
    for (let i = 0; i < newCells.length; i++) {
      newCells[i].value = i+1
    }
    const secret = Math.floor(Math.random()*(newCells.length-1))
    const current = newCells[secret]
    newCells[secret] = {...this.state.current, value: current.value}
    this.setState({ 
      cells: newCells,
      current,
    })
  }

  generate = () => {
    const cells = [],  res = [],size = 4
    for (let i = 0; i < size*size-1; i++) {
      cells.push(i)
    }
    
    for (let i = 0; i < size*size-1; i++) {
      res.push({ 
        x:  cells[i]%size+1, 
        y:  Math.floor(cells[i]/size)+1,
        value: i + 1
      })
    }
    return res
  }

  render() {
    const { cells, current } = this.state
    return (
      <div className='game-container'>
        <button onClick={this.shuffle}>Shuffle</button>
        <Game cells={cells} current={current} />
      </div>
    );
  }
}