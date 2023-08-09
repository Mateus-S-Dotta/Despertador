import React, { useEffect, useState } from 'react';

const AlarmPlayer = ({ isPlaying, onStop, onStart }) => {
    const [numberF, setNumberF] = useState(0);
    const [numberS, setNumberS] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const pair = (numberF + numberS) % 2 === 0 ? true : false;
        if (pair) {
            if (Number(inputValue) === numberF * numberS) {
                setButtonDisabled(false);
            };
        } else {
            if (Number(inputValue) === ((numberF - numberS) * numberF)) {
                setButtonDisabled(false);
            };
        };
    }

    const handlePlay = async () => {
        try {
            const audio = document.getElementById('alarmAudio');
            await audio.play();
            onStart();
        } catch (error) {
            console.log(error);
        };
    };

    const handleStop = async () => {
        try {
            const audio = document.getElementById('alarmAudio');
            await audio.pause();
            audio.currentTime = 0;
            onStop();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            const randomNumberF = Math.floor(Math.random() * 101);
            const randomNumberS = Math.floor(Math.random() * 101);
            setNumberF(randomNumberF);
            setNumberS(randomNumberS);
            setButtonDisabled(true);
        };
    }, [isPlaying]);

    return (
        <div>
            <h2>Reproduzir Alarme</h2>
            {!isPlaying ? (
                <button onClick={handlePlay}>Reproduzir</button>
            ) : (
                <div>
                    <p>Alarme tocando...</p>
                    <button onClick={handleStop} disabled={buttonDisabled}>Parar</button>
                    <p>{numberF} E {numberS}</p>
                    <form onSubmit={handleSubmit}>
                        <input type='number' value={inputValue} onChange={handleInputChange} />
                        <button type='submit'>Contar</button>
                    </form>
                </div>
            )}
            <audio id="alarmAudio">
                <source src='./audio.mp3' type="audio/mp3" />
                Seu navegador não suporta a reprodução de áudio.
            </audio>
        </div>
    );
};

export default AlarmPlayer;
