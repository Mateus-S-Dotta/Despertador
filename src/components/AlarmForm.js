
import React, { useState } from 'react';
import { scheduleAlarm } from '../utils/scheduler';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AlarmForm = ({ onNewAlarm, startAlarm }) => {
  const [alarmTime, setAlarmTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAlarmSubmit = (e) => {
    e.preventDefault();
    if (!alarmTime) {
      alert('Por favor, selecione o horário para o alarme.');
      return;
    };

    const [hour, minute] = alarmTime.split(':');
    const alarmDate = new Date(selectedDate);
    alarmDate.setHours(hour);
    alarmDate.setMinutes(minute);

    if (new Date() > alarmDate) {
      setAlarmTime('');
      alert('Por favor, selecione um horário do futuro.');
      return;
    };

    scheduleAlarm(alarmDate, startAlarm);
    onNewAlarm(alarmDate);
    setAlarmTime('');
  };

  return (
    <div>
      <h2>Configurar Alarme</h2>
      <form onSubmit={handleAlarmSubmit}>
        <div>
          <label>Escolha a Data:</label>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={new Date()}
          />
        </div>
        <div>
          <label>Horário do Alarme:</label>
          <input
            type="time"
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
          />
        </div>
        <button type="submit">Agendar Alarme</button>
      </form>
    </div>
  );
};

export default AlarmForm;
