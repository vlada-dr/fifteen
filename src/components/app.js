import React, { Component } from 'react'
import Game from './game'


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      cells: this.generate(),
    }
  }

  shuffle = () => {
    const newCells = this.state.cells.sort((a, b) => 0.5 - Math.random())
    this.setState({ 
      cells: newCells
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
    res.push({x: 4, y: 4, value: ''})
    return res
  }

  render() {
    const { cell } = this.state
    return (
      <div className='game-container'>
        <Game cells={cells} />
      </div>
    );
  }
}