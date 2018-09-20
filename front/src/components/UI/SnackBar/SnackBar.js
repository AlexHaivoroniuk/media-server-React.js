import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SnackBar.scss';
import Icon from './../Icon/Icon';
import { CSSTransition } from 'react-transition-group';

class SnackBar extends Component {
  state = {
    show: false
  };

  componentDidMount = () => {
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ show: false });
    }, 4000);
  };

  onClose = () => {
    this.props.clicked();
  };
  handleFadeOut = () => {
    this.setState({ show: false });
  };

  render() {
    let classes = [styles.SnackBar, styles.SnackBar__Show];
    switch (this.props.type) {
      case 'success':
        classes = [styles.SnackBar, styles.SnackBar__Success];
        break;
      case 'info':
        classes = [styles.SnackBar, styles.SnackBar__Info];
        break;
      case 'warn':
        classes = [styles.SnackBar, styles.SnackBar__Warn];
        break;
      case 'error':
        classes = [styles.SnackBar, styles.SnackBar__Error];
        break;
      default:
        classes = [styles.SnackBar, styles.SnackBar__Info];
        return;
    }

    return (
      <CSSTransition
        in={this.state.show}
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
        unmountOnExit
        onExited={this.onClose}
      >
        {() => (
          <div
            className={classes.join(' ')}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {this.props.message}
            <div className={styles.SnackBar_Close} onClick={this.handleFadeOut}>
              <Icon iconSize="lg">fa fa-times</Icon>
            </div>
          </div>
        )}
      </CSSTransition>
    );
  }
}

SnackBar.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired
};

export default SnackBar;
