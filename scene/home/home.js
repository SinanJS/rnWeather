/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Linear from 'react-native-linear-gradient';
import style from './style';
import { loveU } from './love';
import imgMap from '../../assets/img';
import {
    AsyncStorage,
    Platform,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
    View,
    Dimensions
} from 'react-native';

import Echarts from 'native-echarts';
let { width, height } = Dimensions.get('window');

const styles = StyleSheet.create(style);

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.defaultColors = ['#66a7c7', '#3c90bb', '#166db7'];
        this.colorsDay = new Map();
        this.colorsNeight = new Map();
        this.colorsDay.set('晴', this.defaultColors);
        this.colorsDay.set('多云', this.defaultColors);
        this.colorsDay.set('霾', ['#AFACA7', '#807E7F', '#5E5D5B']);
        this.colorsNeight.set('晴', ['#404064', '#393A5A', '#2E2F49']);
        this.colorsNeight.set('多云', ['#404064', '#393A5A', '#2E2F49']);
        this.colorsNeight.set('霾', ['#AFACA7', '#807E7F', '#5E5D5B']);
        this.state = {
            city: {},
            week: [{}],
            today: {},
            pminfo: {},
            alarminfo: [{}],
            w24: []
        };
    }
    static navigationOptions = {
        header: null,
        headerBackTitle: '返回',
        headerTruncatedBackTitle: '返回'
    };
    setCityId(cityId) {
        AsyncStorage.setItem('cityId', JSON.stringify(cityId));
    }
    componentDidMount() {
        // this.setCityId(101010100);
        // this.setCityId(101100402);
        AsyncStorage.getItem('cityId')
            .then(cityId => {
                console.log(cityId);
                this.getWeatherInfo(cityId)
                    .then(weatherInfo => {
                        const { city, week, today, pminfo, alarminfo, w24 } = weatherInfo;
                        this.setState({
                            city,
                            week,
                            today,
                            pminfo,
                            alarminfo,
                            w24
                        })
                    });
            });
    }
    getTime() {
        const now = new Date();
        return `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}`;
    }
    wdata24hour(cityId) {
        const time = this.getTime();
        return fetch(`https://www.duba.com/wdata/24hour/${cityId}.json?t=${time}&k=pagecache&rk=2514460314499`)
            .then(res => {
                return res.json();
            })
            .then(json => {
                return json;
            })
            .catch(err => {
                console.log('fetchErr', err);
                return err;
            })
    }
    wdataForecase7d(cityId) {
        const time = this.getTime();
        return fetch(`https://www.duba.com/wdata/forecast7d/${cityId}.json?t=${time}&k=pagecache&rk=2514460314499`)
            .then(res => {
                return res.json();
            })
            .then(json => {
                return json;
            })
            .catch(err => {
                console.log('fetchErr', err);
                return err;
            })
    }
    wdataObserve(cityId) {
        const time = this.getTime();
        return fetch(`https://www.duba.com/wdata/observe/${cityId}.json?t=${time}&k=pagecache&rk=2514460314499`)
            .then(res => {
                return res.json();
            })
            .then(json => {
                return json;
            })
            .catch(err => {
                console.log('fetchErr', err);
                return err;
            })
    }
    wdataAir(cityId) {
        const time = this.getTime();
        return fetch(`https://www.duba.com/winfo/${cityId}.json?t=${time}&k=pagecache`)
            .then(res => {
                return res.json();
            })
            .then(json => {
                return json;
            })
            .catch(err => {
                console.log('fetchErr', err);
                return err;
            })
    }
    getWeatherInfo(cityId) {
        return Promise.all([
            this.wdataForecase7d(cityId),
            this.wdataObserve(cityId),
            this.wdataAir(cityId),
            this.wdata24hour(cityId)
        ])
            .then(val => {
                const weatherInfo = {
                    city: val[0].c,
                    week: val[0].f.f1,
                    today: val[1],
                    pminfo: val[2].pminfo,
                    alarminfo: val[2].alarminfo,
                    w24: val[3]
                };
                return weatherInfo
            });
    }
    // 
    getIcon(fa) {
        const now = new Date();
        if (now.getHours() > 18) {
            return imgMap[`n-${fa}`];
        }
        return imgMap[fa];
    }

    render24H({ item }) {
        let icon = imgMap[item.l5];
        if (item.h > 18) {
            icon = imgMap[`n-${item.l5}`];
        }
        return (
            <View style={styles.view24}>
                <Text style={styles.time24}>{item.h}:00</Text>
                <Image source={{ uri: icon }} style={{ width: 20, height: 20, marginTop: 10, marginBottom: 10 }} />
                <Text style={styles.du24}>{item.l1}°</Text>
            </View>
        )
    }
    bgColor(wfa) {
        const { defaultColors, colorsDay, colorsNeight } = this;
        const nowHour = new Date().getHours();
        let colors = defaultColors
        let dataMap = colorsDay;
        if (nowHour <= 6 || nowHour >= 19) {
            dataMap = colorsNeight;
        }
        colors = dataMap.get(wfa) || defaultColors;
        return colors;
    }

    echartsWeek(f6d) {
        const xAxisData = f6d.map((item) => {
            return item.w;
        });
        const maxData = f6d.map((item) => {
            return item.fc;
        });
        const minData = f6d.map((item) => {
            return item.fd;
        });
        return {
            tooltip: {
                trigger: 'axis'
            },

            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    show: false,
                    data: xAxisData
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    show: false,
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                }
            ],
            color: ['#FEBB67', '#4BC1F1', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            series: [
                {
                    name: '最高气温',
                    type: 'line',
                    data: maxData,
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: "{c}°",
                            textStyle: {
                                color: '#555'
                            }
                        },

                    },
                    smooth: true
                },
                {
                    name: '最低气温',
                    type: 'line',
                    data: minData,
                    label: {
                        normal: {
                            show: true,
                            position: 'bottom',
                            formatter: "{c}°",
                            textStyle: {
                                color: '#555'
                            }
                        }
                    },
                    smooth: true
                }
            ]
        };

    }

    render() {
        const { week, city, today, pminfo, alarminfo, w24 } = this.state;
        // const iconMap = this.iconMap();
        const f6d = week.filter((item, index) => {
            if (index === 1) {
                item.w = '明天';
            }
            if (index > 0) {
                return item;
            }
        });
        const eChartsOpt = this.echartsWeek(f6d);
        const alarmColors = new Map();
        alarmColors.set('蓝色', '#0099FF');
        alarmColors.set('黄色', '#F1B939');
        alarmColors.set('橙色', '#E67F22');
        alarmColors.set('红色', '#E84C3D');
        const { navigate } = this.props.navigation;
        // console.log('1212', this.props.navigation);
        console.log('state', this.state)
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <ScrollView>
                    <Linear colors={this.bgColor(week[0].wfa)} style={styles.weatherHead}>
                        {
                            alarminfo.length > 0
                            &&
                            <TouchableOpacity activeOpacity={1} style={styles.alarmBox} onPress={() => {
                                navigate('Alarm', { alarminfo })
                            }}>
                                {
                                    alarminfo.map((item, index) => {
                                        if (item.w5) {
                                            return (<View key={index} style={styles.alarm} >
                                                <Text style={styles.alarmTxt}>
                                                    {item.w5}{item.w7}预警
                                                </Text>
                                                <View style={{ marginRight: 7, borderRadius: 10, backgroundColor: alarmColors.get(item.w7), height: 8, width: 8 }}></View>
                                            </View>)
                                        }
                                        return null;
                                    })
                                }
                            </TouchableOpacity>
                        }
                        <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.cityTxt} onPress={() => {
                                navigate('Profile', { name: "Search" })
                            }}>
                                {city.c3 || "选择城市"}
                            </Text>
                            {/* <LocalImg source={{uri: '../../assets/img/00.png'}} style={styles.fdayImag} /> */}
                        </View>
                        <Text style={styles.cityTxtPy} >
                            {week[0].wfa}
                        </Text>
                        <View style={styles.wdataToday}>
                            <Text style={styles.todayL1}>
                                {today.l1 || 'N'}°
                            </Text>
                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                <View style={styles[`pm${pminfo['pm-level']}`]}>
                                    <Text style={style.pmTxt}>
                                        {pminfo.grade}  {pminfo.pm}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.tipView}>
                                <Text style={styles.tipTxt}>{loveU(week[0].wfa)}</Text>
                            </View>
                        </View>
                        <View style={styles.today}>
                            <View>
                                <Text style={styles.day}>
                                    今天 · {week[0].w}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.wind}>
                                    {today.wl3} · {today.wl4}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginRight: 10 }}>
                                    <Text style={styles.max}>
                                        {week[0].fc}
                                    </Text>
                                </View>
                                <Text style={styles.min}>
                                    {week[0].fd}
                                </Text>
                            </View>
                        </View>
                    </Linear>
                    <View style={styles.infoContanierFirst}>
                        {/* <View style={styles.titleView}>
                            <Text style={styles.title}>24小时天气</Text>
                        </View> */}
                        {
                            w24.length > 0 && <FlatList
                                data={w24}
                                style={styles.titleView}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false} // 隐藏水平滚动条
                                showsVerticalScrollIndicator={false} // 隐藏竖直滚动条
                                renderItem={this.render24H.bind(this)}
                                keyExtractor={() => { return Math.floor(Math.random() * 1000000).toString() }}
                            />
                        }
                    </View>
                    <View style={styles.infoContanier}>
                        {/* <View style={styles.titleView}>
                            <Text style={styles.title}>未来一周天气</Text>
                        </View> */}
                        <View style={styles.weekWeather}>
                            {
                                f6d.map((item, index) => {
                                    return (
                                        <View key={index} style={styles.fday}>
                                            <View style={styles.fdayHead}>
                                                <Text style={style.fdayName} >
                                                    {item.w}
                                                </Text>
                                            </View>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image source={{ uri: this.getIcon(item.fa) }} style={styles.fdayImag} />
                                                {/* <Image source={iconMap.get(item.wfa)} style={styles.fdayImag} /> */}
                                            </View>
                                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                                <Text style={styles.fdayName}>
                                                    {item.wfa}
                                                </Text>
                                                {/* <Text style={styles.fdayTemp}>
                                                    {item.fc}°
                                                </Text>
                                                <Text style={styles.fdayTempLow}>
                                                    {item.fd}°
                                                </Text> */}
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={styles.echarts}>
                        <Echarts option={eChartsOpt} height={220} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}
