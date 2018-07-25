import React, { Component } from 'react';
import Game from '../game';
import { shuffle, rand, generate, getValue } from './helpers';
import './style.scss';


export default class App extends Component {
  state = {
    version: 1,
    cells: generate(),
    current: {
      x: 4,
      y: 4,
    },
    win: false,
  }

  shuffle = () => {
    const { version, cells, current } = this.state;

    const shuffled = shuffle(cells);
    const id = rand(15);
    const curr = shuffled[id];

    shuffled[id] = {
      ...current,
      value: curr.value,
    };

    this.setState({
      cells: shuffled,
      version: version + 1,
      current: curr,
      win: false,
    });
  }

  check = (cells, current) => {
    const win = cells.every(({ x, y, value }) => getValue(x, y) === value);
    this.setState({ win, cells, current });
  }

  render() {
    const {
      cells,
      current,
      version,
      win,
    } = this.state;

    /* eslint-disable react/button-has-type */
    return (
      <div className="game-container">
        <button onClick={this.shuffle} className="main">
          {'Shuffle'}
        </button>
        <Game
          cells={cells}
          current={current}
          version={version}
          check={this.check}
        />
        {
          win ? (
            <div className="win">
              {'You win!'}
              <button onClick={this.shuffle}>
                {'Play again?'}
              </button>
            </div>
          ) : null
        }
      </div>
    );
  }
}
