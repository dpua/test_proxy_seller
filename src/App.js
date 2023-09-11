import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import Posts from './components/Posts';
import Albums from './components/Albums';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={UserList} />
          <Route path="/user/:id" exact component={UserDetails} />
          <Route path="/user/:id/posts" component={Posts} />
          <Route path="/user/:id/albums" component={Albums} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
