import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Posts from './components/Posts'
import PostRead from './components/PostRead'

function App() {
  return (
    <div className="App">
      <Route component={Posts} path="/" exact />
      <Route component={PostRead} path="/post/:id" />
    </div>
  );
}

export default App;
