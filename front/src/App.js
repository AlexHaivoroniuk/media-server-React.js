import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import MoviesContainer from './containers/Movies/MoviesContainer';
import SingleMovie from './containers/SingleMovie/SingleMovie';
import ContentContainer from './containers/Content/ContentContainer';
import SideNav from './components/SideNav/SideNav';

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
    this.setState((prevState, props) => ({
      style: { width: prevState.style.width === '0px' ? '250px' : '0px' }
    }));
  };

  render() {
    return (
      <Fragment>
        <Toolbar toggle={this.toggleNav} />
        <SideNav width={this.state.style} />
        <ContentContainer>
          <React.Fragment>
            <Route exact path="/" component={MoviesContainer} />
            <Route path="/:id" component={SingleMovie} />
          </React.Fragment>
        </ContentContainer>
      </Fragment>
    );
  }
}

export default App;
