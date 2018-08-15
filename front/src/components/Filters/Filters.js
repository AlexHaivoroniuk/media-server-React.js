import React from 'react';
import styles from './Filters.scss';
import Input from './../UI/Input/Input';
import Button from './../UI/Button/Button';
import Icon from './../UI/Icon/Icon';

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
    props.clearFilters();
    form.reset();
  };

  let filters = null;
  if (props.toggle) {
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
                  changed={e => props.filtersHandler(e, 'genre')}
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
                  changed={e => props.filtersHandler(e, 'country')}
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
                value={props.filters.year.minY}
                changed={e => props.rangeHandler(e, 'minY')}
              />
              <Input
                type="text"
                value={props.filters.year.minY}
                changed={e => props.rangeHandler(e, 'minY')}
              />
              <Input
                type="range"
                label="Max year"
                min="1900"
                max="2018"
                value={props.filters.year.maxY}
                changed={e => props.rangeHandler(e, 'maxY')}
              />
              <Input
                type="text"
                value={props.filters.year.maxY}
                changed={e => props.rangeHandler(e, 'maxY')}
              />
            </div>
          </fieldset>
          <Button
            clicked={e => {
              e.preventDefault();
              props.filterMovies();
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

export default Filters;
