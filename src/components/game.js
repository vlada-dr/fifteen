import React, { Component } from 'react'
import { Cell } from './cell'


export default class Game extends Component {

  state = {
    cells: this.props.cells,
    current: this.props.current,
    previous: {},
    version: this.props.version,
    prev: this.props.version,
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.keyDownListener)
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.version !== state.prev ) {
      return {
        version: props.version,
        current: props.current,
        prev: props.version,
        cells: props.cells,
        previous: {},
      };
    }
    return null;
  }

  keyDownListener = (e) => {
    const { current, cells } = this.state
    const {x, y} = current
    let newx = x, newy = y, axis = 'x'
    switch (e.which) {
      case 40:
        newy = (y > 1 && y < 5) ? y-1 : y
        axis='y'
        break;
      case 38: 
        newy = (y > 0 && y < 4) ? y+1 : y
        axis='y'
        break;
      case 39: 
        newx = (x > 1 && x < 5) ? x-1 : x
      break;
      case 37: 
        newx = (x > 0 && x < 4) ? x+1 : x
      break;
      default:
        break;
    }
    
    const swap = cells.findIndex((c) => (c.x === newx&& c.y===newy))
    
    if (swap) {
      const newcells = cells
      newcells[swap] = { ...cells[swap], x, y }
      this.setState({
        current: {x: newx, y: newy },
        cells:newcells, 
        previous: { x, y, axis },
      })
    }
  }

  componentWillUnmount = () => document.removeEventListener('keydown', this.keyDownListener)

  render() {
    const {cells, current, previous} = this.state
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
      </div>
    );
  }
}