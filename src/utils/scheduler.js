const schedule = require('node-schedule');

const alarms = [];

const cancelAlarm = (alarmJob) => {
    const index = alarms.indexOf(alarmJob);
    const foundJob = alarms.find(job => {
        const date = new Date(alarmJob);
        const scheduledDate = job.nextInvocation();
        return scheduledDate && scheduledDate.getTime() === date.getTime();
    });
    if (foundJob) {
        foundJob.cancel();
        alarms.splice(index, 1);
        console.log('Alarme cancelado com sucesso!');
    };
};

const scheduleAlarm = (alarmTime, callback) => {
    const job = schedule.scheduleJob(alarmTime, callback);
    alarms.push(job);
};

module.exports = {
    scheduleAlarm,
    cancelAlarm
};
