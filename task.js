/**
 * Created by xxc on 2018/2/24.
 */
let later = require('later');

/**
 * 定时任务
 * @param time 参考later的base time
 * @param intervalFn 定时执行的函数
 */
module.exports = function (time, intervalFn) {
    let sched = {schedules: [time]};

    // 设定为本地时间
    later.date.localTime();
    later.setInterval(intervalFn, sched);
};