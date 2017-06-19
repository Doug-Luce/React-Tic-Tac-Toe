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

const Square = (props) => {
  return (
    <div onClick={props.onClick} className="square">{props.value}</div>
  );
}

const Debug = (props) => {
  return (
    <div>
      <h3>this.state.playerTurn: {props.playerTurn.toString()}</h3>
      <h3>this.state.aiMove: {props.aiMove.toString()}</h3>
      <h3>this.state.noughts: {props.noughts.toString()}</h3>
      <h3>this.state.gameWon: {props.gameWon.toString()}</h3>
    </div>
    );
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.makeSquare = this.makeSquare.bind(this);
    }
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
      noughts: false, //noughts are O's
      gameWon: false,
      aiMove: 0
    };
  }

  handleClick(i) {
    if (!this.state.gameWon) {
      let gameBoardArr = this.state.gameBoard;
      // First turn logic for the player. This will check if the board is null, and input the selected nought or cross
      if (gameBoardArr[i] === null) {
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

      this.setState({gameBoard: gameBoardArr});
      this.checkWinner();
      this.aiDecideMove();
      this.aiMove(this.state.aiMove);

    }
    console.log('handleClick has ran');
  }
  aiDecideMove() {
    let gameBoardArr = this.state.gameBoard;
    let possibleMoves = [];
    let search = gameBoardArr.indexOf(null);
    while (search != -1) {
      possibleMoves.push(search);
      search = gameBoardArr.indexOf(null, search + 1);
    }
    this.setState({aiMove: possibleMoves.randomElement()});
    console.log(possibleMoves);
    console.log(possibleMoves.randomElement());
    console.log('aiDecideMove has ran');
  }

  aiMove(i) {
    console.log(this.state.playerTurn);
    let gameBoardArr = this.state.gameBoard;
    if (this.state.noughts) {
      gameBoardArr[i] = 'X';
    } else {
      gameBoardArr[i] = 'O';
    }
    // if (gameBoardArr[i] === null) {
    //     if (!this.state.playerTurn) {
    //       if (!this.state.noughts) {
    //         gameBoardArr[i] = 'X';
    //         this.setState({playerTurn: true});
    //         this.setState({noughts: false});
    //       } 
    //       if (this.state.noughts) {
    //         gameBoardArr[i] = 'O';
    //         this.setState({playerTurn: true});
    //         this.setState({noughts: false});
    //         console.log('AI has moved');
    //       }        
    //     }
    //   }
    this.setState({playerTurn: true});
    this.setState({noughts: false});
    this.setState({gameBoard: gameBoardArr});
    this.checkWinner();
    console.log('aiMove has ran');
  }

  checkWinner() {
    let vLeft  = [];
    let vMiddle = [];
    let vRight = [];
    let leftCross = [];
    let rightCross = [];
    let top = this.state.gameBoard.slice(0, 3);
    let middle = this.state.gameBoard.slice(3, 6);
    let bottom = this.state.gameBoard.slice(6, 9);
    vLeft.push(this.state.gameBoard[0], this.state.gameBoard[3], this.state.gameBoard[6]);   
    vMiddle.push(this.state.gameBoard[1], this.state.gameBoard[4], this.state.gameBoard[7]);
    vRight.push(this.state.gameBoard[2], this.state.gameBoard[5], this.state.gameBoard[8]);
    leftCross.push(this.state.gameBoard[0], this.state.gameBoard[4], this.state.gameBoard[8]);
    rightCross.push(this.state.gameBoard[2], this.state.gameBoard[4], this.state.gameBoard[6]);
    let winStates = [];
    winStates.push([vLeft, vMiddle, vRight, leftCross, rightCross, top, middle, bottom]);
    
    for (var i = 0; i < winStates.length; i++) {
      for (var y = 0; y < winStates[i].length; y++) {
        //console.log(winStates[i][y]);

        if(winStates[i][y].equals(['X','X','X'])) {
          //console.log('X WINS!');
          this.setState({gameWon: true});

        } else if (winStates[i][y].equals(['O','O','O'])){
          //console.log('O WINS!');
          this.setState({gameWon: true});        }
      }
      //console.log('---------------------');
    }

  }

  render() {
    return (
      <div>
        <Board gameBoard={this.state.gameBoard} onClick={i => this.handleClick(i)}/>
        <Debug playerTurn={this.state.playerTurn} noughts={this.state.noughts} aiMove={this.state.aiMove} gameWon={this.state.gameWon}/>
      </div>
    );
  }
}

export default Game;


// Adding array functionality

if(Array.prototype.randomElement) {
  console.warm("Overriding existing Array.prototype.randomElement. Possible causes: Nnew API defines the method, there's a framework conflict, or you've got double inclusions in your code.");
}
Array.prototype.randomElement = function() {
  return this[Math.floor(Math.random() * this.length)];
}

// Warn if overriding existing method
// I copied this code from Stack Overflow to add to the array prototype to check if 2 arrays are equal. 
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length !== array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] !== array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});