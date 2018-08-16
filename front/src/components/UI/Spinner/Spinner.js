import React from 'react';
import styles from './Spinner.scss';

const Spinner = () => {
  return (
    <div className={styles.ldsRing}>
      <div className={styles.ldsRing__Child} />
      <div className={styles.ldsRing__Child} />
      <div className={styles.ldsRing__Child} />
      <div className={styles.ldsRing__Child} />
    </div>
  );
};

export default Spinner;
