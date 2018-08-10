import React, { Component } from 'react';
import styles from './ContentContainer.scss';
import Card from '../../UI/Card/Card';
import axios from 'axios';
import Input from './../../UI/Input/Input';

export default class ContentContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
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
      genreFilters: []
    }
  }

  genreHandler = (e) => {
    let genreArr = [];
    if(this.state.genreFilters) {
      genreArr = [...this.state.genreFilters]
    } else {
      genreArr = []
    }
    if (genreArr.includes(e.target.value)) {
      genreArr.splice(genreArr.indexOf(e.target.value), 1);
    } else {
      genreArr.push(e.target.value)
    }
    this.setState({
      genreFilters: genreArr
    });
    console.log(e.target.value)
    console.log(genreArr);
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
        <div>Filters
        <fieldset>
          <legend>Genre</legend>
            <div className={styles.Genre}>
              {this.state.genre.map((el, idx) => (
                <Input
                  type="checkbox"
                  key={idx}
                  label={el}
                  value={el}
                  changed={this.genreHandler}
                />
              ))}
            </div>
          </fieldset>
        </div>
        <div className={styles.Movies}>
          {this.state.movies.map((movie, idx) => (
            <Card key={idx} movie={movie} />
          ))}
        </div>
      </div>
    )
  }
}


// movies.map((card, idx) => (<Card key={idx} movie={card}/>))