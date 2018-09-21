import React, { Component } from 'react';
import Add from './Add/Add';
import List from './List/List';

class setupUsers extends Component {
  render() {
    return (
      <div className="setupUsers">
        <div className="navbar">
          <h3 className="center ">
            <em>Users setup</em>
          </h3>
        </div>
        <List />
        <hr />
        <Add />
      </div>
    );
  }
}

export default setupUsers;
