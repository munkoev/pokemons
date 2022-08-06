import React from 'react';
import './App.css';
import MyHeader from './components/MyHeader/MyHeader'
import PokeList from './components/PokeList/PokeList';

function App() {
  return (
      <div className="App">
        <MyHeader />
        <PokeList />
     </div>
  );
}

export default App;
