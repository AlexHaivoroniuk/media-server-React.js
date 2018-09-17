import React from 'react';
import Icon from './../Icon/Icon';
import styles from './Modal.scss';
import PropTypes from 'prop-types';

const Modal = props => {
  let modal = null;
  let times = null;
  const closeHandler = () => {
    if (props.cancellable) {
      props.close();
    } else {
      return;
    }
  };
  if (props.cancellable) {
    times = (
      <div
        className={styles.Modal_Close}
        onClick={e => {
          props.close();
        }}
      >
        <Icon iconSize="lg">fa fa-times</Icon>
      </div>
    );
  }
  if (props.show) {
    modal = (
      <div className={styles.ModalBackdrop} onClick={closeHandler}>
        <div
          className={styles.Modal}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {times}
          {props.children}
        </div>
      </div>
    );
  }
  return modal;
};

export default Modal;

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func,
  children: PropTypes.any.isRequired,
  cancellable: PropTypes.bool
};
