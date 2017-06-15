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
        onClick={() => this.props.onClick(i)}
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
    this.state = {
      gameBoard: Array(9).fill(null),
      playerTurn: true,
      noughts: false //noughts are O's
    };
                  //Array(9).fill(4)
  }

  componentDidMount() {
    //this.setState({playerTurn: true});
    //this.setState({noughts: false});
  }

  handleClick(i) {
    let gameBoardArr = this.state.gameBoard;
    // First turn logic for the player. This will check if the board is null, and input the selected nought or cross
    if (gameBoardArr[i] === null) {
      console.log('gameBoardArr[' + gameBoardArr[i] + ']');
      if (this.state.playerTurn) {
       if (this.state.noughts) {
         gameBoardArr[i] = 'O';
         this.setState({noughts: true});
       } else if (!this.state.noughts) {
         gameBoardArr[i] = 'X';
         this.setState({noughts: true});
       };        
       this.setState({playerTurn: false});
      }
    }

    if (gameBoardArr[i] === null) {
      if (!this.state.playerTurn) {
        if (!this.state.noughts) {
          gameBoardArr[i] = 'X';
          this.setState({playerTurn: true});
          this.setState({noughts: false});
        } else if (this.state.noughts) {
          gameBoardArr[i] = 'O';
          this.setState({playerTurn: true});
          this.setState({noughts: false});
        }        
      }
    }
    console.log(gameBoardArr);
    this.setState({gameBoard: gameBoardArr});
    this.checkWinner();
  }

  checkWinner() {
    let top = this.state.gameBoard.slice(0, 3);
    let middle = this.state.gameBoard.slice(3, 6);
    let bottom = this.state.gameBoard.slice(6, 9);

    let vLeft  = [];
    vLeft.push(this.state.gameBoard[0], this.state.gameBoard[3], this.state.gameBoard[6]);

    let vMiddle = [];
    vMiddle.push(this.state.gameBoard[1], this.state.gameBoard[4], this.state.gameBoard[7]);

    let vRight = [];
    vRight.push(this.state.gameBoard[2], this.state.gameBoard[5], this.state.gameBoard[8]);

    let leftCross = [];
    leftCross.push(this.state.gameBoard[0], this.state.gameBoard[4], this.state.gameBoard[8]);

    let rightCross = [];
    rightCross.push(this.state.gameBoard[2]);
    rightCross.push(this.state.gameBoard[4]);
    rightCross.push(this.state.gameBoard[6]);
    
    console.log(vLeft);
  }

  render() {
    return (
      <Board gameBoard={this.state.gameBoard} onClick={i => this.handleClick(i)}/>
    );
  }
}

export default Game;
