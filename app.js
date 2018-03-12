/**
 * Created by xxc on 2018/2/24.
 */
const es6=require('./es6');
let task = require('./task');

// 定时执行
task({h: [18], m: [0]}, function () {
        es6();
});

console.log('======', '自动签到服务运行中..', '======');
