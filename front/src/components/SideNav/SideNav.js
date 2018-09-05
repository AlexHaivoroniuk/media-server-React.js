import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './SideNav.scss';
import idxStyles from './../../index.scss';
import { Link } from 'react-router-dom';
import { logout } from '../../store/actions/user';

const sideNav = props => {
  const classes = {
    home: 'fa fa-home',
    protected: 'fa fa-shield-alt',
    settings: 'fa fa-cogs',
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
  let settings =
    props.user.role === 'Admin' ? (
      <Link to={`/settings`}>
        <div className={`${styles.SideNav__item} ${idxStyles.taL}`}>
          <i className={classes.settings} />
          <span>Settings</span>
        </div>
      </Link>
    ) : null;
  let protect =
    props.user.role === 'User' || props.user.role === 'Admin' ? (
      <Link to={`/protected`}>
        <div className={`${styles.SideNav__item} ${idxStyles.taL}`}>
          <i className={classes.protected} />
          <span>Protected</span>
        </div>
      </Link>
    ) : null;
  return (
    <Fragment>
      <div
        className={styles.SideNav__Backdrop}
        onClick={() => {
          props.toggle();
        }}
        style={{
          display: props.show
        }}
      />
      <div
        className={`${styles.SideNav} ${idxStyles.taC}`}
        style={{ width: props.width }}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className={`${styles.SideNav__item} ${idxStyles.taL}`}>
          <span>You are logged as {props.user.name}.</span>
        </div>
        <Link to={`/`}>
          <div className={`${styles.SideNav__item} ${idxStyles.taL}`}>
            <i className={classes.home} />
            <span>Home</span>
          </div>
        </Link>
        {protect}
        {settings}
        {loginLogout}
      </div>
    </Fragment>
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
