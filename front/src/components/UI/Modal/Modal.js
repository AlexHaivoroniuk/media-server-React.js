import React from 'react';
import Icon from './../Icon/Icon';
import styles from './Modal.scss';
import PropTypes from 'prop-types';

const Modal = props => {
  let modal = null;
  console.log(props);
  if (props.show) {
    modal = (
      <div
        className={styles.ModalBackdrop}
        onClick={e => {
          props.close();
        }}
      >
        <div
          className={styles.Modal}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {props.children}
          <div
            className={styles.Modal_Close}
            onClick={e => {
              props.close();
            }}
          >
            <Icon iconSize="lg">fa fa-times</Icon>
          </div>
        </div>
      </div>
    );
  }
  return modal;
};

export default Modal;

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element.isRequired)
};
