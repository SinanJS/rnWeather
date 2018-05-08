//依赖模块
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');
// var Buffer = require('buffer').Buffer;
//本地存储目录
var dir = './assets/img';
var num = 100;

var numFormat = function (num) {
    if (num < 10) {
        return `0${num}`;
    }
    return num.toString();
}
//目标网址

//下载方法
var download = function (url, dir, filename) {
    request.head(url, function (err, res, body) {
        if (res) {
            console.log('正在下载' + url);
            request(url)
                .pipe(fs.createWriteStream(dir + "/" + filename));
            console.log('下载完成');
        }
        return;
    });
};


//创建目录
mkdirp(dir, function (err) {
    if (err) {
        console.log(err);
    }
});

//发送请求
function downloadImg(){
    for (let i = 0; i < num; i++) {
        let url = `http://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/night/${numFormat(i)}.png`;
        download(url, dir, `n-${numFormat(i)}.png`);
    }
}

function saveAsBase64() {
    const fileList = fs.readdirSync(dir);
    const json = {};
    fileList.forEach(filename => {
        const buffer = fs.readFileSync(`${dir}/${filename}`);
        json[filename.split('.')[0]] = `data:image/png;base64,${buffer.toString('base64')}`;
        const str = `module.exports=${JSON.stringify(json)}`;
        fs.writeFile("./assets/img.js", str, function (err) {        // 生成图片3(把base64位图片编码写入到图片文件)
            if (err) {
                console.log(err)
            }
        });
    });
}
// downloadImg();
saveAsBase64();

