const weatherType = new Map();
weatherType.set('中到大雨', 'rain');
weatherType.set('中到大雪', 'snow');
weatherType.set('中雨', 'rain');
weatherType.set('中雪', 'snow');
weatherType.set('冰雹', 'ice');
weatherType.set('多云', 'sun');
weatherType.set('大到暴雨', 'rain');
weatherType.set('大到暴雪', 'snow');
weatherType.set('大雪', 'snow');
weatherType.set('大雨', 'rain');
weatherType.set('小到中雪', 'snow');
weatherType.set('小到中雨', 'rain');
weatherType.set('小雨', 'rain');
weatherType.set('小雪', 'snow');
weatherType.set('晴', 'sun');
weatherType.set('暴雨', 'rain');
weatherType.set('暴雪', 'snow');
weatherType.set('阴', 'yin');
weatherType.set('阴转晴', 'yin');
weatherType.set('阵雨', 'rain');
weatherType.set('雨夹雪', 'snow');
weatherType.set('雷阵雨', 'rain');
weatherType.set('雷雨转晴', 'rain');
weatherType.set('雾霾', 'badair');
weatherType.set('雾', 'badair');
weatherType.set('霾', 'badair');

const weatherJu = {
    rain: [
        '今天有雨哦🌧',
        '出门别忘带伞啊☂️',
        '天气凉啦',
        '下雨啦🌧',
        '雨林沐风',
        '天凉了，别感冒了🌧',
        '出门多穿点',
        '这个天气适合睡觉哦',
        '宿舍冷不冷',
        '晚上睡觉盖好被纸🌙',
        '起风啦️💨',
        '轰隆隆⚡️️️⚡️'
    ],
    sun: [
        '今天天朗气清呢🌿',
        '今天天气很好哦',
        '光芒洒向大地',
        '今天是好天气☀️',
        '抬头望望天',
        '出去玩吗😄',
        '❤️我想你了❤️',
        '天气晴朗🌻',
    ],
    badair: [
        '哎呀，有雾霾😷',
        '出门戴口罩😷',
        '你的口罩呢😷',
        '外面空气不好',
        '尽量别出门啦',
        '适合睡觉',
        '今天不要去运动啦'
    ],
    yin: [
        '阴阴沉沉',
        '可能要下雨🌧',
        '出门带伞哦☂️',
        '宿舍冷不冷'
    ],
    snow: [
        '下雪啦❄️❄️',
        '堆雪人️去⛄️',
        '☃️️'
    ]
};

const you = ['熊宝宝', '傻宝宝', '宝宝', '熊宝', '傻宝', '么么哒😘', '嘿嘿'];
module.exports = {
    loveU: (weather) => {
        const type = weatherType.get(weather);
        const w = weatherJu[type] || [''];
        console.log('type',w)
        const wIndex = Math.floor(Math.random() * w.length);
        const yIndex = Math.floor(Math.random() * you.length);
        return '';
        // return `${you[yIndex]}，${w[wIndex]}`;
    }
}