import {useState, useEffect} from 'react'


const ConditionalRender = ({condition, timeout, instantEntrance, children}) => {
    const [render, setRender] = useState(false)

    const renderController = () => {
        if (condition) {
            if (instantEntrance) {
                return setRender(() => true)
            }

            return setTimeout(() => {
                setRender(() => true)
            }, timeout)
        }

        setTimeout(() => {
            setRender(false)
        }, timeout)
    }

    useEffect(() => {
        renderController()
    }, [condition])

    return render ? children : <></>
}

ConditionalRender.defaultProps = {
    instantEntrance: false,
    timeout:         0
}

export default ConditionalRender
