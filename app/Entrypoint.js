/**
 * Entrypoint - Everthing starts from the entrypoint.
 */

import Navigator from './navigation';
import {Provider} from 'react-redux';
import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';

export default class Entrypoint extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return <Navigator />;
  }
}
