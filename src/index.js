import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import './index.css';

let coinFlip = () => {
    return (Math.floor(Math.random() * 2) === 0);
}


const Confirm = () => {
    if(coinFlip()) {
        return (
        <div>Player goes first</div>
        );
    } else {
        return (
            <div>Computer Goes First</div>)
    }
}


ReactDOM.render(<Confirm />, document.getElementById('root'));
setTimeout(function(){ ReactDOM.render(<Game />,document.getElementById('root')); }, 3000);





