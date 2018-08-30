import React, { Component } from 'react';
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
import { fetchFilterData } from './../../store/actions/filterData';
import { filterMovies } from './../../store/actions/movies';
import throttle from 'lodash/throttle';

export class Filters extends Component {
  constructor(props) {
    super(props);
    this.form = null;
  }

  componentDidMount = () => {
    this.props.fetchFilterData();
  };

  resetFilters = e => {
    e.preventDefault();
    this.props.clear();
    this.form.reset();
  };

  throttledRange = throttle((val, year) => {
    this.props.handleRange(val, year);
  }, 1000);

  render = () => {
    let filters = null;
    if (this.props.display) {
      filters = (
        <div className={styles.Filters}>
          <form
            action=""
            ref={node => {
              this.form = node;
            }}
          >
            <fieldset>
              <legend>Genre</legend>
              <div className={styles.Genre}>
                {this.props.list.genres.map((el, idx) => (
                  <Input
                    type="checkbox"
                    key={idx}
                    label={el}
                    value={el}
                    changed={e =>
                      this.props.handleInput(e.target.value, 'genre')
                    }
                  />
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Country</legend>
              <div className={styles.Country}>
                {this.props.list.countries.map((el, idx) => (
                  <Input
                    type="checkbox"
                    key={idx}
                    label={el}
                    value={el}
                    changed={e =>
                      this.props.handleInput(e.target.value, 'country')
                    }
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
                  value={this.props.year.minY}
                  changed={e => this.throttledRange(e.target.value, 'minY')}
                />
                <Input
                  type="text"
                  value={this.props.year.minY}
                  changed={e => this.throttledRange(e.target.value, 'minY')}
                />
                <Input
                  type="range"
                  label="Max year"
                  min="1900"
                  max="2018"
                  value={this.props.year.maxY}
                  changed={e => this.throttledRange(e.target.value, 'maxY')}
                />
                <Input
                  type="text"
                  value={this.props.year.maxY}
                  changed={e => this.throttledRange(e.target.value, 'maxY')}
                />
              </div>
            </fieldset>
            <Button
              clicked={e => {
                e.preventDefault();
                this.props.filter();
              }}
              btnSize="md"
            >
              Filter
              <Icon>fa fa-filter</Icon>
            </Button>
            <Button
              clicked={e => {
                this.resetFilters(e);
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
}

const mapStateToProps = state => ({
  display: state.filters.toggleFilters,
  year: state.filters.year,
  genre: state.filters.genre,
  country: state.filters.toggleFilters,
  list: {
    genres: state.filterData.genres,
    countries: state.filterData.countries
  }
});

const mapDispatchToProps = dispatch => ({
  clear: () => {
    dispatch(clearFilters());
  },
  fetchFilterData: () => {
    dispatch(fetchFilterData());
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
