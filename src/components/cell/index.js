import React from 'react';
import classNames from 'classnames/bind';
import './style.scss';


const Cell = ({
  x,
  y,
  value,
  active,
  move,
}) => {
  const classes = classNames(
    `cell cell-coordinates-${x}-${y}`,
    {
      'cell-active': active,
      [`${move.axis === 'x' ? 'left' : 'top'}-from-${move.from}-to-${move.to}`]: move,
    },
  );

  return (
    <div
      key={`cell-${value}`}
      className={classes}
    >
      {value}
    </div>
  );
};

export default Cell;
