import React, { Component } from 'react';
import Movie from './../../components/UI/Movie/Movie';
import Spinner from './../../components/UI/Spinner/Spinner';
import axios from 'axios';

class SingleMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: []
    };
  }
  fetchMovies() {
    axios
      .get(`http://localhost:4000/movies/${this.props.match.params.id}`)
      .then(res => {
        this.setState(
          {
            movie: res.data
          },
          () => {}
        );
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.fetchMovies();
  }

  render() {
    let movie = <Spinner />;
    if (this.state.movie) {
      movie = <Movie movie={this.state.movie} />;
    }

    return movie;
  }
}

export default SingleMovie;
