import React from 'react';
import './App.css';
import blogs from './blogs';

import {Card} from './Card';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Alexander Seeto</h1>
      </header>
      <h2>Engineering Blogs</h2>
      <div className="App-grid">
        {blogs.map(({name, url}) => <Card name={name} url={url} />)}
      </div>
    </div>
  );
}

export default App;
