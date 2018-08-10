import React from 'react';
import idxStyles from './../../index.scss';

const Icon = (props) => {
  return (
    <i className={[props.children, idxStyles[props.iconSize], idxStyles[props.iconColor] ].join(' ')}></i>
  )
}

export default Icon;
