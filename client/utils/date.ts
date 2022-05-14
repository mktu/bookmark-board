export const numberToDateTime = (time?: number, option : Intl.DateTimeFormatOptions = {}) => {
    if (!time) return ''
    return new Date(time).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo', ...option })
}

const numberToDateWithOption = (time?: number, option : Intl.DateTimeFormatOptions = {}) => {
    if (!time) return ''
    return new Date(time).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo', ...option })
}

export const numberToDate = (time?: number) => {
    if (!time) return ''
    return new Date(time).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' })
}

export const getRelativeDate = (time:number, option : Intl.DateTimeFormatOptions = {}) : {msg:string, type: 'justnow' | 'minutes' | 'hours' | 'date'} => {
    const now = Date.now()
    const diff = now-time
    const minuteInMsec = 1000 * 60
    const hourInMsec = minuteInMsec * 60
    const dayInMsec = hourInMsec * 24
    if(diff < minuteInMsec){
        return {
            msg: 'たった今',
            type : 'justnow'
        }
    }
    if(diff < hourInMsec){
        const t = Math.round(diff/minuteInMsec)
        return {
            msg : `${t}分前`,
            type : 'minutes'
        }
    }
    if(diff < dayInMsec){
        const t = Math.round(diff/hourInMsec)
        return {
            msg : `${t}時間前`,
            type : 'hours'
        }
    }
    return {
        msg : `${numberToDateWithOption(time,option)}`,
        type : 'date'
    }
}