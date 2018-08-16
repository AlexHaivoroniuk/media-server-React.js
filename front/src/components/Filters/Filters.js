import React from 'react';
import styles from './Filters.scss';
import Input from './../UI/Input/Input';
import Button from './../UI/Button/Button';
import Icon from './../UI/Icon/Icon';
import { connect } from 'react-redux';
import {
  clearFilters,
  handleFiltersInput,
  handleRangeInput
} from './../../store/actions/filters';
import { filterMovies } from './../../store/actions/movies';
import throttle from 'lodash/throttle';

const Filters = props => {
  let form = null; // form reference

  const lists = {
    genre: [
      'Action',
      'Adventure',
      'Fantasy',
      'Drama',
      'Romance',
      'Family',
      'Crime',
      'Sci-Fi',
      'Horror',
      'Thriller'
    ],
    countryList: ['USA', 'UK', 'France', 'Canada', 'Australia', 'New Zealand']
  };

  const resetFilters = e => {
    e.preventDefault();
    props.clear();
    form.reset();
  };

  const throttledRange = throttle((val, year) => {
    props.handleRange(val, year);
  }, 1000);

  let filters = null;
  if (props.display) {
    filters = (
      <div className={styles.Filters}>
        <form
          action=""
          ref={node => {
            form = node;
          }}
        >
          <fieldset>
            <legend>Genre</legend>
            <div className={styles.Genre}>
              {lists.genre.map((el, idx) => (
                <Input
                  type="checkbox"
                  key={idx}
                  label={el}
                  value={el}
                  changed={e => props.handleInput(e, 'genre')}
                />
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Country</legend>
            <div className={styles.Genre}>
              {lists.countryList.map((el, idx) => (
                <Input
                  type="checkbox"
                  key={idx}
                  label={el}
                  value={el}
                  changed={e => props.handleInput(e, 'country')}
                />
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Year</legend>
            <div className={styles.Range}>
              <Input
                type="range"
                label="Min year"
                min="1900"
                max="2018"
                value={props.year.minY}
                changed={e => throttledRange(e.target.value, 'minY')}
              />
              <Input
                type="text"
                value={props.year.minY}
                changed={e => throttledRange(e.target.value, 'minY')}
              />
              <Input
                type="range"
                label="Max year"
                min="1900"
                max="2018"
                value={props.year.maxY}
                changed={e => throttledRange(e.target.value, 'maxY')}
              />
              <Input
                type="text"
                value={props.year.maxY}
                changed={e => throttledRange(e.target.value, 'maxY')}
              />
            </div>
          </fieldset>
          <Button
            clicked={e => {
              e.preventDefault();
              props.filter();
            }}
            btnSize="md"
          >
            Filter
            <Icon>fa fa-filter</Icon>
          </Button>
          <Button
            clicked={e => {
              resetFilters(e);
            }}
            btnSize="md"
            btnColor="danger"
          >
            Clear
            <Icon>fa fa-trash</Icon>
          </Button>
        </form>
      </div>
    );
  }

  return filters;
};

const mapStateToProps = state => ({
  display: state.filters.toggleFilters,
  year: state.filters.year,
  genre: state.filters.genre,
  country: state.filters.toggleFilters
});

const mapDispatchToProps = dispatch => ({
  clear: () => {
    dispatch(clearFilters());
  },
  filter: () => {
    dispatch(filterMovies());
  },
  handleInput: (e, filter) => {
    dispatch(handleFiltersInput(e, filter));
  },
  handleRange: (val, year) => {
    dispatch(handleRangeInput(val, year));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
