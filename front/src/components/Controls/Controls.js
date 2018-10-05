import React from 'react';
import { connect } from 'react-redux';
import Button from './../UI/Button/Button';
import Icon from './../UI/Icon/Icon';
import styles from './Controls.scss';
import { toggleFiltersPanel } from './../../store/actions/filters';
import { fetchMovies } from './../../store/actions/movies';
import actions from './../../store/actionsTypes';

export const Controls = props => {
  return (
    <div className={styles.Controls}>
      <Button btnSize="lg" clicked={props.fetch}>
        <Icon>fa fa-sync</Icon>
      </Button>
      <Button btnSize="lg" clicked={() => props.sortAZdesc()}>
        <Icon>fa fa-sort-alpha-down</Icon>
      </Button>
      <Button btnSize="lg" clicked={() => props.sortAZasc()}>
        <Icon>fa fa-sort-alpha-up</Icon>
      </Button>
      <Button btnSize="lg" clicked={props.tgl}>
        <Icon>fa fa-filter</Icon>
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  tgl: () => {
    dispatch(toggleFiltersPanel());
  },
  sortAZdesc: () => {
    dispatch({ type: actions.SORT_ALPHA_DESC });
  },
  sortAZasc: () => {
    dispatch({ type: actions.SORT_ALPHA_ASC });
  },
  fetch: () => {
    dispatch(fetchMovies());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Controls);
