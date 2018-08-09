import React, { Component } from 'react';
import styles from './ContentContainer.scss';

export default class ContentContainer extends Component {
  render() {
    return (
      <div className={styles.ContentContainer}> 
        <div className = {styles.Movies}>
           
        </div>
      </div>
    )
  }
}


// movies.map((card, idx) => (<Card key={idx} movie={card}/>))