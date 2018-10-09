import React from 'react';
import styles from './Movie.scss';
import { Link } from 'react-router-dom';
import Button from './../Button/Button';
import Icon from './../Icon/Icon';
import { TVTemplate } from './../../../Template/tv';

const TV = props => {
  const seasons =
    props.tv.NumberOf.Seasons +
    (props.tv.NumberOf.Episodes
      ? ` (${props.tv.NumberOf.Episodes} episodes)`
      : '');

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
          <Button>
            <Icon iconSize="md">fas fa-edit</Icon>
          </Button>
        </div>
        <div className={styles.LeftSide}>
          <div className={styles.Poster}>
            <img src={props.tv.Poster} alt="" />
          </div>
          <div className={styles.WatchButton}>
            <Button>Watch</Button>
          </div>
        </div>
        <div className={styles.AllInformation}>
          <div className={styles.Topside}>
            <h2 className={styles.Title}>{props.tv.Title}</h2>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Description:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.tv.Plot}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Year:</label>
            </div>
            <div className={styles.SubValue}>
              <span>
                {props.tv.Year.First}-{props.tv.Year.Last}
              </span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Genre:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.tv.Genre}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Run time:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.tv.Runtime}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Director:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.tv.Director}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Country:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.tv.Country}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Actors:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.tv.Actors}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Writer:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.tv.Writer}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Language:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.tv.Language}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Production:</label>
            </div>
            <div className={styles.SubValue}>
              <span>{props.tv.Production}</span>
            </div>
          </div>
          <div className={styles.About}>
            <div className={styles.Subtitle}>
              <label htmlFor="">Seasons: {seasons}</label>
            </div>
            <div className={styles.SubValue}>
              {props.tv.Seasons.map((season, idx) => (
                <div className={styles.Subtitle}>
                  <span>
                    {season.Number}. {season.Name}
                  </span>
                  <div className={styles.Season}>
                    <div className={styles.PosterSide}>
                      <div className={styles.Poster}>
                        <img src={season.Poster} alt="" />
                      </div>
                    </div>
                    <div className={styles.Information}>
                      <div>Episode count: {season.EpisodeCount}</div>
                      <div>Year: {season.Year}</div>
                      <div>Description: {season.Overview}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TV;

TV.propTypes = {
  tv: TVTemplate
};
