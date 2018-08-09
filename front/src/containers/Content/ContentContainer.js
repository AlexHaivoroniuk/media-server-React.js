import React, { Component } from 'react';
import styles from './ContentContainer.scss';
import Card from '../../UI/Card/Card';

export default class ContentContainer extends Component {
  render() {
    return (
      <div className={styles.ContentContainer}> 
        <div className = {styles.Movies}>
           <Card/>
           <Card/>
           <Card/>
           <Card/>
        </div>
      </div>
    )
  }
}


// movies.map((card, idx) => (<Card key={idx} movie={card}/>))