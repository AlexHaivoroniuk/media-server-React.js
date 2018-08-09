import React, { Component } from 'react';
import styles from './ContentContainer.scss';

export default class ContentContainer extends Component {
  render() {
    return (
      <div className={styles.ContentContainer}> 
        {this.props.children}
      </div>
    )
  }
}
