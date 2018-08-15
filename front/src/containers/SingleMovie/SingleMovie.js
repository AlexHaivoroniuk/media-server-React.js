import React, { Component } from 'react';
import styles from './SingleMovie.scss';
import Card from '../../UI/Card/Card';
import axios from 'axios';
 
class SingleMovie extends Component {

  constructor(props) {
    super(props);
    console.log(this)
    this.state = {
      movies: [],
    }
  }

  fetchMovies = () => {
    axios.get(`http://localhost:4000/movies/${this.props.match.params.id}`)
      .then(res => res.data)
      .then(data => {
        this.setState({
          movie: data
        })
        console.log(this.state.movie);
        return null;
      })
      .catch(err => console.error(err));
  }

  componentDidMount = () => {
    this.fetchMovies();
  }
  

  render() {
    return (
      <div className={styles.ContentContainer}> 
        <div className = {styles.Movies}>
           <Card movie={this.state.movie}/>
        </div>
      </div>
    )
  }
}

export default SingleMovie; 