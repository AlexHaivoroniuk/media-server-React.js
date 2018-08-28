import React from 'react';
import PropTypes from 'prop-types';
import styles from './SnackBar.scss';
import Icon from './../Icon/Icon';

const SnackBar = props => {
  let classes = [styles.SnackBar, styles.SnackBar__Show];

  const onClose = () => {
    props.clicked();
  };

  switch (props.type) {
    case 'success':
      classes = [
        styles.SnackBar,
        styles.SnackBar__Show,
        styles.SnackBar__Success
      ];
      break;
    case 'info':
      classes = [styles.SnackBar, styles.SnackBar__Show, styles.SnackBar__Info];
      break;
    case 'warn':
      classes = [styles.SnackBar, styles.SnackBar__Show, styles.SnackBar__Warn];
      break;
    case 'error':
      classes = [
        styles.SnackBar,
        styles.SnackBar__Show,
        styles.SnackBar__Error
      ];
      break;
    default:
      classes = [styles.SnackBar, styles.SnackBar__Show, styles.SnackBar__Info];
      return;
  }
  return (
    <div
      className={classes.join(' ')}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      {props.message}
      <div className={styles.SnackBar_Close} onClick={onClose}>
        <Icon iconSize="lg">fa fa-times</Icon>
      </div>
    </div>
  );
};

SnackBar.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired
};

export default SnackBar;
