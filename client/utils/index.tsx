export const copyToClipBoard = (value:string, onSucceeded:Notifier)=>{
    if (navigator && navigator.clipboard) {
        navigator.clipboard.writeText(value).then(() => {
            onSucceeded()
        });
    }
}

export const numberToDateTime = (time:number)=>{
    return new Date(time).toLocaleString('ja-JP',{ timeZone: 'Asia/Tokyo' })
}

export const removeUndefined = (obj:{[key:string]:unknown}) => {
    return Object.keys(obj).reduce((acc, key)=>{
        const _acc = acc
        if (obj[key] !== undefined) _acc[key] = obj[key]
        return _acc
    },{})
}