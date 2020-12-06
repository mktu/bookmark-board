export type LocalEntityState<T extends { id : string }> = {
    ids: string[]
    entities: { [key:string] : T }
}

export const createInitialEntityState = <T extends { id : string }>()=>{
    return {
        ids : [],
        entities : {}
    } as LocalEntityState<T>
}

export const convertToDictionary = <T extends { id : string }>(items:T[])=>{
    return items.reduce((acc, p) => {
        acc[p.id] = p
        return acc
    }, {} as { [id: string]: T })
}

export const createEntityState = <T extends { id : string }>(items:T[])=>{
    return {
        ids : items.map(i=>i.id),
        entities: convertToDictionary(items)
    }
}

export const upsertMany =<T extends { id : string }>(entityState:LocalEntityState<T>, items:T[])=>{
    const inserted = items.filter(i=>!entityState.ids.includes(i.id))
    const updated = items.filter(i=>entityState.ids.includes(i.id))
    if(inserted.length===0){
        return updateMany(entityState,updated)
    }
    const insertedEntity = createEntityState(inserted)
    const newState : LocalEntityState<T> = {
        ids:[...entityState.ids,...insertedEntity.ids],
        entities:{...entityState.entities,...insertedEntity.entities}
    }
    return updateMany(newState,updated)
}


export const updateMany =<T extends { id : string }>(entityState:LocalEntityState<T>, items:T[])=>{
    const updated = items.filter(i=>entityState.ids.includes(i.id))
    if(updated.length===0){
        return entityState
    }
    const newState : LocalEntityState<T> = {
        ids:[...entityState.ids],
        entities:{...entityState.entities}
    }
    for(const item of updated){
        newState.entities[item.id] = item
    }
    return newState
}

export const deleteMany = <T extends { id : string }>(entityState:LocalEntityState<T>, items:T[])=>{
    const deleted = items.filter(i=>entityState.ids.includes(i.id)).map(d=>d.id)
    if(deleted.length===0){
        return entityState
    }
    const newState : LocalEntityState<T> = {
        ids:entityState.ids.filter(id=>!deleted.includes(id)),
        entities:convertToDictionary(Object.values(entityState.entities).filter(v=>!deleted.includes(v.id)))
    }
    return newState
}
