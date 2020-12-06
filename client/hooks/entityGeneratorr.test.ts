import {createEntityState, upsertMany, deleteMany} from './entityGenerator'

describe('entityGenerator', () => {
    it('createBasic', ()=>{
        const entity = createEntityState([{id:'1',name:'name1'}])
        expect(entity.ids[0]).toBe('1')
        expect(entity.entities['1'].id).toBe('1')
        expect(entity.entities['1'].name).toBe('name1')
    })
    it('createEmpty', ()=>{
        const entity = createEntityState([])
        expect(entity.ids.length).toBe(0)
        expect(Object.keys(entity.entities).length).toBe(0)
    })
    it('upsertInsert', ()=>{
        const entity = createEntityState([{id:'1',name:'name1'}])
        const newState = upsertMany(entity,[{id:'2',name:'name2'}])
        expect(entity).not.toBe(newState)
        expect(newState.ids[1]).toBe('2')
        expect(newState.entities['2'].id).toBe('2')
        expect(newState.entities['2'].name).toBe('name2')
    })
    it('upsertUpdate', ()=>{
        const entity = createEntityState([{id:'1',name:'name1'}])
        const newState = upsertMany(entity,[{id:'1',name:'name2'}])
        expect(entity).not.toBe(newState)
        expect(newState.ids.length).toBe(1)
        expect(newState.ids[0]).toBe('1')
        expect(newState.entities['1'].id).toBe('1')
        expect(newState.entities['1'].name).toBe('name2')
    })
    it('upsertEmpty', ()=>{
        const entity = createEntityState([{id:'1',name:'name1'}])
        const newState = upsertMany(entity,[])
        expect(entity).toBe(newState)
    })
    it('deleteBasic', ()=>{
        const entity = createEntityState([{id:'1',name:'name1'}])
        const newState = deleteMany(entity,[{id:'1',name:'name1'}])
        expect(entity).not.toBe(newState)
        expect(newState.ids.length).toBe(0)
    })
})