const toKey = (groupId: string) => `refinements_${groupId}`
type Callback = (newValue: BookmarkRefinement) => void
type Listener = {
    [key: string]: Callback
}

const listener: Listener = {}

export const getRefinements = (groupId: string) => {
    const key = toKey(groupId)
    const newValue = localStorage.getItem(key)
    if(!newValue){
        return {
            id : groupId,
            colorMasks : []
        } as BookmarkRefinement
    }
    const newRefinement = JSON.parse(newValue) as BookmarkRefinement
    return newRefinement
}

export const saveRefinement = (groupId: string, refinement: Partial<BookmarkRefinement>) => {
    const key = toKey(groupId)
    const prev = getRefinements(groupId)
    localStorage.setItem(key, JSON.stringify({
        ...prev,
        ...refinement
    }));
    if (listener[groupId]) {
        
        listener[groupId](getRefinements(groupId))
    }
}

export const registListener = (groupId: string, cb: Callback) => {
    listener[groupId] = cb
    listener[groupId](getRefinements(groupId))
    return ()=>{
        delete listener[groupId]
    }
}