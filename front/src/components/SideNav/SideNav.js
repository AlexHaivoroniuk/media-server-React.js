import React from 'react';
import { connect } from 'react-redux';
import styles from './SideNav.scss';
import idxStyles from './../../index.scss';
import { Link } from 'react-router-dom';
import { logout } from '../../store/actions/user';

const sideNav = props => {
  const classes = {
    film: 'fa fa-film',
    home: 'fa fa-home',
    music: 'fa fa-music',
    protected: 'fa fa-cannabis',
    setup: 'fa fa-cogs',
    login: 'fa fa-sign-in-alt',
    logout: 'fa fa-sign-out-alt'
  };
  const loginLogout =
    props.user.role === 'Guest' ? (
      <Link to={`/login`}>
        <div className={`${styles.SideNav__item} ${idxStyles.taL}`}>
          <i className={classes.login} />
          <span>Login</span>
        </div>
      </Link>
    ) : (
      <div
        className={`${styles.SideNav__item} ${idxStyles.taL}`}
        onClick={() => props.logout()}
      >
        <i className={classes.logout} />
        <span>Logout</span>
      </div>
    );
  return (
    <div className={`${styles.SideNav} ${idxStyles.taC}`} style={props.width}>
      <div className={`${styles.SideNav__item} ${idxStyles.taL}`}>
        <span>You are logged as {props.user.name}.</span>
      </div>
      <Link to={`/`}>
        <div className={`${styles.SideNav__item} ${idxStyles.taL}`}>
          <i className={classes.home} />
          <span>Home</span>
        </div>
      </Link>
      <div className={`${styles.SideNav__item} ${idxStyles.taL}`}>
        <i className={classes.film} />
        <span>Movies</span>
      </div>
      <div className={`${styles.SideNav__item} ${idxStyles.taL}`}>
        <i className={classes.music} />
        <span>Music</span>
      </div>
      <Link to={`/protected`}>
        <div className={`${styles.SideNav__item} ${idxStyles.taL}`}>
          <i className={classes.protected} />
          <span>Protected</span>
        </div>
      </Link>
      <Link to={`/setup`}>
        <div className={`${styles.SideNav__item} ${idxStyles.taL}`}>
          <i className={classes.setup} />
          <span>Setup</span>
        </div>
      </Link>
      {loginLogout}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(sideNav);
