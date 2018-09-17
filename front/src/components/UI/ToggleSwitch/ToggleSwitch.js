import React from 'react';
import PropTypes from 'prop-types';
import styles from './ToggleSwitch.scss';

const ToggleSwitch = props => {
  return (
    <label className={styles.ToggleSwitch}>
      {props.children}
      <input type="checkbox" value={props.value} onChange={props.changed} />
      <span className={styles.ToggleSlider} />
    </label>
  );
};

ToggleSwitch.propTypes = {
  value: PropTypes.bool.isRequired,
  changed: PropTypes.func.isRequired
};

export default ToggleSwitch;
