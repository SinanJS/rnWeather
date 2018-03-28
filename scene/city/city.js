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
    FlatList,
    TouchableOpacity,
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
    setCityId(cityId) {
        AsyncStorage.setItem('cityId', JSON.stringify(cityId));
        console.log('saved', cityId)
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
                                id: parseInt(id),
                                name: json.internal[id]
                            }
                        });
                        this.setState({
                            cityList
                        });
                    })
            }, 1000);
        } else {
            this.setState({
                cityList: []
            });
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
    handleOnPress(cityId) {
        this.setCityId(cityId);
    }
    render() {
        const { cityList } = this.state;
        return (
            <View style={sy.container}>
                <View style={sy.inputBox}>
                    <TextInput style={sy.input} placeholder="搜索市、区、县等" onChangeText={this.getInput.bind(this)} />
                </View>

                {
                    cityList.length > 0
                    &&
                    <FlatList
                        style={{ paddingLeft: 20, paddingRight: 20 }}
                        data={cityList}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity activeOpacity={0.9} onPress={this.handleOnPress.bind(this, item.id)} style={sy.cityItem}>
                                    <Text style={sy.cityName}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(city) => {
                            return city.id;
                        }}
                    />
                }
            </View>
        );
    }
}
