import React from 'react';
import Icon from './../Icon/Icon';
import styles from './Modal.scss';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const Modal = props => {
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
  return (
    <CSSTransition
      in={props.show}
      timeout={{
        enter: 1000,
        exit: 1000
      }}
      classNames={{
        enter: styles.fadeEnter,
        enterActive: styles.fadeEnterActive,
        exit: styles.fadeExit,
        exitActive: styles.fadeExitActive
      }}
      mountOnEnter
      unmountOnExit
    >
      {() => (
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
      )}
    </CSSTransition>
  );
};

export default Modal;

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func,
  children: PropTypes.any.isRequired,
  cancellable: PropTypes.bool
};
