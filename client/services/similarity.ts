import firebaseApp from './firebaseClient'
import { getFirestore, collection, onSnapshot, getDoc, doc, writeBatch } from "firebase/firestore";
import { getCollectionSnapshotListener } from './firestoreUtil'

const firestore = getFirestore(firebaseApp)

const getSimilarityCollection = () => collection(firestore, 'similarities')
const getSimilarityDoc = (profileId: string) => doc(getSimilarityCollection(), profileId)
const getBookmarkSimilarityCollection = (profileId: string)=> collection(getSimilarityDoc(profileId), 'bookmarkSimilarities')
const getIgnoreSimilarityCollection = (profileId: string)=> collection(getSimilarityDoc(profileId), 'ignoreList')

export const getBookmarkSimilarity = async (profileId: string)=>{
    const ret = await getDoc(getSimilarityDoc(profileId)) 
    if(!ret.exists()){
        return null
    }
    return {
        ...ret.data(),
        id : ret.id
    } as Similarity
}

export const listenBookmarkSimilarities = (
    profileId:string,
    onAdded: Transfer<BookmarkSimilarity[]>,
    onModified: Transfer<BookmarkSimilarity[]>,
    onDeleted: Transfer<BookmarkSimilarity[]>,
)=>{
    return onSnapshot(
        getBookmarkSimilarityCollection(profileId),
        getCollectionSnapshotListener(
            onAdded,
            onModified,
            onDeleted
        )
    )
}

export const listenSimilarityIgnoreList = (
    profileId:string,
    onAdded: Transfer<IgnoreSimilarity[]>,
    onModified: Transfer<IgnoreSimilarity[]>,
    onDeleted: Transfer<IgnoreSimilarity[]>,
) => {
    return onSnapshot(
        getIgnoreSimilarityCollection(profileId),
        getCollectionSnapshotListener(
            onAdded,
            onModified,
            onDeleted
        )
    )
}

export const addIgnoreList = async (
    profileId:string,
    targetList: Omit<IgnoreSimilarity, 'id'>[]
) =>{
    const batch = writeBatch(firestore)
    const collectionRef = getIgnoreSimilarityCollection(profileId)
    targetList.forEach((target) => {
        const newDoc = doc(collectionRef)
        batch.set(newDoc, target)
    })
    await batch.commit()
}