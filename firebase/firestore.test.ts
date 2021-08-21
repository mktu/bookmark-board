import { config } from 'dotenv';
config();
import * as firebase from '@firebase/rules-unit-testing';
import * as fs from 'fs';

describe('permissionTest', ()=>{
    const projectId = process.env.FIREBASE_PROJECT_ID || 'error';

    beforeAll(
        async () => {
            const rules = fs.readFileSync('./firestore.rules', 'utf8');
            await firebase.loadFirestoreRules({
                projectId,
                rules,
            });
        }
    );

    afterAll(
        async () => {
            await firebase.clearFirestoreData({
                projectId
               });
            await Promise.all(
                firebase.apps().map((app) => app.delete()) 
            );
        }
    );

    function authedApp(auth:object) {
        return firebase.initializeTestApp({
            projectId,
            auth,
        }).firestore();
    }

    function unAuthedApp() {
        return firebase.initializeTestApp({
            projectId,
        }).firestore();
    }
    describe('profilePermissionTest', ()=>{
        test('hasEditorPrivilege', async ()=>{
            const db = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const doc = db.collection('profiles').doc('tAFWJ8p1jQXFWG4p5GAa5nrwxgG3');
            await firebase.assertSucceeds(doc.set({name: 'reds'}))
            await firebase.assertSucceeds(doc.set({name: 'reds2'}))
            await firebase.assertSucceeds(doc.delete())
        })
        test('notHaveAnyPrivilege', async ()=>{
            const db = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const doc = db.collection('profiles').doc('tAFWJ8p1jQXFWG4p5GAa5nrwxgG2');
            await firebase.assertSucceeds(doc.set({name: 'reds'}))
            await firebase.assertFails(doc.set({name: 'reds2'}))
        })
        test('notAuthed', async ()=>{
            const db = unAuthedApp();
            const doc = db.collection('profiles').doc('nullUid');
            await firebase.assertFails(doc.set({roomName: 'reds'}))
        })
    })

    describe('notificationPermissionTest', ()=>{
        test('hasProfilePrivilege', async ()=>{
            const db = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const profileDoc = db.collection('profiles').doc('tAFWJ8p1jQXFWG4p5GAa5nrwxgG3')
            await profileDoc.set({name: 'reds'})
            const notificationDoc = db.collection('profiles').doc('tAFWJ8p1jQXFWG4p5GAa5nrwxgG3').collection('notifications').doc()
            await firebase.assertSucceeds(notificationDoc.set({name: 'reds'}))
            await firebase.assertSucceeds(notificationDoc.set({name: 'reds2'}))
            await firebase.assertSucceeds(notificationDoc.delete())
        })
        test('onlyHaveOwnsPrivilege', async ()=>{
            const ownerDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const editorDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2' });
            const profileDoc = ownerDb.collection('profiles').doc('tAFWJ8p1jQXFWG4p5GAa5nrwxgG3');
            await profileDoc.set({name: 'reds'})
            const notificationDocFromOwner = ownerDb.collection('profiles').doc('tAFWJ8p1jQXFWG4p5GAa5nrwxgG3').collection('notifications').doc('test')
            await firebase.assertSucceeds(notificationDocFromOwner.set({name: 'reds'}))
            // access to the other's document 
            const notificationDoc = editorDb.collection('profiles').doc('tAFWJ8p1jQXFWG4p5GAa5nrwxgG3').collection('notifications').doc('test')
            await firebase.assertFails(notificationDoc.get())
            await firebase.assertFails(notificationDoc.set({name: 'reds2'}))
        })
        test('notAuthed', async ()=>{
            const ownerDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const profileDoc = ownerDb.collection('profiles').doc('tAFWJ8p1jQXFWG4p5GAa5nrwxgG3');
            await profileDoc.set({name: 'reds'})
            const notificationDoc = ownerDb.collection('profiles').doc('tAFWJ8p1jQXFWG4p5GAa5nrwxgG3').collection('notifications').doc('test')
            await firebase.assertSucceeds(notificationDoc.set({name: 'reds'}))
            const unauthedDb = unAuthedApp();
            // access to the other's document 
            const doc = unauthedDb.collection('profiles').doc('tAFWJ8p1jQXFWG4p5GAa5nrwxgG3').collection('notifications').doc('test')
            await firebase.assertFails(doc.get())
            await firebase.assertFails(doc.set({roomName: 'reds'}))
        })
    })

    describe('bookmarkPermissionTest', ()=>{
        test('group', async ()=>{
            const ownerDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const editorDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2' });
            const outsiderDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG0' });
            const unAuthedDb = unAuthedApp();
            const ownerGroupDoc = ownerDb.collection('groups').doc('somegroup');
            const editorGroupDoc = editorDb.collection('groups').doc('somegroup');
            const outsiderGroupDoc = outsiderDb.collection('groups').doc('somegroup');
            const unAuthedGroupDoc = unAuthedDb.collection('groups').doc('somegroup');
            await firebase.assertFails(editorGroupDoc.set({name: 'reds', users : ['tAFWJ8p1jQXFWG4p5GAa5nrwxgG3','tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'], owner : 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'}))
            await firebase.assertFails(outsiderGroupDoc.set({name: 'reds', users : ['tAFWJ8p1jQXFWG4p5GAa5nrwxgG3','tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'], owner : 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'}))
            await firebase.assertFails(unAuthedGroupDoc.set({name: 'reds', users : ['tAFWJ8p1jQXFWG4p5GAa5nrwxgG3','tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'], owner : 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'}))
            await firebase.assertSucceeds(ownerGroupDoc.set({name: 'reds', users : ['tAFWJ8p1jQXFWG4p5GAa5nrwxgG3','tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'], owner : 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'}))
            await firebase.assertSucceeds(ownerGroupDoc.get())
            await firebase.assertSucceeds(editorGroupDoc.get())
            await firebase.assertSucceeds(outsiderGroupDoc.get()) 
            await firebase.assertFails(unAuthedGroupDoc.get())
            await firebase.assertSucceeds(ownerGroupDoc.set({name: 'reds2'}, {merge:true}))
            await firebase.assertSucceeds(editorGroupDoc.set({name: 'reds2'}, {merge:true}))
            await firebase.assertFails(outsiderGroupDoc.set({name: 'reds2'}, {merge:true}))
            await firebase.assertFails(unAuthedGroupDoc.set({name: 'reds2'}, {merge:true}))
            await firebase.assertFails(unAuthedGroupDoc.delete())
            await firebase.assertFails(outsiderGroupDoc.delete())
            await firebase.assertFails(editorGroupDoc.delete())
            await firebase.assertSucceeds(ownerGroupDoc.delete())
        })
        test('bookmark', async ()=>{
            const ownerDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const editorDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2' });
            const outsiderDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG0' });
            const unAuthedDb = unAuthedApp();
            const ownerGroupDoc = ownerDb.collection('groups').doc('somegroup');
            await firebase.assertSucceeds(ownerGroupDoc.set({name: 'reds', users : ['tAFWJ8p1jQXFWG4p5GAa5nrwxgG3','tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'], owner : 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'}))
            const ownerBookmarkDoc = ownerDb.collection('groups').doc('somegroup').collection('bookmarks').doc('somebookmarks');
            const editorBookmarkDoc = editorDb.collection('groups').doc('somegroup').collection('bookmarks').doc('somebookmarks2');
            const outsiderBookmarkDoc = outsiderDb.collection('groups').doc('somegroup').collection('bookmarks').doc('somebookmarks');
            const unAuthedBookmarkDoc = unAuthedDb.collection('groups').doc('somegroup').collection('bookmarks').doc('somebookmarks');
            await firebase.assertFails(unAuthedBookmarkDoc.set({name: 'bookmark'}, {merge:true}))
            await firebase.assertFails(outsiderBookmarkDoc.set({name: 'bookmark'}, {merge:true}))
            await firebase.assertSucceeds(ownerBookmarkDoc.set({name: 'bookmark'}, {merge:true}))
            await firebase.assertSucceeds(editorBookmarkDoc.set({name: 'bookmark2'}, {merge:true}))
            await firebase.assertFails(unAuthedBookmarkDoc.get())
            await firebase.assertSucceeds(outsiderBookmarkDoc.get()) // for snapshot listener issue
            await firebase.assertSucceeds(ownerBookmarkDoc.get())
            await firebase.assertSucceeds(editorBookmarkDoc.get())
            await firebase.assertFails(unAuthedBookmarkDoc.set({name: 'bookmark-2'}, {merge:true}))
            await firebase.assertFails(outsiderBookmarkDoc.set({name: 'bookmark-2'}, {merge:true}))
            await firebase.assertSucceeds(ownerBookmarkDoc.set({name: 'bookmark-2'}, {merge:true}))
            await firebase.assertSucceeds(editorBookmarkDoc.set({name: 'bookmark2-2'}, {merge:true}))
            await firebase.assertFails(unAuthedBookmarkDoc.delete())
            await firebase.assertFails(outsiderBookmarkDoc.delete())
            await firebase.assertSucceeds(ownerBookmarkDoc.delete())
            await firebase.assertSucceeds(editorBookmarkDoc.delete())
        })

        test('request', async ()=>{
            const ownerDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const editorDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2' });
            const requesterDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG1' });
            const outsiderDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG0' });
            const unAuthedDb = unAuthedApp();
            const ownerGroupDoc = ownerDb.collection('groups').doc('somegroup');
            await firebase.assertSucceeds(ownerGroupDoc.set({name: 'reds', users : ['tAFWJ8p1jQXFWG4p5GAa5nrwxgG3','tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'], owner : 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'}))
            const ownerRequestDoc = ownerDb.collection('groups').doc('somegroup').collection('requests').doc('somerequests');
            const editorRequestDoc = editorDb.collection('groups').doc('somegroup').collection('requests').doc('somerequests');
            const requesterRequestDoc = requesterDb.collection('groups').doc('somegroup').collection('requests').doc('somerequests');
            const outsiderRequestDoc = outsiderDb.collection('groups').doc('somegroup').collection('requests').doc('somerequests');
            const unAuthedRequestDoc = unAuthedDb.collection('groups').doc('somegroup').collection('requests').doc('somerequests');
            await firebase.assertFails(ownerRequestDoc.set({sender: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'}, {merge:true}))
            await firebase.assertFails(editorRequestDoc.set({sender: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'}, {merge:true}))
            await firebase.assertFails(unAuthedRequestDoc.set({sender: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'}, {merge:true}))
            await firebase.assertFails(outsiderRequestDoc.set({sender: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'}, {merge:true}))
            await firebase.assertSucceeds(requesterRequestDoc.set({sender: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG1'}, {merge:true}))
            await firebase.assertSucceeds(ownerRequestDoc.get())
            await firebase.assertSucceeds(editorRequestDoc.get())
            await firebase.assertFails(unAuthedRequestDoc.get())
            await firebase.assertSucceeds(outsiderRequestDoc.get()) // for snapshot listener issue
            await firebase.assertSucceeds(ownerRequestDoc.get())
            await firebase.assertFails(editorRequestDoc.set({status: 'accepted'}, {merge:true}))
            await firebase.assertFails(unAuthedRequestDoc.set({status: 'accepted'}, {merge:true}))
            await firebase.assertFails(outsiderRequestDoc.set({status: 'accepted'}, {merge:true}))
            await firebase.assertFails(requesterRequestDoc.set({status: 'accepted'}, {merge:true}))
            await firebase.assertSucceeds(ownerRequestDoc.set({status: 'accepted'}, {merge:true}))
            await firebase.assertFails(editorRequestDoc.delete())
            await firebase.assertFails(unAuthedRequestDoc.delete())
            await firebase.assertFails(outsiderRequestDoc.delete())
            await firebase.assertFails(ownerRequestDoc.delete())
            await firebase.assertSucceeds(requesterRequestDoc.delete())
        })

        test('comment', async ()=>{
            const ownerDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const editorDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2' });
            const outsiderDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG0' });
            const unAuthedDb = unAuthedApp();
            const ownerGroupDoc = ownerDb.collection('groups').doc('somegroup');
            await firebase.assertSucceeds(ownerGroupDoc.set({name: 'reds', users : ['tAFWJ8p1jQXFWG4p5GAa5nrwxgG3','tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'], owner : 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'}))
            const ownerCommentDoc = ownerDb.collection('groups').doc('somegroup').collection('comments').doc('somecomment1');
            const editorCommentDoc = editorDb.collection('groups').doc('somegroup').collection('comments').doc('somecomment2');
            const outsiderCommentDoc = outsiderDb.collection('groups').doc('somegroup').collection('comments').doc('somecomment3');
            const unAuthedCommentDoc = unAuthedDb.collection('groups').doc('somegroup').collection('comments').doc('somecomment1');
            await firebase.assertFails(unAuthedCommentDoc.set({comment: 'hello'}, {merge:true}))
            await firebase.assertSucceeds(outsiderCommentDoc.set({comment: 'hello'}, {merge:true}))
            await firebase.assertSucceeds(editorCommentDoc.set({comment: 'hello'}, {merge:true}))
            await firebase.assertSucceeds(ownerCommentDoc.set({comment: 'hello'}, {merge:true}))
            await firebase.assertFails(unAuthedCommentDoc.get())
            await firebase.assertSucceeds(outsiderCommentDoc.get())
            await firebase.assertSucceeds(editorCommentDoc.get())
            await firebase.assertSucceeds(ownerCommentDoc.get())
            await firebase.assertFails(unAuthedCommentDoc.set({comment: 'hi'}, {merge:true}))
            await firebase.assertSucceeds(outsiderCommentDoc.set({comment: 'hi'}, {merge:true}))
            await firebase.assertSucceeds(ownerCommentDoc.set({comment: 'hi'}, {merge:true}))
            await firebase.assertSucceeds(editorCommentDoc.set({comment: 'hi'}, {merge:true}))
            await firebase.assertFails(unAuthedCommentDoc.delete())
            await firebase.assertSucceeds(outsiderCommentDoc.delete())
            await firebase.assertSucceeds(editorCommentDoc.delete())
            await firebase.assertSucceeds(ownerCommentDoc.delete())
        })
        
    })
})