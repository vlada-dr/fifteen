import React, { Component } from 'react'

export const Cell = ({x, y, value, active, move}) => (
  <div
    key={`cell-${value}`}
    className={`
      cell cell-coordinates-${x}-${y} 
      ${active ? 'cell-active' : ''}
      ${ move && `${move.axis === 'x' ? 'left' : 'top'}-from-${move.from}-to-${move.to}`}
    `}
  >
    {value}
  </div>
)