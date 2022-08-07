import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from './app/pokeSlice';

const container = document.getElementById('root')!;
const root = createRoot(container);

store.subscribe(() => {
  localStorage.setItem('poke-redux', JSON.stringify(store.getState().poke))
})

const getFromLocalStorage = () => {
  try { 
    const persistedState = localStorage.getItem('poke-redux') 
    if (persistedState) 
      return JSON.parse(persistedState)
  }
  catch (e){ 
    console.log(e)
  }
}

const pokes = getFromLocalStorage()
if(pokes){
  store.dispatch(hydrate(pokes))
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
