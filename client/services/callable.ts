import firebaseApp from './firebaseClient'
import { getFunctions, httpsCallable } from "firebase/functions";

const asiaFunction = getFunctions(firebaseApp, 'asia-northeast1')

export const scrapeUrl = async (url:string, capture?:boolean, validate?:boolean)=>{
    const callable = httpsCallable(asiaFunction, 'scrapeUrl')
    const result = await callable({url,capture, validate})
    return result.data as {
        title?: string,
        description?: string,
        url: string,
        images : string[]
    }
}

export const completeBookmark = async (url:string, groupId:string, bookmarkId:string, scrape?:boolean)=>{
    const callable = httpsCallable(asiaFunction, 'completeBookmark')
    await callable({
        url,
        groupId, 
        bookmarkId,
        scrape
    })
}

export const createAlgoliaIndex = async (groupId:string)=>{
    const callable = httpsCallable(asiaFunction,'createAlgoliaIndex')
    await callable({
        groupId
    })
}

export const updateAlgoliaIndex = async (groupId:string, data: Partial<Pick<BookmarkGroup, 'name' | 'description'>>)=>{
    const callable = httpsCallable(asiaFunction,'createAlgoliaIndex')
    await callable({
        groupId,
        ...data
    })
}

export const deleteAlgoliaIndex = async (groupId:string)=>{
    const callable = httpsCallable(asiaFunction,'deleteAlgoliaIndex')
    await callable({
        groupId
    })
}