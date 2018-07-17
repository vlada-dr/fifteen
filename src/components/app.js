import React, { Component } from 'react'
import Game from './game'


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      version: 1,
      cells: this.generate(),
      current: {
        x: 4,
        y: 4,
      },
    }
  }

  shuffle = () => {
    const cells = [], res = [], {version} = this.state
    for (let i = 0; i < 16; i++) {
      cells.push(i)
    }
    cells.sort((a, b) => 0.5 - Math.random())

    for (let i = 0; i < 15; i++) {
      res.push({ 
        x:  cells[i]%4+1, 
        y:  Math.floor(cells[i]/4)+1,
        value: i + 1
      })
    }
    this.setState({ 
      cells: res,
      version: version+1,
      current: {
        x: cells[15]%4+1, 
        y: Math.floor(cells[15]/4)+1
      }
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
    const { cells, current, version } = this.state
    return (
      <div className='game-container'>
        <button onClick={this.shuffle}>Shuffle</button>
        <Game cells={cells} current={current} version={version}/>
      </div>
    );
  }
}