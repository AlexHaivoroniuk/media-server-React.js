import React from 'react';
import idxStyles from './../../../index.scss';
import PropTypes from 'prop-types';

const Icon = props => {
  return (
    <i
      className={[
        props.children,
        idxStyles[props.iconSize],
        idxStyles[props.iconColor]
      ].join(' ')}
    />
  );
};

export default Icon;

Icon.porpTypes = {
  btnSize: PropTypes.string,
  btnColor: PropTypes.string
};
