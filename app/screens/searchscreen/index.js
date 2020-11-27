import React, {Component} from 'react';
import SearchScreen from './Searchscreen';
import {connect} from 'react-redux';

class SearchScreenContainer extends Component {
  constructor(props) {
    super(props);
    console.log(this.constructor.name, 'constructor');
  }

  render() {
    return <SearchScreen {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchScreenContainer);
