const style = {
    container: {
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    weatherHead: {
        height: 440,
        // backgroundColor: '#458FBF',
        paddingTop: 90,

    },
    cityTxt: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 25,
    },
    cityTxtPy: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 19,
        padding: 10
    },
    wdataToday: {
    },
    todayL1: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 100,
        fontWeight: '100',
        paddingLeft: 25,
    },
    pm: {
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    pmTxt: {
        color: '#F5F3F4',
        textAlign: 'center',
        textShadowOffset: { width: -1, hegith: 1 },
        // textShadowRadius: 2,
        textShadowColor: '#000',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 2
    },
    alarm: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 2
    },
    alarmTxt: {
        color: '#E1A23B',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        textAlign: 'center',
    },
    today: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 60
    },
    day: {
        color: "#fff",
        fontSize: 16
    },
    max: {
        fontSize: 17,
        color: '#fff',
    },
    min: {
        fontSize: 17,
        color: 'rgba(255,255,255,0.6)'
    },
    wind: {
        color: '#fff',
        fontSize: 16
    },
    weekWeather: {
        flexDirection: 'row',
        height: 200,
        justifyContent: 'space-around',
    },
    fday: {
        // backgroundColor:"#dd4422",
        width: 60,
        paddingTop: 20
    },
    fdayHead: {

    },
    fdayName: {
        textAlign: 'center',
        color: '#555'
    },
    fdayTemp: {
        textAlign: 'center',
        color: '#555',
        paddingTop: 8
    },
    fdayImag: {
        width: 30,
        height: 30,
        marginTop: 10,
    },
    view24: {
        width: 70,
        // backgroundColor:"#ee4422",
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center'
    },
    time24: {
        color: '#8a9baf',
        textAlign: 'center'
    },
    du24:{
        color: '#555',
        textAlign: 'center'
    },
    title: {
        color: '#555',
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5
    },
    titleView: {
        borderBottomWidth: 1,
        borderColor: '#D1D1D1',
    }
};
module.exports = style;