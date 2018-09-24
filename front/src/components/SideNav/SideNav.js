import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './SideNav.scss';
import idxStyles from './../../index.scss';
import { NavLink, withRouter } from 'react-router-dom';
import { logout } from '../../store/actions/user';

const SideNav = props => {
  const classes = {
    home: 'fa fa-home',
    protected: 'fa fa-shield-alt',
    settings: 'fa fa-cogs',
    login: 'fa fa-sign-in-alt',
    logout: 'fa fa-sign-out-alt'
  };
  const loginLogout =
    props.user.role === 'Guest' ? (
      <NavLink
        to={`/login`}
        activeClassName={styles.SideNav__item_active}
        className={`${styles.SideNav__item} ${idxStyles.taL}`}
      >
        <i className={classes.login} />
        <span>Login</span>
      </NavLink>
    ) : (
      <div
        className={`${styles.SideNav__item} ${idxStyles.taL}`}
        onClick={() => {
          props.logout();
        }}
      >
        <i className={classes.logout} />
        <span>Logout</span>
      </div>
    );
  let settings =
    props.user.role === 'Admin' ? (
      <NavLink
        to={`/settings`}
        activeClassName={styles.SideNav__item_active}
        className={`${styles.SideNav__item} ${idxStyles.taL}`}
      >
        <i className={classes.settings} />
        <span>Settings</span>
      </NavLink>
    ) : null;
  let protect =
    props.user.role === 'User' || props.user.role === 'Admin' ? (
      <NavLink
        to={`/protected`}
        activeClassName={styles.SideNav__item_active}
        className={`${styles.SideNav__item} ${idxStyles.taL}`}
      >
        <i className={classes.protected} />
        <span>Protected</span>
      </NavLink>
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
        <div className={`${styles.SideNav__status} ${idxStyles.taL}`}>
          <span>You are logged as {props.user.name}.</span>
        </div>
        <NavLink
          exact
          to={`/`}
          activeClassName={styles.SideNav__item_active}
          className={`${styles.SideNav__item} ${idxStyles.taL}`}
        >
          <i className={classes.home} />
          <span>Home</span>
        </NavLink>
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

SideNav.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    isLoading: PropTypes.bool
  }),
  toggle: PropTypes.func,
  logout: PropTypes.func,
  show: PropTypes.string
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideNav)
);
