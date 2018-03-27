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
            testText: '',
            cityList: [],
        };
        this.timer = null;
    }
    static navigationOptions = {
        headerTitle: '选择城市',
    };
    componentDidMount() {
        // console.log('1231312')
    }
    getInput(txt) {
        const reg = /^[\u4e00-\u9fa5]+/;
        if (reg.test(txt)) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.getCityList(txt)
                    .then(json => {
                        const cityIdArr = Object.keys(json.internal);
                        const cityList = cityIdArr.map(id => {
                            return {
                                id,
                                name: json.internal[id]
                            }
                        });
                        this.setState({
                            cityList
                        });
                        console.log('ci', cityList)
                    })
            }, 1000);
        }
    }
    getCityList(txt) {
        return fetch(`https://wis.qq.com/city/matching?source=xw&city=${encodeURI(txt)}`)
            .then(res => res.json())
            .then(json => {
                console.log('city', json);
                return json.data;
            })
    }
    render() {
        const { cityList } = this.state;
        return (
            <View style={sy.container}>
                <View style={sy.inputBox}>
                    <TextInput style={sy.input} onChangeText={this.getInput.bind(this)} />
                </View>
                {
                    cityList.length > 0 && cityList.map(city => {
                        return <Text key={city.id}>{city.name}</Text>
                    })
                }
            </View>
        );
    }
}
