import React from 'react';
import styles from './Movie.scss';
import { Link } from 'react-router-dom';
import Button from './../Button/Button';
import Icon from './../Icon/Icon';

const Movie = props => {
  console.log(props);
  return (
    <div className={styles.MovieContainer}>
      <div className={styles.BackLink}>
        <Link to={`/`}>
          <Button>
            <Icon iconSize="md">fa fa-chevron-left</Icon>
          </Button>
        </Link>
      </div>
      <div className={styles.Movie}>
        <div className={styles.EditIcon}>
          <button>
            <i className="fas fa-edit" />
          </button>
        </div>
        <div className={styles.LeftSide}>
          <div className={styles.Poster}>
            <img src={props.movie.Poster} alt="" />
          </div>
          <div className={styles.WatchButton}>
            <button>Watch</button>
          </div>
        </div>
        <div className={styles.AllInformation}>
          <div className={styles.Topside}>
            <h2 className={styles.Title}>{props.movie.Title}</h2>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Description:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.movie.Plot}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Year:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.movie.Year}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Genre:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.movie.Genre}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Director:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.movie.Director}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Country:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.movie.Country}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Actors:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.movie.Actors}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Rated:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.movie.Rated}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Writer:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.movie.Writer}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Language:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.movie.Language}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Awards:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.movie.Awards}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">IMDBRating:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.movie.imdbRating}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Production:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.movie.Production}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Released:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.movie.Released}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
