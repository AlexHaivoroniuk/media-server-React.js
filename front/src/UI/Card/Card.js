import React from "react";
import styles from './Card.scss';
import idxStyles from './../../index.scss'

const Card = () => {
  return (
    <div className = {styles.Card}>
        <div className = {styles.CardContainer}>
        <div className={styles.Poster}>
            <img
                src="https://m.media-amazon.com/images/M/MV5BYzc5MTU4N2EtYTkyMi00NjdhLTg3NWEtMTY4OTEyMzJhZTAzXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
                alt=""
            />
            </div>
            <div className = {styles.Topside}>
                <h2 className={styles.Title}>Logan</h2>
            </div>
            <div className={styles.About}>
            <label htmlFor="">Description:</label>
            <span>
                In the near future, a weary Logan cares for an ailing Professor X,
                somewhere on the Mexican border. However, Logan's attempts to hide
                from the world, and his legacy, are upended when a young mutant
                arrives, pursued by dark forces.
            </span>
            </div>
            <div className={styles.About}>
            <label htmlFor="">Year:</label>
            <span>2017</span>
            </div>
            <div className={styles.About}>
            <label htmlFor="">Genre:</label>
            <span>Action, Drama, Sci-Fi</span>
            </div>
            <div className={styles.About}>
            <label htmlFor="">Director:</label>
            <span>James Mangold</span>
            </div>
            <div className={styles.About}>
            <label htmlFor="">Country:</label>
            <span>USA</span>
            </div>
            <div className={styles.About}>
            <label htmlFor="">Actors:</label>
            <span>Hugh Jackman, Patrick Stewart, Dafne Keen, Boyd Holbrook</span>
            </div>
            <div className={styles.Options}>
                <button>Watch</button>
                <a href="">Read more...</a>
            </div>
        </div>
    </div>
  );
};

export default Card;
