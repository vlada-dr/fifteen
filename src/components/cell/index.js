import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './style.scss';


const Cell = ({
  x, y, value, active, move,
}) => {
  const classes = classNames(
    `cell cell-coordinates-${x}-${y}`,
    {
      'cell-active': active,
      [`${move.axis === 'x' ? 'left' : 'top'}-from-${move.from}-to-${move.to}`]: move,
    },
  );

  return (
    <div key={`cell-${value}`} className={classes}>
      {value}
    </div>
  );
};


Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  active: PropTypes.bool,
  move: PropTypes.shape({
    axis: PropTypes.string,
    from: PropTypes.number,
    to: PropTypes.number,
  }),
};

Cell.defaultProps = {
  active: false,
  move: {
    axis: '',
  },
};

export default Cell;
