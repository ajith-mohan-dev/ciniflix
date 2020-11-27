import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import AppStyles from '../utils/AppStyles';
import {Container, Header, Content, Spinner} from 'native-base';

class Loader extends Component {
  constructor(props) {
    super(props);
    console.log(this.constructor.name, 'constructor');
  }

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: AppStyles.color.COLOR_LOADER,
        }}>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: AppStyles.color.COLOR_TRANSP,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            overflow: 'hidden',
          }}></View>
        <Spinner color={AppStyles.color.COLOR_PISTA} />
      </View>
    );
  }
}

export default Loader;
