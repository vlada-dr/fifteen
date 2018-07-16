import React, { Component } from 'react'
import Game from './game'


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      cells: this.generate()
    }
  }

  shuffle = () => {
    const newCells = this.state.cells.sort((a, b) => 0.5 - Math.random())
    this.setState({ cells: newCells})
  }

  generate = () => {
    const cells = [],  res = [],size = 4
    for (let i = 0; i < size*size; i++) {
      cells.push(i)
    }
    
    for (let i = 0; i < size*size; i++) {
      res.push({ 
        x:  cells[i]%size+1, 
        y:  Math.floor(cells[i]/size)+1,
        value: i + 1
      })
    }

    return res
  }

  render() {
    const { cells } = this.state
    return (
      <div className='game-container'>
        <Game cells={cells} />
      </div>
    );
  }
}