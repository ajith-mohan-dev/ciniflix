import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import SearchScreen from '../screens/searchscreen/Searchscreen';
import EpisodeScreen from '../screens/episodescreen/Episodescreen';

function AppStack() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="EpisodeScreen" component={EpisodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
