import React, { Component } from 'react';
import Game from '../game';
import './style.scss';


const position = id => ({ x: (id % 4) + 1, y: Math.floor(id / 4) + 1 });

const getValue = (x, y) => x + (y - 1) * 4;

function generate() {
  const res = [];
  const size = 4;
  for (let i = 0; i < size * size - 1; i += 1) {
    res.push(Object.assign(position(i), { value: i + 1 }));
  }
  return res;
}

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
    const cells = [];
    const res = [];
    const { version } = this.state;

    for (let i = 0; i < 16; i += 1) cells.push(i);

    cells.sort(() => 0.5 - Math.random());

    for (let i = 0; i < 15; i += 1) {
      res.push(Object.assign(position(cells[i]), { value: i + 1 }));
    }
    this.setState({
      cells: res,
      version: version + 1,
      current: position(cells[15]),
      win: false,
    });
  }

  check = (cells) => {
    const win = cells.every(({ x, y, value }) => getValue(x, y) === value);

    this.setState({ win });
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
