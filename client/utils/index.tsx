import { hex2rgb } from './rgb'
import { copyToClipBoard } from './clipboard'
import { numberToDateTime, numberToDate } from './date'

export const removeUndefined = (obj: { [key: string]: unknown }) => {
    return Object.keys(obj).reduce((acc, key) => {
        const _acc = acc
        if (obj[key] !== undefined) _acc[key] = obj[key]
        return _acc
    }, {})
}

export const getProtocol = (host:string) => /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:'
export const getOrigin = ()=> process.env.NEXT_PUBLIC_SITE_URL

export {
    hex2rgb,
    copyToClipBoard,
    numberToDateTime,
    numberToDate
}
