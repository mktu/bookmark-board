import { hex2rgb } from './rgb'
import { copyToClipBoard } from './clipboard'

export const numberToDateTime = (time?: number) => {
    if (!time) return ''
    return new Date(time).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
}

export const numberToDate = (time?: number) => {
    if (!time) return ''
    return new Date(time).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' })
}

export const removeUndefined = (obj: { [key: string]: unknown }) => {
    return Object.keys(obj).reduce((acc, key) => {
        const _acc = acc
        if (obj[key] !== undefined) _acc[key] = obj[key]
        return _acc
    }, {})
}

export const getProtocol = (host:string) => /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:'
export const getOrigin = ()=> `${getProtocol(process.env.NEXT_PUBLIC_VERCEL_URL)}//${process.env.NEXT_PUBLIC_VERCEL_URL}`

export {
    hex2rgb,
    copyToClipBoard
}
