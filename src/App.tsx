import React from 'react';
import './App.css';
import GameComponent from './components/GameComponent';
import ChessGameConfig from './domain/ChessGameConfig';
import ChessPieceRepo from './repository/ChessPieceRepo';

function App() {
  return (
    <div className="App">
      <GameComponent
        config={new ChessGameConfig()}
        chessPieceRepo={new ChessPieceRepo()}
      ></GameComponent>
    </div>
  );
}

export default App;
