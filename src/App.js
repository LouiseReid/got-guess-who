import React from 'react';
import Board from './components/Board';
import UsersList from './components/UsersList'
import './App.css'

function App() {
  return (
    <div id="app">
      <UsersList />
      <Board />
    </div>
  );
}

export default App;
