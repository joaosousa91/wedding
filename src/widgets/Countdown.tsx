// eslint-disable-next-line no-unused-vars
import  { useState, useEffect } from "react";
import styles from "./Countdown.module.css";

const weddingDate = new Date("6/7/2025 17:00:00")


//Functions that will format the time in order to get what needed in screen days, hours, minutes

function GetDays(time: number){
    return Math.floor(time / (1000 * 60 * 60 * 24));
}

function GetHours(time: number){
    return Math.floor((time / (1000 * 60 * 60)) % 24);
}

function GetMinutes(time: number){
    return Math.floor((time / (1000 * 60)) % 60);
}

//----------


//Main function that will export the countdown block
function Countdown (){

    const [timeRemaining, setTimeRemaining] = useState(0);

    //Defines the countdown in order to show on screen
    useEffect(() => {
        if (weddingDate) {
            const countdownInterval = setInterval(() => {
                const currentTime = new Date().getTime();
                const eventTime = new Date(weddingDate).getTime();
                let remainingTime = eventTime - currentTime;

                if (remainingTime <= 0) {
                    remainingTime = 0;
                    clearInterval(countdownInterval);
                    alert("Countdown complete!");
                }

                setTimeRemaining(remainingTime);
            }, 1000);

            return () => clearInterval(countdownInterval);
        }
    }, [timeRemaining]);

    return (
        <>
            <div className={styles.descriptionContainer}>
                Venham celebrar este momento especial connosco.
                A cerimónia será um dia repleto de amor, alegria e memórias inesquecíveis.
                Mal podemos esperar para partilhar este dia maravilhoso com todos vocês!
            </div>
            <div className={styles.countdownContainer}>
                Countdown
            </div>
            <div className={styles.countdownNumbersContainer}>
                <div className={styles.countdownNumbersContainerLeft}>
                    <div className={styles.countdownNumbersLabel}>Dias</div>
                    <div className={styles.containersNumbersNumber}>{GetDays(timeRemaining)}</div>
                </div>
                <div className={styles.countdownNumbersContainerCenter}>
                    <div className={styles.countdownNumbersLabel}>horas</div>
                    <div className={styles.containersNumbersNumber}>{GetHours(timeRemaining)}</div>
                </div>
                <div className={styles.countdownNumbersContainerRight}>
                    <div className={styles.countdownNumbersLabel}>minutos</div>
                    <div className={styles.containersNumbersNumber}>{GetMinutes(timeRemaining)}</div>
                </div>
            </div>
        </>
    );
}

export default Countdown;