import React, { Component } from 'react';
import TV from './../../components/UI/Movie/TV';
import Spinner from './../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { fetchTV } from './../../store/actions/currentTV';
import { TVTemplate } from '../../Template/tv';

class SingleTV extends Component {
  componentDidMount() {
    this.props.fetch(this.props.match.params.id);
  }

  render() {
    let tv;

    if (!this.props.tv) {
      tv = <Spinner />;
    } else {
      tv = <TV tv={this.props.tv} />;
    }
    return tv;
  }
}

const mapStateToProps = state => ({
  tv: state.currentTV.tv
});

const mapDispatchToProps = dispatch => ({
  fetch: id => {
    dispatch(fetchTV(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTV);

SingleTV.propTypes = {
  tv: TVTemplate
};
