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
      <h3>this.playerTurn: {props.playerTurn.toString()}</h3>
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
      //gameBoard: Array(9).fill(null),
      //playerTurn: true,
      gameWon: false,
      aiMoveChosen: 0,
      winner: null,
      showBoard: false,
      showDialog: false
    };
    // State doesn't update fast enough to be relied upon for the next state. I chose to handle this with a global variable, something like Redux would work too.
    // React state runs asynchronously
    this.gameWon = false;
    this.playerMarker;
    this.aiMoveChosen;
    this.aiFirst = this.coinFlip();
    this.playerTurn = true;
    this.gameBoard = Array(9).fill(null);
    if(this.aiFirst) {
      console.log('COMPUTER GOES FIRST');
      this.aiDecideMove();
      console.log(this.aiMoveChosen);
      this.aiMove(this.aiMoveChosen);
      console.log(this.gameBoard);
    }
  }

  componentWillMount() {
    this.forceUpdate();
  }


  handleClick(i) {
    if (!this.gameWon) {
      let gameBoardArr = this.gameBoard;
      // First turn logic for the player. This will check if the board is null, and input the selected nought or cross
      if (gameBoardArr[i] === null) {
        if (this.playerTurn) {
           gameBoardArr[i] = this.playerMarker;
         this.playerTurn = false;
         this.gameBoard = gameBoardArr;
        }
      }
      this.checkWinner();
      this.aiDecideMove();
      if(!this.gameWon) {
        this.aiMove(this.aiMoveChosen);
      };
    }
    this.forceUpdate()
  }
  aiDecideMove() {
    let possibleMoves = [];
    let search = this.gameBoard.indexOf(null);
    while (search !== -1) {
      possibleMoves.push(search);
      search = this.gameBoard.indexOf(null, search + 1);
    }
    this.aiMoveChosen = possibleMoves.randomElement();
  }

  aiMove(i) {
    let gameBoardArr = this.gameBoard;
    if(this.playerMarker === 'X') {
      gameBoardArr[i] = 'O';
    } 
    if(this.playerMarker === 'O') {
      gameBoardArr[i] = 'X';
    }
    this.playerTurn = true;
    this.gameBoard = gameBoardArr;
    this.checkWinner();
  }

  checkWinner() {
    let vLeft  = [];
    let vMiddle = [];
    let vRight = [];
    let leftCross = [];
    let rightCross = [];
    let top = this.gameBoard.slice(0, 3);
    let middle = this.gameBoard.slice(3, 6);
    let bottom = this.gameBoard.slice(6, 9);
    vLeft.push(this.gameBoard[0], this.gameBoard[3], this.gameBoard[6]);
    vMiddle.push(this.gameBoard[1], this.gameBoard[4], this.gameBoard[7]);
    vRight.push(this.gameBoard[2], this.gameBoard[5], this.gameBoard[8]);
    leftCross.push(this.gameBoard[0], this.gameBoard[4], this.gameBoard[8]);
    rightCross.push(this.gameBoard[2], this.gameBoard[4], this.gameBoard[6]);
    let winStates = [];
    winStates.push([vLeft, vMiddle, vRight, leftCross, rightCross, top, middle, bottom]);
    
    // Check the winner
    for (var i = 0; i < winStates.length; i++) {
      for (var y = 0; y < winStates[i].length; y++) {
        if(winStates[i][y].equals(['X','X','X'])) {
          this.gameWon = true;
          this.setState({winner: 'X'});
        } else if (winStates[i][y].equals(['O','O','O'])){
          this.gameWon = true;
          this.setState({winner: 'O'});
        }
      }
    }
    console.log('GameWon: ' + this.gameWon.toString());
    if(this.gameWon) {
      let that = this;
      setTimeout(function(){
       //alert(that.state.winner); 
       console.log(that.state.winner);
       console.log(that.playerMarker);

       if(that.state.winner === 'X' && that.playerMarker === 'X') {
        alert('Player Won');
       } else if(that.state.winner === 'O' && that.playerMarker === 'X') {
        alert('Computer Won');
       } else if(that.state.winner === 'O' && that.playerMarker === 'O') {
        alert('Player Won');
       } else if(that.state.winner === 'X' && that.playerMarker === 'O' ) {
        alert('Computer Won');
      } else {
        alert('Draw');
      }
     }, 3000);
    }
  }

  selectX() {
    this.playerMarker = 'X';
    this.showDialog();
  }

  selectO() {
    this.playerMarker = 'O';
    this.showDialog();
  }

  showDialog() {
    let that = this;
    this.setState({showDialog: true});
    setTimeout(function(){ that.setState({showBoard: true, showDialog: false}); }, 3000);
  }

  coinFlip() {
    return (Math.floor(Math.random() * 2) == 0); 
  }

  render() {
    let currentView = this.state.showBoard ? <div><Board gameBoard={this.gameBoard} 
    onClick={i => this.handleClick(i)}/><Debug playerTurn={this.playerTurn} 
    gameWon={this.state.gameWon}/></div> : 
      <div>
        <h2>Would you like to be X or O?</h2>
        <button onClick={this.selectX.bind(this)}>X</button>
        <button onClick={this.selectO.bind(this)}>O</button>
      </div>;
      if(this.state.showDialog) {
        if(!this.aiFirst) {
          currentView = <div>Player goes first.</div>;
        } else {
          currentView = <div>Computer goes first.</div>;
        }
        
      }
      return (
      <div>
        {currentView}
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