import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import MoviesContainer from './containers/Movies/MoviesContainer';
import setupUsers from './components/Auth/setupUsers/setupUsers';
import SingleMovie from './containers/SingleMovie/SingleMovie';
import SingleTV from './containers/SingleTV/SingleTV';
import ContentContainer from './containers/Content/ContentContainer';
import SideNav from './components/SideNav/SideNav';
import { connect } from 'react-redux';
import { notifStreamConnect, removeNotifById } from './store/actions/notify';
import SnackBar from './components/UI/SnackBar/SnackBar';
import styles from './App.scss';
import {
  // userIsAuthenticated,
  userIsAuthenticatedRedir,
  // userIsNotAuthenticated,
  userIsNotAuthenticatedRedir,
  userIsAdminRedir
} from './auth';

import SettingsComponent from './components/Settings/Settings';
import ProtectedComponent from './components/Protected';
import LoginComponent from './components/Auth/Login';

// Need to apply the hocs here to avoid applying them inside the render method
const Login = userIsNotAuthenticatedRedir(LoginComponent);
const Protected = userIsAuthenticatedRedir(ProtectedComponent);
const Settings = userIsAuthenticatedRedir(userIsAdminRedir(SettingsComponent));
const Setup = userIsAuthenticatedRedir(userIsAdminRedir(setupUsers));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: '0px',
      display: 'none'
    };
  }

  componentDidMount = () => {
    this.props.notifyConnect();
  };

  toggleNav = () => {
    this.setState((prevState, props) => ({
      style: prevState.style === '0px' ? '250px' : '0px',
      display: prevState.display === 'none' ? 'block' : 'none'
    }));
  };

  render() {
    let notifications = <div />;
    if (this.props.notif.length > 0) {
      notifications = (
        <div className={styles.NotifWrapper}>
          {this.props.notif.map((item, idx) => (
            <SnackBar
              key={item.id}
              message={item.message}
              type={item.type}
              clicked={() => {
                this.props.removeNotif(item.id);
              }}
            />
          ))}
        </div>
      );
    }
    return (
      <Fragment>
        <Toolbar toggle={this.toggleNav} />
        <SideNav
          width={this.state.style}
          toggle={this.toggleNav}
          show={this.state.display}
        />
        <ContentContainer>
          <Switch>
            <Route exact path="/" component={MoviesContainer} />
            <Route path="/login" component={Login} />
            <Route path="/protected" component={Protected} />
            <Route path="/settings" component={Settings} />
            <Route path="/setup" component={Setup} />
            <Route path="/movie/:id" component={SingleMovie} />
            <Route path="/tv/:id" component={SingleTV} />
          </Switch>
        </ContentContainer>
        {notifications}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notif: state.notify,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  notifyConnect: () => {
    dispatch(notifStreamConnect());
  },
  removeNotif: id => {
    dispatch(removeNotifById(id));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
