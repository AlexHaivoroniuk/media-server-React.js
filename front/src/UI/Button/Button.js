import React from 'react';
import styles from './Button.scss';
import idxStyles from './../../index.scss';

const Button = (props) => {
  return (
    <button
      className={ [styles.Button, idxStyles[props.btnSize], idxStyles[props.btnColor]].join(' ') }
      onClick={props.click}
      disabled={props.disabled}  
      >{props.children} 
    </button>
  )
}

export default Button

// <Button ></Button>
