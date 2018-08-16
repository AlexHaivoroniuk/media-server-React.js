import React, { Component } from 'react';
import Movie from './../../components/UI/Movie/Movie';
import axios from 'axios';

class SingleMovie extends Component {
  constructor(props) {
    super(props);
    console.log(this);
    this.state = {
      movie: []
    };
    this.fetchMovies();
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

  // componentDidMount() {

  // }

  render() {
    return <Movie movie={this.state.movie} />;
  }
}

export default SingleMovie;
