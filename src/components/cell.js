import React, { Component } from 'react'

export const Cell = ({x, y, value, from}) => (
  <div
    key={`cell-${value}`}
    className={`cell cell-coordinates-${x}-${y} 
      ${value === '' ? 'cell-active' : ''}
      from-${from}
      `
    }
  >
    {value}
  </div>
)