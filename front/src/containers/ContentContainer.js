import React, { Component } from 'react';

export default class ContentContainer extends Component {
  render() {
    return (
      <div> 
        {this.props.children}
      </div>
    )
  }
}
