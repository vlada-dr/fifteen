import React, { Component } from 'react'
import { Cell } from './cell'


export default class Game extends Component {


  state = {
    cells: this.props.cells,
    current: this.props.current,
    previous: {},
  }

  componentDidMount = () => document.addEventListener('keydown', this.keyDownListener)

  keyDownListener = (e) => {
    const { current, cells } = this.state
    let xAxis = true
    const {x, y} = current
    let newx = x, newy = y, move='', from = null, to = null
    switch (e.which) {
      case 40:
        newy = (y > 1 && y < 5) ? y-1 : y
        from = y
        to = newy
        xAxis=false
        break;
      case 38: 
        newy = (y > 0 && y < 4) ? y+1 : y
        from = y
        to = newy
        xAxis=false
        break;
      case 39: 
        newx = (x > 1 && x < 5) ? x-1 : x
        from = x
        to = newx
        move='x'
      break;
      case 37: 
        newx = (x > 0 && x < 4) ? x+1 : x
        from = x
        to = newx
        move='x'
      break;
      default:
        break;
    }
    const newElem = cells.findIndex((c) => (c.x === newx&& c.y===newy))
      if (newElem) {
    const elem = {
      ...cells[newElem], 
      x, 
      y,
    }
    const newcells = cells

    newcells[newElem] = elem
    this.setState({
       current: {x: newx, y: newy },
       cells:newcells, 
       previous: {
        x, 
        y, 
        xAxis,
        axis: xAxis ? 'x' : 'y',
       },
       move: {
        from,
        to,
        direction: move === 'x' ? 'left': 'top',
       },
      })}
  }
  componentWillUnmount = () => document.removeEventListener('keydown', this.keyDownListener)

  render() {
    const {cells, current, previous, move} = this.state
    const {axis} = previous
    return (
      <div className="field">
      {
        cells.map(({...cell}) => (
          <Cell 
            {...cell}
            key={cell.value}
            move={cell.x === previous.x && cell.y===previous.y && 
              {
                from: current[axis],
                to:previous[axis],
                axis,
              }
            }
          />
        ))
      }
        <Cell 
          x={current.x} 
          y={current.y} 
          move={move && {
            from: previous[axis],
            to: current[axis],
            axis,
          }} active />
      </div>
    );
  }
}