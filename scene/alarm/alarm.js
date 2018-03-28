/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import style from './style';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    TextInput
} from 'react-native';
const sy = StyleSheet.create(style);
export default class CityScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.timer = null;
        const colors = new Map();
        colors.set('蓝色', '#0099FF');
        colors.set('黄色', '#F1B939');
        colors.set('橙色', '#E67F22');
        colors.set('红色', '#E84C3D');
        this.colors = colors;
    }
    static navigationOptions = {
        headerTitle: '气象预警',
    };
    componentDidMount() {
        // console.log('1231312')
    }
    getColor(txt) {
        if (txt) {
            return this.colors.get(txt);
        }
        return '#3ea50d';
    }
    render() {
        const { navigate, getParam } = this.props.navigation;
        const { cityList } = this.state;
        const alarminfo = getParam('alarminfo');
        console.log('alarminfo', alarminfo)
        return (
            <View style={sy.container}>
                {
                    alarminfo.length > 0
                    &&
                    alarminfo.map((item, index) => {
                        return (
                            <View key={index}>
                                <View style={{ backgroundColor: this.getColor(item.w7), padding: 5, paddingLeft: 10, borderWidth:1,borderColor:this.getColor(item.w7),borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>
                                    <Text style={sy.alarmTitle}>{item.w5}{item.w7}预警</Text>
                                </View>
                                <View style={sy.alarmTxtBox}>
                                    <Text style={sy.alarmTxt}>{item.w9}</Text>
                                </View>
                            </View>
                        );
                    })
                }
            </View>
        );
    }
}
