export const copyToClipBoard = (value:string, onSucceeded:Notifier)=>{
    if (navigator && navigator.clipboard) {
        navigator.clipboard.writeText(value).then(() => {
            onSucceeded()
        });
    }
}