import React from 'react';
import styles from '../Card.scss';
import { Link } from 'react-router-dom';
// import idxStyles from './../../index.scss'
import { TVTemplate } from '../../../../Template/tv';

const CardTV = props => {
  const originalt =
    props.movie.OriginalTitle !== props.movie.Title ? (
      <div className={styles.About}>
        <label htmlFor="">Original Title:</label>
        <span>{props.movie.OriginalTitle}</span>
      </div>
    ) : null;
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
          {originalt}
          <div className={styles.About}>
            <label htmlFor="">Seasons:</label>
            <span>
              {props.movie.NumberOf.Seasons} {props.movie.NumberOf.Episodes}
            </span>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Description:</label>
            <span>{props.movie.Plot}</span>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Years:</label>
            <span>
              {props.movie.Year.First}-{props.movie.Year.Last}
            </span>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Genre:</label>
            <span>{props.movie.Genre}</span>
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
        <Link to={`/tv/${props.movie._id}`}>Read more...</Link>
      </div>
    </div>
  );
};

export default CardTV;

CardTV.propTypes = {
  movie: TVTemplate
};
