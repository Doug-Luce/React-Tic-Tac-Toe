import React, { Component } from 'react';
import './App.css';

// Store data of position of X
// User can click a box and O will appear in the box
// User can select X or O
// User wins if they get 3 in-a-row
// Computer wins if they get 3-in-a-row
// Board resets after the game ends to play again
// User can't clear move after being placed
// Computer can't place X or O in an existing space

// class Square will render squares, and set there event click event and value;
// 3 components will be made, one to make a square, one to make the game board, and one to contain the game
// The order of the components will be from the smallest out, so Square > Board > Game
// Game will contain the state.

// This line is a feature. I intend to roll it back as a test

const Square = (props) => {
  return (
    <div onClick={props.onClick} className="square">{props.value}</div>
  );
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.makeSquare = this.makeSquare.bind(this);
    }

  //TODO add a handle click function
  makeSquare(i) {
    return (
      <Square
        value={this.props.gameBoard[i]}
        // I had to use an anonymous button here to make the handleClick not execute.
        // HUZZAH!!!
        onClick={() => props.handleClick(this.props.gameBoard[i])}
        />
    );
  }

  render() {
    return (
      <div>
        <div className="row">
          {this.makeSquare(0)}
          {this.makeSquare(1)}
          {this.makeSquare(2)}
        </div>
        <div className="row">
          {this.makeSquare(3)}
          {this.makeSquare(4)}
          {this.makeSquare(5)}
        </div>
        <div className="row">
          {this.makeSquare(6)}
          {this.makeSquare(7)}
          {this.makeSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  constructor() {
    super();
    this.state = {gameBoard: [0,1,2,3,4,5,6,7,8]};
                  //Array(9).fill(4)
  }

  handleClick(i) {
    this.setState({gameBoard: [i] = 'x'});
  }

  render() {
    return (
      <Board gameBoard={this.state.gameBoard} onClick={this.handleClick}/>
    );
  }
}

export default Game;
