const MILLISECONDS_IN_SECOND = 1000
const SECONDS_IN_MINUTE      = 60
const MINUTES_IN_HOUR        = 60
const HOURS_IN_DAY           = 24

const SECONDS = MILLISECONDS_IN_SECOND
const MINUTES = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE
const HOURS   = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR
const DAYS    = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY

export default class Time {
    /**
     * return the elapsed time from a given time to now in the format of 'HH:MM:SS'
     * @param createdAt the time to calculate the elapsed time from in milliseconds
     * @returns {string} the elapsed time from a given time to now in the format of 'HH:MM:SS'
     */
    static timeElapsed(createdAt) {
        const now         = Date.now()
        const timeElapsed = now - createdAt
        const hours       = Math.floor((timeElapsed % DAYS) / HOURS)
        const minutes     = Math.floor((timeElapsed % HOURS) / MINUTES)
        const seconds     = Math.floor((timeElapsed % MINUTES) / SECONDS)

        const hh = hours < 10 ? `0${hours}` : hours
        const mm = minutes < 10 ? `0${minutes}` : minutes
        const ss = seconds < 10 ? `0${seconds}` : seconds
        return `${hh}:${mm}:${ss}`
    }
}
