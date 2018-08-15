import React from 'react';
import Button from './../../UI/Button/Button';
import Icon from './../../UI/Icon/Icon';
import styles from './Controls.scss';

const Controls = props => {
  return (
    <div className={styles.Controls}>
      <Button btnSize="lg" clicked={() => props.sortAZ(0)}>
        <Icon>fa fa-sort-alpha-down</Icon>
      </Button>
      <Button btnSize="lg" clicked={() => props.sortAZ(1)}>
        <Icon>fa fa-sort-alpha-up</Icon>
      </Button>
      <Button btnSize="lg" clicked={props.toggle}>
        <Icon>fa fa-filter</Icon>
      </Button>
    </div>
  );
};

export default Controls;
