/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Linear from 'react-native-linear-gradient';
import style from './style';
import {
    AsyncStorage,
    Platform,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    FlatList,
    View
} from 'react-native';
const styles = StyleSheet.create(style);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.defaultColors = ['#66a7c7', '#3c90bb', '#166db7'];
        this.colorsDay = new Map();
        this.colorsNeight = new Map();
        this.colorsDay.set('晴', this.defaultColors);
        this.colorsDay.set('霾', ['#AFACA7', '#807E7F', '#5E5D5B']);
        this.colorsNeight.set('晴', ['#404064', '#393A5A', '#2E2F49']);
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
    componentDidMount() {
        AsyncStorage.getItem('cityId')
            .then(cityId => {
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
    iconMap() {
        const iconMap = new Map();
        iconMap.set('中到大雨', require('../../img//中到大雨.png'));
        iconMap.set('中到大雪', require('../../img//中到大雪.png'));
        iconMap.set('中雨', require('../../img//中雨.png'));
        iconMap.set('中雪', require('../../img//中雪.png'));
        iconMap.set('冰雹', require('../../img//冰雹.png'));
        iconMap.set('多云', require('../../img//多云.png'));
        iconMap.set('大到暴雨', require('../../img//大到暴雨.png'));
        iconMap.set('大到暴雪', require('../../img//大到暴雪.png'));
        iconMap.set('大雪', require('../../img//大雪.png'));
        iconMap.set('大雨', require('../../img//大雨.png'));
        iconMap.set('小到中雪', require('../../img//小到中雪.png'));
        iconMap.set('小到中雨', require('../../img//小到中雨.png'));
        iconMap.set('小雨', require('../../img//小雨.png'));
        iconMap.set('小雪', require('../../img//小雪.png'));
        iconMap.set('晴', require('../../img//晴.png'));
        iconMap.set('暴雨', require('../../img//暴雨.png'));
        iconMap.set('暴雪', require('../../img//暴雪.png'));
        iconMap.set('阴', require('../../img//阴.png'));
        iconMap.set('阴转晴', require('../../img//阴转晴.png'));
        iconMap.set('阵雨', require('../../img//阵雨.png'));
        iconMap.set('雨夹雪', require('../../img//雨夹雪.png'));
        iconMap.set('雷阵雨', require('../../img//雷阵雨.png'));
        iconMap.set('雷雨转晴', require('../../img//雷雨转晴.png'));
        iconMap.set('雾霾', require('../../img//雾霾.png'));
        iconMap.set('雾', require('../../img//雾.png'));
        iconMap.set('霾', require('../../img//霾.png'));
        return iconMap;
    }
    getIcon(fa) {
        return `https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/${fa}.png`
    }
    render24H({ item }) {
        return (
            <View style={styles.view24}>
                <Text style={styles.time24}>{item.h}:00</Text>
                <Image source={{ uri: `https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/${item.l5}.png` }} style={{ width: 20, height: 20, marginTop: 10, marginBottom: 10 }} />
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
    render() {
        const { week, city, today, pminfo, alarminfo, w24 } = this.state;
        const iconMap = this.iconMap();
        const f6d = week.filter((item, index) => {
            if (index === 1) {
                item.w = '明天';
            }
            if (index > 0) {
                return item;
            }
        });
        console.log('state', this.state)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Linear colors={this.bgColor(week[0].wfa)} style={styles.weatherHead}>
                        <Text style={styles.cityTxt}>
                            {city.c3}
                        </Text>
                        <Text style={styles.cityTxtPy}>
                            {week[0].wfa}
                        </Text>
                        <View style={styles.wdataToday}>
                            <Text style={styles.todayL1}>
                                {today.l1 || 'N'}°
                        </Text>
                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                <View style={styles.pm}>
                                    <Text style={style.pmTxt}>
                                        {pminfo.grade}  {pminfo.pm}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', marginTop: 20, height: 21 }}>
                                {
                                    alarminfo.length > 0
                                    &&
                                    <View style={styles.alarm}>
                                        {
                                            alarminfo.map((item, index) => {
                                                if (item.w5) {
                                                    return <Text key={index} style={styles.alarmTxt}>
                                                        {item.w5}{item.w7}预警
                                            </Text>
                                                }
                                                return null;
                                            })
                                        }
                                    </View>
                                }
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
                    <View style={styles.titleView}>
                        <Text style={styles.title}>24小时天气</Text>
                    </View>
                    {
                        w24.length > 0 && <FlatList
                            data={w24}
                            style={styles.titleView}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false} // 隐藏水平滚动条
                            showsVerticalScrollIndicator={false} // 隐藏竖直滚动条
                            renderItem={this.render24H}
                            keyExtractor={() => { return Math.floor(Math.random() * 1000000).toString() }}
                        />
                    }
                    <View style={styles.titleView}>
                        <Text style={styles.title}>未来一周天气</Text>
                    </View>
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
                                            <Text style={styles.fdayTemp}>
                                                {item.fc}°/{item.fd}°
                                        </Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

