/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Home from './scene/home/home';
import {
  AsyncStorage,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: {}
    };
  }
  componentDidMount() {
    // console.log('1231312')
  }

  setCityId(cityId) {
    AsyncStorage.setItem('cityId', JSON.stringify(cityId));
  }
  render() {
    const { weatherInfo } = this.state;
    // this.setCityId(101010100);        
    this.setCityId(101100402);
    return (
      <View>
          <StatusBar
            barStyle="light-content"
          />
          <Home weatherInfo={weatherInfo} />
      </View>
    );
  }
}
