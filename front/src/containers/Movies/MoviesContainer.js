import React, { Component, Fragment } from 'react';
import styles from './MoviesContainer.scss';
import Card from './../../components/UI/Card/Card';
import axios from 'axios';
import Filters from './../../components/Filters/Filters';
import Controls from './../../components/Controls/Controls';

export default class ContentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      moviesDefault: [],
      filters: {
        genre: [],
        country: [],
        year: {
          minY: 1900,
          maxY: 2018
        }
      },
      filtersToggle: false
    };
  }

  toggleFilters = () => {
    this.setState((prevState, props) => {
      return {
        filtersToggle: !prevState.filtersToggle
      };
    });
  };

  filtersHandler = (e, filter) => {
    let newArr = [];
    // console.log(this.state.filters[filter]);
    if (this.state.filters[filter]) {
      newArr = [...this.state.filters[filter]];
    } else {
      newArr = [];
    }
    if (newArr.includes(e.target.value)) {
      newArr.splice(newArr.indexOf(e.target.value), 1);
    } else {
      newArr.push(e.target.value);
    }
    console.log('Checkboxes', newArr);
    this.setState({
      filters: {
        ...this.state.filters,
        [filter]: newArr
      }
    });
  };

  sortAZ = sortOrder => {
    const moviesSorted = this.state.movies.slice().sort(function(a, b) {
      if (sortOrder === 0) [b, a] = [a, b];
      if (a.Title > b.Title) return -1;
      if (a.Title < b.Title) return 1;
      return 0;
    });
    this.setState({
      movies: moviesSorted
    });
  };

  clearFilters = () => {
    this.setState((prevState, props) => ({
      movies: prevState.moviesDefault,
      filters: {
        country: [],
        genre: [],
        year: {
          minY: 1900,
          maxY: 2018
        }
      }
    }));
  };

  filterMovies = () => {
    // const filteredMovies = this.filterBy(
    //   this.filterBy(this.filterBy(this.state.moviesDefault.slice(), 'genre'), 'country'),
    //   'year'
    // );
    const filterGenre = this.filterBy(
      this.state.moviesDefault.slice(),
      'genre'
    );
    console.log('filterGenre :', filterGenre);
    const filterCountry = this.filterBy(filterGenre, 'country');
    console.log('filterCountry :', filterCountry);
    const filterYear = this.filterBy(filterCountry, 'year');
    console.log('filterYear :', filterYear);
    const filteredMovies = filterYear;
    // console.log(filteredMovies);
    this.setState({
      movies: filteredMovies
    });
    setTimeout(() => {
      console.log('Movies', this.state.movies);
    }, 500);
  };
  /**
   * curMovies - list of movies (Array of Obj)
   * field     - string value to filter by (value from data > filters)
   */
  filterBy = (curMovies, field) => {
    // console.log(field)
    console.log('curMovies', curMovies);
    if (field === 'year') {
      return curMovies.filter(elem => {
        let Year = elem.Year;
        // console.log('year', Year)
        if (elem.Type === 'series') {
          Year = elem.Year.slice(0, 4);
          // console.log(Year)
          // console.log(this.state.filters.year)
          // console.log(Year < this.state.filters.year.maxY)
          // console.log(Year > this.state.filters.year.minY);
        }
        if (
          Year < this.state.filters.year.maxY &&
          Year > this.state.filters.year.minY
        )
          return true;
        else return false;
      });
    }
    if (this.state.filters[field].length === 0) return curMovies;
    return curMovies.filter(elem => {
      let fieldArr = elem[field[0].toUpperCase() + field.slice(1)]
        .toLowerCase()
        .split(',');
      let hasField =
        fieldArr
          .map(el => {
            return this.state.filters[field]
              .join(',')
              .toLowerCase()
              .includes(el.trim());
          })
          .filter(el => el === true).length ===
        this.state.filters[field].length;

      if (hasField) return true;
      else return false;
    });
  };

  rangeHandler = (e, year) => {
    this.setState({
      filters: {
        ...this.state.filters,
        year: {
          ...this.state.filters.year,
          [year]: e.target.value
        }
      }
    });
  };

  fetchMovies = () => {
    axios
      .get('http://localhost:4000/movies')
      .then(res => res.data)
      .then(data => {
        this.setState({
          movies: data.filter(movie => {
            if (movie.Title !== undefined) return true;
            return false;
          })
        });
        this.setState((prevState, props) => ({
          moviesDefault: prevState.movies
        }));
        console.log('movies', this.state.movies);
        console.log('moviesDefault', this.state.moviesDefault);
        return null;
      })
      .catch(err => console.error(err));
  };

  componentDidMount = () => {
    this.fetchMovies();
  };

  render() {
    return (
      <Fragment>
        <Controls toggle={this.toggleFilters} sortAZ={this.sortAZ} />
        <Filters
          toggle={this.state.filtersToggle}
          filters={this.state.filters}
          filtersHandler={this.filtersHandler}
          rangeHandler={this.rangeHandler}
          filterMovies={this.filterMovies}
          clearFilters={this.clearFilters}
        />
        <div className={styles.Movies}>
          {this.state.movies.map((movie, idx) => (
            <Card key={idx} movie={movie} />
          ))}
        </div>
      </Fragment>
    );
  }
}
