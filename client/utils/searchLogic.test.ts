import { combineGroups } from './searchLogic'

describe('combineGroups', ()=>{
    const groups = [
        {id : '1'}, {id : '2'}, {id : '3'}
    ]
    test('fewer results', ()=>{
        const bookmarks = [
            {groupId : '1'},{groupId : '1'},{groupId : '1'},
            {groupId : '2'},{groupId : '2'},{groupId : '2'},
        ]
        const results = combineGroups(groups,bookmarks,3)
        expect(results.length).toBe(1)
        expect(results[0].bookmarks.length).toBe(3)
    })
    test('results two groups', ()=>{
        const bookmarks = [
            {groupId : '1'},{groupId : '1'},{groupId : '1'},
            {groupId : '2'},{groupId : '2'},{groupId : '2'},
        ]
        const results = combineGroups(groups,bookmarks,4)
        expect(results.length).toBe(2)
        expect(results[0].bookmarks.length).toBe(3)
        expect(results[1].bookmarks.length).toBe(1)
    })
    test('contains all bookmarks', ()=>{
        const bookmarks = [
            {groupId : '1'},{groupId : '1'},{groupId : '1'},
            {groupId : '2'},{groupId : '2'},{groupId : '2'},
        ]
        const results = combineGroups(groups,bookmarks,6)
        expect(results.length).toBe(2)
        expect(results[0].bookmarks.length).toBe(3)
        expect(results[1].bookmarks.length).toBe(3)
    })

})