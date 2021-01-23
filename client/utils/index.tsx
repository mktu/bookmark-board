export const copyToClipBoard = (value:string, onSucceeded:Notifier)=>{
    if (navigator && navigator.clipboard) {
        navigator.clipboard.writeText(value).then(() => {
            onSucceeded()
        });
    }
}

export const numberToDateTime = (time?:number)=>{
    if(!time) return ''
    return new Date(time).toLocaleString('ja-JP',{ timeZone: 'Asia/Tokyo' })
}

export const removeUndefined = (obj:{[key:string]:unknown}) => {
    return Object.keys(obj).reduce((acc, key)=>{
        const _acc = acc
        if (obj[key] !== undefined) _acc[key] = obj[key]
        return _acc
    },{})
}

export const hex2rgb = (hex?: string)=> {
    if (!hex) {
        return [0, 0, 0]
    }
    if (hex.slice(0, 1) == "#") hex = hex.slice(1);
    if (hex.length == 3) hex = hex.slice(0, 1) + hex.slice(0, 1) + hex.slice(1, 2) + hex.slice(1, 2) + hex.slice(2, 3) + hex.slice(2, 3);

    return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(function (str) {
        return parseInt(str, 16);
    });
}