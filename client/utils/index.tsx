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