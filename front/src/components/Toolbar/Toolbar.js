import React from 'react';
import styles from './Toolbar.scss';
import idxStyles from './../../index.scss'

const Toolbar = (props) => {
  let classes = {
    film: "fa fa-film",
    bars: "fa fa-bars"
  }
  return (
    <div className={styles.Toolbar}>
      <div 
        className={`${styles.Toolbar__menu} ${idxStyles.taC}`}
        onClick={props.toggle}
        >
          <i className={classes.bars}></i>
      </div>
      <div className={`${styles.Toolbar__title}  ${idxStyles.taR}`}>
        MediaServer  <i className={classes.film}></i>
      </div>
    </div>
  )
}

export default Toolbar

