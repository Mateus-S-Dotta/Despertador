import React, { useEffect, useState } from 'react';
import AlarmForm from './components/AlarmForm';
import AlarmList from './components/AlarmList';
import AlarmPlayer from './components/AlarmPlayer';
import { scheduleAlarm, cancelAlarm } from './utils/scheduler';

const App = () => {
    const [alarms, setAlarms] = useState([]);
    const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);

    const handleUpdateStorege = (alarm) => {
        localStorage.setItem('alarms', JSON.stringify(alarm));
    };

    const handleNewAlarm = (newAlarm) => {
        setAlarms([...alarms, newAlarm]);
        handleUpdateStorege([...alarms, newAlarm]);
    };

    const handleAlarmCancel = (index, alarm) => {
        const updatedAlarms = alarms.slice();
        updatedAlarms.splice(index, 1);
        setAlarms(updatedAlarms);
        handleUpdateStorege(updatedAlarms);
        cancelAlarm(alarm);
    };

    const handleAlarmPlay = () => {
        setIsAlarmPlaying(true);
    };

    const handleAlarmStop = () => {
        setIsAlarmPlaying(false);
    };

    const startAlarm = () => {
        const audio = document.getElementById('alarmAudio');
        audio.play();
        handleAlarmPlay();
    };

    useEffect(() => {
        const storedAlarms = JSON.parse(localStorage.getItem('alarms'));
        if (storedAlarms) {
            const date = new Date();
            const filtered = storedAlarms.filter(alarmDay => {
                const alarmDayDate = new Date(alarmDay);
                return alarmDayDate > date;
            });
            setAlarms(filtered);
            localStorage.setItem('alarms', JSON.stringify(filtered));
            filtered.forEach(alarm => {
                scheduleAlarm(alarm, startAlarm);
            });
        }
    }, []);

    return (
        <div>
            <h1>Despertador</h1>
            <AlarmForm onNewAlarm={handleNewAlarm} startAlarm={startAlarm} />
            <AlarmList alarms={alarms} onCancel={handleAlarmCancel} />
            <AlarmPlayer isPlaying={isAlarmPlaying} onStop={handleAlarmStop} onStart={handleAlarmPlay} />
        </div>
    );
};

export default App;
