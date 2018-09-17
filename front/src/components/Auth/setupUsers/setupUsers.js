import React, { Component } from 'react';
import Add from './Add/Add';
import List from './List/List';

class setupUsers extends Component {
  render() {
    return (
      <div className="setupUsers">
        <div className="navbar">
          <h2 className="center ">Users setup</h2>
        </div>
        <List />
        <Add />
      </div>
    );
  }
}

export default setupUsers;
