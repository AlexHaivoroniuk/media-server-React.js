import React, { Component, Fragment } from 'react';
import styles from './MoviesContainer.scss';
import CardMovie from './../../components/UI/Card/Movie/Movie';
import CardTV from './../../components/UI/Card/TV/TV';
import Filters from './../../components/Filters/Filters';
import Controls from './../../components/Controls/Controls';
import Spinner from './../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { fetchMovies } from './../../store/actions/movies';
import PropTypes from 'prop-types';
import { MovieTemplate } from './../../Template/movie';

class MoviesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
  }

  /*tglModal = () => {
    this.setState((prevState, props) => ({ modal: !prevState.modal }));
  };*/
  componentDidMount = () => {
    this.props.fetch();
  };

  render() {
    let list = <Spinner />;
    if (this.props.movies) {
      list = (
        <div className={styles.Movies}>
          {this.props.movies.map(
            (movie, idx) =>
              movie.Type === 'tv' ? (
                <CardTV key={idx} tv={movie} />
              ) : (
                <CardMovie key={idx} movie={movie} />
              )
          )}
        </div>
      );
    }
    return (
      <Fragment>
        <Controls />
        <Filters />
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
