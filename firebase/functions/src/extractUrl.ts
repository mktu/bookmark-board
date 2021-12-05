import getUrls from 'get-urls'

export const extractUrl = (text:string)=>{
    const results = getUrls(text)
    if(results.size > 0){
        return [...results][0]
    }
    return ''
}