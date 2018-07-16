import React, { Component } from 'react'

export default class Game extends Component {


  render() {
    const {cells} = this.props

    return (

    <div className="field">
      {cells.map((cell, cellId) => (
          <div
            key={`cell-${cellId}`}
            className={`cell cell-coordinates-${cell.x}-${cell.y} ${cell.value === 16 ? 'cell-active' : ''}`}
          >{cell.value}</div>
      ))}
    </div>
    );
  }
}