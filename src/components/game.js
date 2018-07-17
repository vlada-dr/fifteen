import React, { Component } from 'react'
import { Cell } from './cell'


export default class Game extends Component {


  state = {
    cells: this.props.cells.filter((el) => el.value !== ''),
    x: this.props.cells.find((el) => el.value === '').x,
    y: this.props.cells.find((el) => el.value === '').y,
  }

  componentDidMount = () => document.addEventListener('keydown', this.keyDownListener)

  move = (condition) => (
   і
  )

  keyDownListener = (e) => {
    const { x, y, cells } = this.state
    let newx = x, newy = y, move=''
    switch (e.which) {
      case 40:
        newy = (y > 1 && y < 5) ? y-1 : y
        move='top'
        break;
      case 38: 
        newy = (y > 0 && y < 4) ? y+1 : y
        move='bottom'
        break;
      case 39: 
        newx = (x > 1 && y < 5) ? x-1 : x
        move='right'
      break;
      case 37: 
        newx = (x > 0 && y < 4) ? x+1 : x
        move='left'
      break;
      default:
        break;
    }
    const elem = cells.find((c) => (c.x === newx&& c.y===newy))
      if (elem) {elem.x = x
      elem.y=y
    const newcells = cells
    newcells[elem.value-1] =elem
    this.setState({
       x: newx, 
       y:newy, 
       cells:newcells, 
       prevx:x,
       prevy:y ,
       from:move,
      })}
  }
  componentWillUnmount = () => document.removeEventListener('keydown', this.keyDownListener)

  render() {
    const {cells, x, y, prevx, prevy, from} = this.state

    return (

    <div className="field">
    {cells.map(({...cell}) => (
    <Cell 
    {...cell}
     key={cell.value}
     move={cell.x === prevx && cell.y===prevy && from}
     />))
     }
      <Cell x={x} y={y} value='' />
    </div>
    );
  }
}