import React, { Component } from 'react';
import styles from './ContentContainer.scss';
import Card from '../../UI/Card/Card';
import axios from 'axios';

export default class ContentContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    }
  }

  fetchMovies = () => {
    axios.get('http://localhost:4000/movies')
      .then(res => res.data)
      .then(data => {
        this.setState({
          movies: data.filter((movie) => {
            if (movie.Title !== undefined) return true
            return false;
          })
        })
        console.log(this.state.movies);
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
            {this.state.movies.map((movie, idx) => (
              <Card key={idx} movie={movie}/>
            ))}
        </div>
      </div>
    )
  }
}


// movies.map((card, idx) => (<Card key={idx} movie={card}/>))