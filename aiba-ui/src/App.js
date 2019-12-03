import React from 'react';
import io from 'socket.io-client';
import './App.css';
import GameArea from './GameArea';

function App() {
  const backendUrl = "http://localhost:3000/";
  const socket = io(backendUrl);

  return (
    <div className="App">
      <header className="App-header">
        AI Ball
      </header>
      <GameArea socket={socket}></GameArea>
    </div>
  );
}

export default App;
