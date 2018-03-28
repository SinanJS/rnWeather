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
            history: [],
            cityList: [],
        };
        this.timer = null;
    }
    static navigationOptions = {
        headerTitle: '选择城市',
    };
    componentDidMount() {
        AsyncStorage.getItem('history')
            .then(data => {
                this.setState({
                    history: JSON.parse(data)
                });
            });
    }
    setCityId(cityId, cb) {
        AsyncStorage.setItem('cityId', JSON.stringify(cityId), cb);
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
                // console.log('city', json);
                return json.data;
            })
    }
    setHistoryCitys(city, cb) {
        const { navigate } = this.props.navigation;
        AsyncStorage.getItem('history')
            .then(data => {
                let allow = true;
                // console.log('data1--->', data);
                if (!data) {
                    data = [];
                } else {
                    data = JSON.parse(data);
                }

                for (let i = 0; i < data.length; i++) {
                    if (data[i].id === city.id) {
                        allow = false;
                        break;
                    }
                }
                allow && data.unshift(city);
                if (data.length > 8) {
                    data.pop();
                }
                const str = JSON.stringify(data);
                AsyncStorage.setItem('history', str)
                    .then(() => {
                        navigate('Main');
                    });
            });
    }
    handleOnPress(city) {
        this.setCityId(city.id, () => {
            this.setHistoryCitys(city);
        });
    }
    render() {
        const { cityList, history } = this.state;

        return (
            <View style={sy.container}>
                <View style={sy.inputBox}>
                    <TextInput style={sy.input} placeholder="搜索市、区、县等" onChangeText={this.getInput.bind(this)} />
                </View>
                {
                    cityList.length == 0
                    &&
                    <View>
                        <Text style={sy.title}>搜索历史</Text>
                        <View style={sy.historyView}>
                            {
                                history.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} style={sy.historyCity} activeOpacity={0.9} onPress={this.handleOnPress.bind(this, item)}>
                                            <Text style={sy.historyName}>{item.name.split(',').pop()}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                }
                {
                    cityList.length > 0
                    &&
                    <FlatList
                        style={{ paddingLeft: 20, paddingRight: 20 }}
                        data={cityList}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity activeOpacity={0.9} onPress={this.handleOnPress.bind(this, item)} style={sy.cityItem}>
                                    <Text style={sy.cityName}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(city) => {
                            return city.id.toString();
                        }}
                    />
                }
            </View>
        );
    }
}
