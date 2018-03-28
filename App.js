/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import HomeScreen from './scene/home/home';
import CityScreen from './scene/city/city';
import AlarmScreen from './scene/alarm/alarm';
import {
  AsyncStorage,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

const App = StackNavigator({
  Main: { screen: HomeScreen },
  Profile: { screen: CityScreen },
  Alarm: { screen: AlarmScreen },
},{
  headerMode:'float',
  mode:'card',
});
module.exports = App;
// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       weatherInfo: {}
//     };
//   }
//   componentDidMount() {
//     // console.log('1231312')
//   }

//   setCityId(cityId) {
//     AsyncStorage.setItem('cityId', JSON.stringify(cityId));
//   }
//   render() {
//     const { weatherInfo } = this.state;
//     // this.setCityId(101010100);        
//     this.setCityId(101100402);
//     return (
//       <View>
//         <StatusBar
//           barStyle="light-content"
//         />
//         <HomeScreen weatherInfo={weatherInfo} />
//       </View>
//     );
//   }
// }
