import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Settings.scss';
import UserList from './../Auth/setupUsers/List/List';
import Libraries from './Libraries/Libraries';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentIdx: 'libraries'
    };
  }
  settingsList = [
    { idx: 'users', value: 'Users' },
    { idx: 'libraries', value: 'Libraries' }
  ];
  handleTab = idx => {
    this.setState({ contentIdx: idx });
  };
  render() {
    let contentObject = {
      users: <UserList />,
      libraries: <Libraries />
    };
    return (
      <div className={styles.Settings}>
        <div className={styles.Settings__list}>
          {this.settingsList.map((el, idx) => (
            <div
              className={styles.Settings__list__item}
              key={idx}
              onClick={() => {
                this.handleTab(el.idx);
              }}
            >
              {el.value}
            </div>
          ))}
        </div>
        <div className={styles.Settings__content}>
          {contentObject[this.state.contentIdx]}
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    isLoading: PropTypes.bool
  }),
  libraries: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      path: PropTypes.string,
      userId: PropTypes.string
    })
  )
};

export default Settings;
