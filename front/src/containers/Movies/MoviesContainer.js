import React, { Component, Fragment } from 'react';
import styles from './MoviesContainer.scss';
import Card from './../../components/UI/Card/Card';
import Filters from './../../components/Filters/Filters';
import Controls from './../../components/Controls/Controls';
import Spinner from './../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { fetchMovies } from './../../store/actions/movies';
import PropTypes from 'prop-types';
import { MovieTemplate } from './../../MovieTemplate/movieTemplate';

class MoviesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
  }

  tglModal = () => {
    this.setState((prevState, props) => ({ modal: !prevState.modal }));
  };
  componentDidMount = () => {
    this.props.fetch();
  };

  render() {
    let list = <Spinner />;
    if (this.props.movies) {
      list = (
        <div className={styles.Movies}>
          {this.props.movies.map((movie, idx) => (
            <Card key={idx} movie={movie} />
          ))}
        </div>
      );
    }
    return (
      <Fragment>
        <Controls toggle={this.toggleFilters} sortAZ={this.sortAZ} />
        <Filters
          filtersHandler={this.filtersHandler}
          rangeHandler={this.rangeHandler}
        />
        {list}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
  moviesDefault: state.movies.moviesDefault
});

const mapDispatchToProps = dispatch => ({
  fetch: () => {
    dispatch(fetchMovies());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesContainer);

MoviesContainer.propTypes = {
  movies: PropTypes.arrayOf(MovieTemplate)
};
