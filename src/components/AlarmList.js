import React from 'react';

const AlarmList = ({ alarms, onCancel }) => {
    return (
        <div>
            <h2>Lista de Alarmes Agendados</h2>
            {alarms.length === 0 ? (
                <p>Nenhum alarme agendado.</p>
            ) : (
                <ul>
                    {alarms.map((alarm, index) => {
                        const date = new Date(alarm);
                        const day = date.getDate().toString().padStart(2, '0');
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                        const hour = date.getHours().toString().padStart(2, '0');
                        const minute = date.getMinutes().toString().padStart(2, '0');
                        return (
                            <li key={index}>
                                {day}/{month} às {hour}:{minute}
                                <button onClick={() => onCancel(index, alarm)}>Cancelar</button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
};

export default AlarmList;
