import React from 'react';
import styles from './Button.scss';
import idxStyles from './../../../index.scss';

const Button = props => {
  let classes = [
    styles.Button,
    idxStyles[props.btnSize],
    idxStyles[props.btnColor]
  ];
  if (props.class) classes.push(props.class);
  return (
    <button
      className={classes.join(' ')}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
