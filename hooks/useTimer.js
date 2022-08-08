import {useEffect, useState} from "react";
import Time from "../modules/Time";

const useTimer = (initialState, timeout = 1000, stopCondition = false) => {
    const [state, setState] = useState(Time.timeElapsed(initialState))

    useEffect(() => {
        setState(Time.timeElapsed(initialState))
        const timer = setInterval(() => {
            if (stopCondition)
                return clearInterval(timer)

            setState(Time.timeElapsed(initialState))
        }, timeout)

        return () => {
            clearInterval(timer)
        }
    }, [initialState, timeout, stopCondition])

    return state
}

export default useTimer
