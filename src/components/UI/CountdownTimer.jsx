import React, { useEffect, useState } from "react";

export default function CountdownTimer({ expiryDate }) {

    const [secondsLeft, setSecondsLeft] = useState()
    const [minutesLeft, setMinutesLeft] = useState()
    const [hoursLeft, setHoursLeft] = useState()

    useEffect(() => {
        if (expiryDate) {
            let interval = setInterval(calculateExpiration, 1000)
            return () => clearInterval(interval)
        }
    }, [])

    function calculateExpiration() {
        const milliSecondsLeft = expiryDate - Date.now()
        const seconds = milliSecondsLeft / 1000
        const minutes = seconds / 60
        const hours = minutes / 60

        setSecondsLeft(Math.floor(seconds) % 60)
        setMinutesLeft(Math.floor(minutes) % 60)
        setHoursLeft(Math.floor(hours))
    }
    
    return (
        <div className="de_countdown">
            {hoursLeft}h {minutesLeft}m {secondsLeft}s
        </div>
    )
}
