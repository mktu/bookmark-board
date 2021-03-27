
import firebase from './firebaseClient';

const loginDebugLog = (user:User) => {console.debug(`${user?.name || ''} logged in`)}

const convertUser = (user: firebase.User): User => {
    return {
        uid: user.uid,
        isAnonymous: user.isAnonymous,
        name: user.displayName
    }
}

export const listenAuthState = (onLogin: Transfer<firebase.User>, onLogout: () => void, onError?: () => void) => {
    return firebase.auth().onIdTokenChanged(function (user) {
        if (user) {
            onLogin(user)
        } else {
            onLogout();
        }
    }, (error) => {
        console.error(error)
        onError && onError()
    });
}

export const loginByGoogle = (
    onSucceeded: Transfer<User> = loginDebugLog,
    onFailed: ErrorHandler = console.error
) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((usercred) => {
        usercred.user && onSucceeded(convertUser(usercred.user))
    }).catch(onFailed);
}

export const loginByGoogleWithRedirect = (
    onSucceeded: Transfer<User> = loginDebugLog,
    onFailed: ErrorHandler = console.error
) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).catch(onFailed);
    firebase.auth().getRedirectResult().then(result => {
        onSucceeded(convertUser(result.user))
    }, onFailed)
}

export const linkWithGoogle = (
    onSucceeded: Transfer<User>,
    onFailed: ErrorHandler = console.error
) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const curUser = firebase.auth().currentUser;
    curUser?.linkWithPopup(provider).then(function (usercred) {
        const user = usercred.user;
        const profile = usercred.additionalUserInfo?.profile as { name: string };
        user?.updateProfile({
            displayName: profile.name
        }).then(function () {
            onSucceeded(convertUser(user));
        }).catch(onFailed)
    }).catch(onFailed);
}

export const loginWithAnonymous = (
    onSucceeded: Transfer<User> = loginDebugLog,
    onFailed: ErrorHandler = console.error
) => {
    firebase.auth().signInAnonymously().then((usercred) => {
        usercred.user && onSucceeded(convertUser(usercred.user))
    }
    ).catch(onFailed);
}

export const logout = (
    onSucceeded = console.log,
    onFailed: ErrorHandler = console.error
) => {
    firebase.auth().signOut().then(onSucceeded).catch(onFailed);
}