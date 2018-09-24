import React from 'react';
import PropTypes from 'prop-types';
import styles from './Toolbar.scss';
import idxStyles from './../../index.scss';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { logout } from '../../store/actions/user';

const Toolbar = props => {
  let classes = {
    home: 'fa fa-home',
    bars: 'fa fa-bars',
    protected: 'fa fa-shield-alt',
    settings: 'fa fa-cogs',
    login: 'fa fa-sign-in-alt',
    logout: 'fa fa-sign-out-alt'
  };

  const loginLogout =
    props.user.role === 'Guest' ? (
      <NavLink
        to={`/login`}
        activeClassName={styles.Toolbar__Menu__item_active}
        className={styles.Toolbar__Menu__item}
      >
        <div>
          <i className={classes.login} />
          <span>Login</span>
        </div>
      </NavLink>
    ) : (
      <div
        className={styles.Toolbar__Menu__item}
        onClick={() => props.logout()}
      >
        <i className={classes.logout} />
        <span>Logout</span>
      </div>
    );

  let settings =
    props.user.role === 'Admin' ? (
      <NavLink
        to={`/settings`}
        activeClassName={styles.Toolbar__Menu__item_active}
        className={styles.Toolbar__Menu__item}
      >
        <div>
          <i className={classes.settings} />
          <span> Settings</span>
        </div>
      </NavLink>
    ) : null;
  let protect =
    props.user.role === 'User' || props.user.role === 'Admin' ? (
      <NavLink
        to={`/protected`}
        activeClassName={styles.Toolbar__Menu__item_active}
        className={styles.Toolbar__Menu__item}
      >
        <div>
          <i className={classes.protected} />
          <span> Protected</span>
        </div>
      </NavLink>
    ) : null;
  return (
    <div className={styles.Toolbar}>
      <div
        className={`${styles.Toolbar__sideBarTgl} ${idxStyles.taC}`}
        onClick={props.toggle}
      >
        <i className={classes.bars} />
      </div>

      <div className={styles.Toolbar__Menu}>
        <NavLink
          exact
          to={`/`}
          activeClassName={styles.Toolbar__Menu__item_active}
          className={styles.Toolbar__Menu__item}
        >
          <div>
            <i className={classes.home} />
            <span> Home</span>
          </div>
        </NavLink>
        {protect}
        {settings}
        {loginLogout}
        <div className={styles.Toolbar__Menu__status}>
          You are logged as {props.user.name}.
        </div>
      </div>

      <div className={styles.Logo}>
        <div />
        <div />
        <div />
        <div />
      </div>
      <Link to={`/`} className={`${styles.Toolbar__title}  ${idxStyles.taR}`}>
        MediaServer
      </Link>
    </div>
  );
};

Toolbar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    isLoading: PropTypes.bool
  }),
  toggle: PropTypes.func,
  logout: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Toolbar)
);
