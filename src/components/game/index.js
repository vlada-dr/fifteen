import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from '../cell';
import './style.scss';


const keys = {
  40: {
    axis: 'y',
    sign: n => n - 1,
    start: 1,
    end: 5,
  },
  38: {
    axis: 'y',
    sign: n => n + 1,
    start: 0,
    end: 4,
  },
  37: {
    axis: 'x',
    sign: n => n + 1,
    start: 0,
    end: 4,
  },
  39: {
    axis: 'x',
    sign: n => n - 1,
    start: 1,
    end: 5,
  },
};

export default class Game extends Component {
  static propTypes = {
    check: PropTypes.func,
    cells: PropTypes.arrayOf(Cell).isRequired,
    current: PropTypes.objectOf(PropTypes.number),
    version: PropTypes.number.isRequired,
  }

  static defaultProps = {
    check: null,
    current: {
      x: 4,
      y: 4,
    },
  }

  state = {
    cells: this.props.cells,
    current: this.props.current,
    previous: {},
    version: this.props.version,
    prev: this.props.version,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownListener);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownListener);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.version !== state.prev) {
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

  keyDownListener = ({ which }) => {
    const { current, cells } = this.state;
    const { check } = this.props;
    const action = keys[which];

    if (action) {
      const { axis, sign, start, end } = action;
      const toChange = current[axis];
      const changedValue = sign(toChange);

      if (toChange > start && toChange < end) {
        const newTarget = {
          ...current,
          [axis]: changedValue,
        };

        const toSwap = cells.findIndex(c => c.x === newTarget.x && c.y === newTarget.y);
        const newCells = [...cells];
        newCells[toSwap][axis] = toChange;

        this.setState({
          previous: current,
          current: newTarget,
          cells: newCells,
          move: {
            from: changedValue,
            to: toChange,
            axis,
          },
        });

        check(newCells, newTarget);
      }
    }
  }

  render() {
    const { cells, previous: { x, y }, move } = this.state;

    return (
      <div className="field">
        {
          cells.map(({ ...cell }) => (
            <Cell
              {...cell}
              key={cell.value}
              move={cell.x === x && cell.y === y ? move : { }}
            />
          ))
        }
      </div>
    );
  }
}
