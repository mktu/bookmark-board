import firebase from './firebaseClient'

const asiaFunction = firebase.app().functions('asia-northeast1')

export const scrapeUrl = async (url:string, capture?:boolean, validate?:boolean)=>{
    const callable = asiaFunction.httpsCallable('scrapeUrl')
    const result = await callable({url,capture, validate})
    return result.data as {
        title?: string,
        description?: string,
        url: string,
        images : string[]
    }
}

export const completeBookmark = async (url:string, groupId:string, bookmarkId:string, scrape?:boolean)=>{
    const callable = asiaFunction.httpsCallable('completeBookmark')
    await callable({
        url,
        groupId, 
        bookmarkId,
        scrape
    })
}