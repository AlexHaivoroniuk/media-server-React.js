import React from 'react';
import styles from '../Card.scss';
import { Link } from 'react-router-dom';
// import idxStyles from './../../index.scss'
import { MovieTemplate } from '../../../../Template/movie';

const CardMovie = props => {
  return (
    <div className={styles.Card}>
      <div className={styles.CardContainer}>
        <div className={styles.Info}>
          <div className={styles.Poster}>
            <img src={props.movie.Poster} alt="" />
          </div>
          <div className={styles.Topside}>
            <h2 className={styles.Title}>{props.movie.Title}</h2>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Description:</label>
            <span>{props.movie.Plot}</span>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Year:</label>
            <span>{props.movie.Year}</span>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Genre:</label>
            <span>{props.movie.Genre}</span>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Director:</label>
            <span>{props.movie.Director}</span>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Country:</label>
            <span>{props.movie.Country}</span>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Actors:</label>
            <span>{props.movie.Actors}</span>
          </div>
        </div>
      </div>
      <div className={styles.Options}>
        <button>Watch</button>
        <Link to={`/movie/${props.movie._id}`}>Read more...</Link>
      </div>
    </div>
  );
};

export default CardMovie;

CardMovie.propTypes = {
  movie: MovieTemplate
};
