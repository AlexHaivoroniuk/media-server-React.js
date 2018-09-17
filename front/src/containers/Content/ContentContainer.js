import React, { Component } from 'react';
import styles from './ContentContainer.scss';
import Button from './../../components/UI/Button/Button';
import Icon from './../../components/UI/Icon/Icon';
import PropTypes from 'prop-types';

export default class ContentContainer extends Component {
  goToTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div className={styles.ContentContainer}>
        {this.props.children}
        <Button class={styles.goToTopBtn} clicked={this.goToTop}>
          <Icon iconSize="lg">fa fa-chevron-up</Icon>
        </Button>
      </div>
    );
  }
}

ContentContainer.propTypes = {
  children: PropTypes.any
};
