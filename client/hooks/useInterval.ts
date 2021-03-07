import { useEffect, useState, useCallback } from 'react'

const useInterval = () => {
    const [interval, setInterval] = useState(-1)
    useEffect(() => {
        if (interval > 0) {
            setTimeout(() => {
                setInterval(-1)
            }, interval);
        }
    }, [interval])
    const start =  useCallback((time: number) => { setInterval(time) }, [])
    return {
        waiting: interval > 0,
        start
    }
}

export default useInterval