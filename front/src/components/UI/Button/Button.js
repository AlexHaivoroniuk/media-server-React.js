import React from 'react';
import styles from './Button.scss';
import idxStyles from './../../../index.scss';
import PropTypes from 'prop-types';

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

Button.porpTypes = {
  btnSize: PropTypes.string,
  btnColor: PropTypes.string,
  class: PropTypes.string,
  clicked: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  disabled: PropTypes.bool
};
