import React, { Component } from 'react';
import styles from './Settings.scss';
import { connect } from 'react-redux';
import { fetchLibraries } from '../../store/actions/libraries';
import axios from 'axios';
import Input from './../UI/Input/Input';
import Icon from './../UI/Icon/Icon';
import Button from './../UI/Button/Button';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addLib: {
        name: '',
        path: ''
      }
    };
  }

  handleAddLibInput = (val, field) => {
    this.setState((prevState, props) => ({
      addLib: {
        ...prevState.addLib,
        [field]: val
      }
    }));
  };

  componentDidMount = () => {
    this.props.fetchLib();
  };

  addLibrary = data => {
    axios
      .post('http://localhost:4000/libraries', {
        name: data.name,
        path: data.path,
        uId: data.id
      })
      .then(res => {
        this.props.fetchLib();
        this.setState({ addLib: { name: '', path: '' } });
      });
  };
  deleteLibrary = id => {
    axios.delete(`http://localhost:4000/libraries/${id}`).then(res => {
      this.props.fetchLib();
    });
  };

  render() {
    let libList = <p>Libraries</p>;
    if (this.props.libraries) {
      libList = this.props.libraries.map((lib, idx) => (
        <div
          key={idx}
          className={styles.Settings__Libraries__LibrariesList__item}
        >
          <div
            className={styles.Settings__Libraries__LibrariesList__item__name}
          >
            <Icon>fa fa-folder</Icon>
            <span>{lib.name}</span>
          </div>
          <div
            className={styles.Settings__Libraries__LibrariesList__item__delete}
            onClick={() => {
              this.deleteLibrary(lib._id);
            }}
          >
            <Icon>fa fa-trash-alt</Icon>
          </div>
        </div>
      ));
    }

    let disable =
      this.state.addLib.name === '' || this.state.addLib.path === ''
        ? true
        : false;

    return (
      <div className={styles.Settings}>
        <h2>Settings</h2>
        <hr />
        <h3>
          <em>User</em>
        </h3>
        <div className={styles.Settings__User}>
          <Input
            type="text"
            label="Username"
            placeholder="Username"
            value=""
            changed={e => {
              return e.target.value;
            }}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            value=""
            changed={e => {
              return e.target.value;
            }}
          />
        </div>
        <hr />
        <h3>
          <em>Libraries</em>
        </h3>
        <div className={styles.Settings__Libraries}>
          <div className={styles.Settings__Libraries__LibrariesList}>
            {libList}
          </div>
          <div className={styles.Settings__Libraries__AddLibraries}>
            <Input
              type="text"
              label="Library name"
              placeholder="e.g. favorite"
              value={this.state.addLib.name}
              changed={e => {
                this.handleAddLibInput(e.target.value, 'name');
              }}
            />
            <Input
              type="text"
              label="Path to library"
              placeholder="e.g. /home/user/myMovies"
              value={this.state.addLib.path}
              changed={e => {
                this.handleAddLibInput(e.target.value, 'path');
              }}
            />
            <Button
              btnSize="md"
              clicked={() => {
                this.addLibrary({
                  name: this.state.addLib.name,
                  path: this.state.addLib.path,
                  id: this.props.user.id
                });
              }}
              disabled={disable}
            >
              Add library
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  libraries: state.libraries
});

const mapDispatchToProps = dispatch => ({
  fetchLib: () => {
    dispatch(fetchLibraries());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
