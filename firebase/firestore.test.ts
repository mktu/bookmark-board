import { config } from 'dotenv';
config();
import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { setDoc, doc, collection, deleteDoc, getDoc } from "firebase/firestore";
import * as fs from 'fs';

describe('permissionTest', () => {
    const projectId = process.env.FIREBASE_PROJECT_ID || 'error';
    const rules = fs.readFileSync('./firestore.rules', 'utf8');
    let testEnv: RulesTestEnvironment;

    beforeAll(async () => {
        testEnv = await initializeTestEnvironment({
            projectId,
            firestore: {
                rules
            },
        });
    })

    afterAll(
        async () => {
            await testEnv.clearFirestore()
            await testEnv.cleanup()
        }
    );

    function authedApp(auth: { uid: string }) {
        return testEnv.authenticatedContext(auth.uid).firestore();
    }

    function unAuthedApp() {
        return testEnv.unauthenticatedContext().firestore();
    }
    describe('profilePermissionTest', () => {
        test('hasEditorPrivilege', async () => {
            const db = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const pDoc = doc(collection(db, 'profiles'), 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3');
            await assertSucceeds(setDoc(pDoc, { name: 'reds' }))
            await assertSucceeds(setDoc(pDoc, { name: 'reds2' }))
            await assertSucceeds(deleteDoc(pDoc))
        })
        test('notHaveAnyPrivilege', async () => {
            const db = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const pDoc = doc(collection(db, 'profiles'), 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2')
            await assertSucceeds(setDoc(pDoc, { name: 'reds' }))
            await assertFails(setDoc(pDoc, { name: 'reds2' }))
        })
        test('notAuthed', async () => {
            const db = unAuthedApp();
            const pDoc = doc(collection(db, 'profiles'), 'nullUid');
            await assertFails(setDoc(pDoc, { roomName: 'reds' }))
        })
    })

    describe('similarityPermissionTest', () => {
        test('hasOwnerPrivilege', async () => {
            const db = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const similaritydoc = doc(collection(db, 'similarities'), 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3');
            await assertSucceeds(setDoc(similaritydoc, { count: 1 }))
            const bookamrkSimDoc = doc(collection(doc(collection(db, 'similarities'), 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'), 'bookmarkSimilarities'), 'similarityTestId')
            await assertSucceeds(setDoc(bookamrkSimDoc, { diff: 1 }))
            await assertSucceeds(setDoc(bookamrkSimDoc, { diff: 2.5 }))
            const ignoreSimDoc = doc(collection(doc(collection(db, 'similarities'), 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'), 'ignoreList'), 'ignoreId')
            await assertSucceeds(setDoc(ignoreSimDoc, { bookmarkId: 'b1' }))
            await assertSucceeds(deleteDoc(bookamrkSimDoc))
            await assertSucceeds(deleteDoc(similaritydoc))
            await assertSucceeds(deleteDoc(ignoreSimDoc))
        })
        test('notAuthed', async () => {
            const db = unAuthedApp();
            const similaritydoc = doc(collection(db, 'similarities'), 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3');
            await assertFails(setDoc(similaritydoc, { count: 1 }))
            const bookamrkSimDoc = doc(collection(doc(collection(db, 'similarities'), 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'), 'bookmarkSimilarities'), 'similarityTestId')
            await assertFails(setDoc(bookamrkSimDoc, { diff: 1 }))
            const ignoreSimDoc = doc(collection(doc(collection(db, 'similarities'), 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'), 'ignoreList'), 'ignoreId')
            await assertFails(setDoc(ignoreSimDoc, { bookmarkId: 'b1' }))
        })
    })

    describe('notificationPermissionTest', () => {
        test('hasProfilePrivilege', async () => {
            const db = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const profileDoc = doc(collection(db, 'profiles'), 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3')
            await setDoc(profileDoc, { name: 'reds' })
            const notificationDoc = doc(collection(doc(collection(db, 'profiles'), 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'), 'notifications'))
            await assertSucceeds(setDoc(notificationDoc, { name: 'reds' }))
            await assertSucceeds(setDoc(notificationDoc, { name: 'reds2' }))
            await assertSucceeds(deleteDoc(notificationDoc))
        })
        test('onlyHaveOwnsPrivilege', async () => {
            const ownerDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const editorDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2' });
            const profileDoc = ownerDb.collection('profiles').doc('tAFWJ8p1jQXFWG4p5GAa5nrwxgG3');
            await setDoc(profileDoc, { name: 'reds' })
            const notificationDocFromOwner = ownerDb.collection('profiles').doc('tAFWJ8p1jQXFWG4p5GAa5nrwxgG3').collection('notifications').doc('test')
            await assertSucceeds(setDoc(notificationDocFromOwner, { name: 'reds' }))
            // access to the other's document 
            const notificationDoc = editorDb.collection('profiles').doc('tAFWJ8p1jQXFWG4p5GAa5nrwxgG3').collection('notifications').doc('test')
            await assertFails(getDoc(notificationDoc))
            await assertFails(setDoc(notificationDoc, { name: 'reds2' }))
        })
        test('notAuthed', async () => {
            const ownerDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const profileDoc = doc(collection(ownerDb, 'profiles'), 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3');
            await setDoc(profileDoc, { name: 'reds' })
            const notificationDoc = doc(collection(doc(collection(ownerDb, 'profiles'), 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'), 'notifications'), 'test')
            await assertSucceeds(setDoc(notificationDoc, { name: 'reds' }))
            const unauthedDb = unAuthedApp();
            // access to the other's document 
            const nDoc = doc(collection(doc(collection(unauthedDb, 'profiles'), 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3'), 'notifications'), 'test')
            await assertFails(getDoc(nDoc))
            await assertFails(setDoc(nDoc, { roomName: 'reds' }))
        })
    })

    describe('bookmarkPermissionTest', () => {
        test('group', async () => {
            const ownerDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const editorDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2' });
            const outsiderDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG0' });
            const unAuthedDb = unAuthedApp();
            const ownerGroupDoc = doc(collection(ownerDb, 'groups'), 'somegroup');
            const editorGroupDoc = doc(collection(editorDb, 'groups'), 'somegroup');
            const outsiderGroupDoc = doc(collection(outsiderDb, 'groups'), 'somegroup');
            const unAuthedGroupDoc = doc(collection(unAuthedDb, 'groups'), 'somegroup');
            await assertFails(setDoc(editorGroupDoc, { name: 'reds', users: ['tAFWJ8p1jQXFWG4p5GAa5nrwxgG3', 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'], owner: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' }))
            await assertFails(setDoc(outsiderGroupDoc, { name: 'reds', users: ['tAFWJ8p1jQXFWG4p5GAa5nrwxgG3', 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'], owner: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' }))
            await assertFails(setDoc(unAuthedGroupDoc, { name: 'reds', users: ['tAFWJ8p1jQXFWG4p5GAa5nrwxgG3', 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'], owner: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' }))
            await assertSucceeds(setDoc(ownerGroupDoc, { name: 'reds', users: ['tAFWJ8p1jQXFWG4p5GAa5nrwxgG3', 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'], owner: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' }))
            await assertSucceeds(getDoc(ownerGroupDoc))
            await assertSucceeds(getDoc(editorGroupDoc))
            await assertSucceeds(getDoc(outsiderGroupDoc))
            await assertFails(getDoc(unAuthedGroupDoc))
            await assertSucceeds(setDoc(ownerGroupDoc, { name: 'reds2' }, { merge: true }))
            await assertSucceeds(setDoc(editorGroupDoc, { name: 'reds2' }, { merge: true }))
            await assertFails(setDoc(outsiderGroupDoc, { name: 'reds2' }, { merge: true }))
            await assertFails(setDoc(unAuthedGroupDoc, { name: 'reds2' }, { merge: true }))
            await assertFails(deleteDoc(unAuthedGroupDoc))
            await assertFails(deleteDoc(outsiderGroupDoc))
            await assertFails(deleteDoc(editorGroupDoc))
            await assertSucceeds(deleteDoc(ownerGroupDoc))
        })
        test('bookmark', async () => {
            const ownerDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const editorDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2' });
            const outsiderDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG0' });
            const unAuthedDb = unAuthedApp();
            const ownerGroupDoc = doc(collection(ownerDb, 'groups'), 'somegroup');
            await assertSucceeds(setDoc(ownerGroupDoc, { name: 'reds', users: ['tAFWJ8p1jQXFWG4p5GAa5nrwxgG3', 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'], owner: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' }))
            const ownerBookmarkDoc = doc(collection(doc(collection(ownerDb, 'groups'), 'somegroup'), 'bookmarks'), 'somebookmarks');
            const editorBookmarkDoc = doc(collection(doc(collection(editorDb, 'groups'), 'somegroup'), 'bookmarks'), 'somebookmarks2');
            const outsiderBookmarkDoc = doc(collection(doc(collection(outsiderDb, 'groups'), 'somegroup'), 'bookmarks'), 'somebookmarks');
            const unAuthedBookmarkDoc = doc(collection(doc(collection(unAuthedDb, 'groups'), 'somegroup'), 'bookmarks'), 'somebookmarks');
            await assertFails(setDoc(unAuthedBookmarkDoc, { name: 'bookmark' }, { merge: true }))
            await assertFails(setDoc(outsiderBookmarkDoc, { name: 'bookmark' }, { merge: true }))
            await assertSucceeds(setDoc(ownerBookmarkDoc, { name: 'bookmark' }, { merge: true }))
            await assertSucceeds(setDoc(editorBookmarkDoc, { name: 'bookmark2' }, { merge: true }))
            await assertFails(getDoc(unAuthedBookmarkDoc))
            await assertSucceeds(getDoc(outsiderBookmarkDoc)) // for snapshot listener issue
            await assertSucceeds(getDoc(ownerBookmarkDoc))
            await assertSucceeds(getDoc(editorBookmarkDoc))
            await assertFails(setDoc(unAuthedBookmarkDoc, { name: 'bookmark-2' }, { merge: true }))
            await assertFails(setDoc(outsiderBookmarkDoc, { name: 'bookmark-2' }, { merge: true }))
            await assertSucceeds(setDoc(ownerBookmarkDoc, { name: 'bookmark-2' }, { merge: true }))
            await assertSucceeds(setDoc(editorBookmarkDoc, { name: 'bookmark2-2' }, { merge: true }))
            await assertFails(deleteDoc(unAuthedBookmarkDoc))
            await assertFails(deleteDoc(outsiderBookmarkDoc))
            await assertSucceeds(deleteDoc(ownerBookmarkDoc))
            await assertSucceeds(deleteDoc(editorBookmarkDoc))
        })

        test('request', async () => {
            const ownerDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const editorDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2' });
            const requesterDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG1' });
            const outsiderDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG0' });
            const unAuthedDb = unAuthedApp();
            const ownerGroupDoc = doc(collection(ownerDb, 'groups'), 'somegroup');
            await assertSucceeds(setDoc(ownerGroupDoc, { name: 'reds', users: ['tAFWJ8p1jQXFWG4p5GAa5nrwxgG3', 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'], owner: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' }))
            const ownerRequestDoc = doc(collection(doc(collection(ownerDb, 'groups'), 'somegroup'), 'requests'), 'somerequests');
            const editorRequestDoc = doc(collection(doc(collection(editorDb, 'groups'), 'somegroup'), 'requests'), 'somerequests');
            const requesterRequestDoc = doc(collection(doc(collection(requesterDb, 'groups'), 'somegroup'), 'requests'), 'somerequests');
            const outsiderRequestDoc = doc(collection(doc(collection(outsiderDb, 'groups'), 'somegroup'), 'requests'), 'somerequests');
            const unAuthedRequestDoc = doc(collection(doc(collection(unAuthedDb, 'groups'), 'somegroup'), 'requests'), 'somerequests');
            await assertFails(setDoc(ownerRequestDoc, { sender: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' }, { merge: true }))
            await assertFails(setDoc(editorRequestDoc, { sender: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2' }, { merge: true }))
            await assertFails(setDoc(unAuthedRequestDoc, { sender: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2' }, { merge: true }))
            await assertFails(setDoc(outsiderRequestDoc, { sender: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2' }, { merge: true }))
            await assertSucceeds(setDoc(requesterRequestDoc, { sender: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG1' }, { merge: true }))
            await assertSucceeds(getDoc(ownerRequestDoc))
            await assertSucceeds(getDoc(editorRequestDoc))
            await assertFails(getDoc(unAuthedRequestDoc))
            await assertSucceeds(getDoc(outsiderRequestDoc)) // for snapshot listener issue
            await assertSucceeds(getDoc(ownerRequestDoc))
            await assertFails(setDoc(editorRequestDoc, { status: 'accepted' }, { merge: true }))
            await assertFails(setDoc(unAuthedRequestDoc, { status: 'accepted' }, { merge: true }))
            await assertFails(setDoc(outsiderRequestDoc, { status: 'accepted' }, { merge: true }))
            await assertFails(setDoc(requesterRequestDoc, { status: 'accepted' }, { merge: true }))
            await assertSucceeds(setDoc(ownerRequestDoc, { status: 'accepted' }, { merge: true }))
            await assertFails(deleteDoc(editorRequestDoc))
            await assertFails(deleteDoc(unAuthedRequestDoc))
            await assertFails(deleteDoc(outsiderRequestDoc))
            await assertFails(deleteDoc(ownerRequestDoc))
            await assertSucceeds(deleteDoc(requesterRequestDoc))
        })

        test('comment', async () => {
            const ownerDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' });
            const editorDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2' });
            const outsiderDb = authedApp({ uid: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG0' });
            const unAuthedDb = unAuthedApp();
            const ownerGroupDoc = doc(collection(ownerDb, 'groups'), 'somegroup');
            await assertSucceeds(setDoc(ownerGroupDoc, { name: 'reds', users: ['tAFWJ8p1jQXFWG4p5GAa5nrwxgG3', 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG2'], owner: 'tAFWJ8p1jQXFWG4p5GAa5nrwxgG3' }))
            const ownerCommentDoc = doc(collection(doc(collection(ownerDb, 'groups'), 'somegroup'), 'comments'), 'somecomment1');
            const editorCommentDoc = doc(collection(doc(collection(editorDb, 'groups'), 'somegroup'), 'comments'), 'somecomment2');
            const outsiderCommentDoc = doc(collection(doc(collection(outsiderDb, 'groups'), 'somegroup'), 'comments'), 'somecomment3');
            const unAuthedCommentDoc = doc(collection(doc(collection(unAuthedDb, 'groups'), 'somegroup'), 'comments'), 'somecomment1');
            await assertFails(setDoc(unAuthedCommentDoc, { comment: 'hello' }, { merge: true }))
            await assertSucceeds(setDoc(outsiderCommentDoc, { comment: 'hello' }, { merge: true }))
            await assertSucceeds(setDoc(editorCommentDoc, { comment: 'hello' }, { merge: true }))
            await assertSucceeds(setDoc(ownerCommentDoc, { comment: 'hello' }, { merge: true }))
            await assertFails(getDoc(unAuthedCommentDoc))
            await assertSucceeds(getDoc(outsiderCommentDoc))
            await assertSucceeds(getDoc(editorCommentDoc))
            await assertSucceeds(getDoc(ownerCommentDoc))
            await assertFails(setDoc(unAuthedCommentDoc, { comment: 'hi' }, { merge: true }))
            await assertSucceeds(setDoc(outsiderCommentDoc, { comment: 'hi' }, { merge: true }))
            await assertSucceeds(setDoc(ownerCommentDoc, { comment: 'hi' }, { merge: true }))
            await assertSucceeds(setDoc(editorCommentDoc, { comment: 'hi' }, { merge: true }))
            await assertFails(deleteDoc(unAuthedCommentDoc))
            await assertSucceeds(deleteDoc(outsiderCommentDoc))
            await assertSucceeds(deleteDoc(editorCommentDoc))
            await assertSucceeds(deleteDoc(ownerCommentDoc))
        })

    })
})