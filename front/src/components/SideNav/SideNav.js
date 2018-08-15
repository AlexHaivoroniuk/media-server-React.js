import React from 'react';
import styles from './SideNav.scss';
import idxStyles from './../../index.scss';

const sideNav = props => {
  const classes = {
    film: 'fa fa-film',
    home: 'fa fa-home',
    music: 'fa fa-music'
  };
  return (
    <div className={`${styles.SideNav} ${idxStyles.taC}`} style={props.width}>
      <div className={`${styles.SideNav__item} ${idxStyles.taL}`}>
        <i className={classes.home} />
        <span>Home</span>
      </div>
      <div className={`${styles.SideNav__item} ${idxStyles.taL}`}>
        <i className={classes.film} />
        <span>Movies</span>
      </div>
      <div className={`${styles.SideNav__item} ${idxStyles.taL}`}>
        <i className={classes.music} />
        <span>Music</span>
      </div>
    </div>
  );
};

export default sideNav;
