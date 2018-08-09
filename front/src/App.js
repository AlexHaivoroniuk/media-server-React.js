import React, { Component, Fragment } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import ContentContainer from './containers/ContentContainer';
import MoviesContainer from './containers/MoviesContainer';
import MusicContainer from './containers/MusicContainer';
import HomePage from './components/HomePage';

import SideNav from './components/SideNav/SideNav';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      style: {
        width: '0px'
      }
    };
  }

  toggleNav = () => {
    this.setState((prevState, props) => ({ style: { width:  prevState.style.width === '0px' ? '250px' : '0px'} }));
  }

  render() {
    return (
      <Fragment>
        <Toolbar toggle={this.toggleNav}/>
        <SideNav width={this.state.style} ></SideNav>
        <ContentContainer>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/movies" component={MoviesContainer}/>
            <Route exact path="/music" component={MusicContainer}/>
          </Switch>
        </ContentContainer>
      </Fragment>  
    );
  }
}

export default App;
