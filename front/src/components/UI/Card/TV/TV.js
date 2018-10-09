import React from 'react';
import styles from '../Card.scss';
import { Link } from 'react-router-dom';
// import idxStyles from './../../index.scss'
import { TVTemplate } from '../../../../Template/tv';

const CardTV = props => {
  const originalTitle =
    props.tv.OriginalTitle && props.tv.OriginalTitle !== props.tv.Title ? (
      <div className={styles.About}>
        <label htmlFor="">Original Title:</label>
        <span>{props.tv.OriginalTitle}</span>
      </div>
    ) : null;
  const seasons =
    props.tv.NumberOf.Seasons +
    (props.tv.NumberOf.Episodes
      ? ` (${props.tv.NumberOf.Episodes} episodes)`
      : '');
  return (
    <div className={styles.Card}>
      <div className={styles.CardContainer}>
        <div className={styles.Info}>
          <div className={styles.Poster}>
            <img src={props.tv.Poster} alt="" />
          </div>
          <div className={styles.Topside}>
            <h2 className={styles.Title}>{props.tv.Title}</h2>
          </div>
          {originalTitle}
          <div className={styles.About}>
            <label htmlFor="">Seasons:</label>
            <span>{seasons}</span>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Run time:</label>
            <span>{props.tv.Runtime}</span>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Description:</label>
            <span>{props.tv.Plot}</span>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Years:</label>
            <span>
              {props.tv.Year.First}-{props.tv.Year.Last}
            </span>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Genre:</label>
            <span>{props.tv.Genre}</span>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Country:</label>
            <span>{props.tv.Country}</span>
          </div>
          <div className={styles.About}>
            <label htmlFor="">Actors:</label>
            <span>{props.tv.Actors}</span>
          </div>
        </div>
      </div>
      <div className={styles.Options}>
        <button>Watch</button>
        <Link to={`/tv/${props.tv._id}`}>Read more...</Link>
      </div>
    </div>
  );
};

export default CardTV;

CardTV.propTypes = {
  tv: TVTemplate
};
