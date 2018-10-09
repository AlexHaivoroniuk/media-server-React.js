import React, { Component } from 'react';
import Movie from './../../components/UI/Movie/Movie';
import Spinner from './../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { fetchMovie } from './../../store/actions/currentMovie';
import { MovieTemplate } from '../../Template/movie';

class SingleMovie extends Component {
  componentDidMount() {
    this.props.fetch(this.props.match.params.id);
  }

  render() {
    let movie;

    if (!this.props.movie) {
      movie = <Spinner />;
    } else {
      movie = <Movie movie={this.props.movie} />;
    }
    return movie;
  }
}

const mapStateToProps = state => ({
  movie: state.currentMovie.movie
});

const mapDispatchToProps = dispatch => ({
  fetch: id => {
    dispatch(fetchMovie(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleMovie);

SingleMovie.propTypes = {
  movie: MovieTemplate
};
