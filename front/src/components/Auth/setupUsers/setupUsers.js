import React, { Component } from 'react';
import Add from './Add/Add';
import List from './List/List';

class App extends Component {
  render() {
    return (
      <div className="Users">
        <div className="navbar">
          <h2 className="center ">Setup users</h2>
        </div>
        <List />
        <Add />
      </div>
    );
  }
}

export default App;
