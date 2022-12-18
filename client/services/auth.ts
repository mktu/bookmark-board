
import firebaseApp from './firebaseClient';
import {
    getAuth, onIdTokenChanged,
    User as FirebaseUser,
    GoogleAuthProvider,
    signInWithPopup,
    getRedirectResult,
    signInWithRedirect,
    linkWithPopup,
    updateProfile,
    signInAnonymously,
    signOut
} from "firebase/auth";

const auth = getAuth(firebaseApp)

const loginDebugLog = (user: User) => { console.debug(`${user?.name || ''} logged in`) }

const convertUser = (user: FirebaseUser): User => {
    return {
        uid: user.uid,
        isAnonymous: user.isAnonymous,
        name: user.displayName
    }
}

export const listenAuthState = (onLogin: Transfer<FirebaseUser>, onLogout: () => void, onError?: () => void) => {
    return onIdTokenChanged(auth, function (user) {
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
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((usercred) => {
        if (usercred?.user) {
            onSucceeded(convertUser(usercred.user))
        }
    }).catch(onFailed);
}

export const loginByGoogleWithRedirect = (
    onSucceeded: Transfer<User> = loginDebugLog,
    onFailed: ErrorHandler = console.error
) => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider).catch(onFailed);
    getRedirectResult(auth).then(result => {
        if (result) {
            onSucceeded(convertUser(result.user))
        }
    }, onFailed)
}

export const linkWithGoogle = (
    onSucceeded: Transfer<User>,
    onFailed: ErrorHandler = console.error
) => {
    const provider = new GoogleAuthProvider();
    const curUser = auth.currentUser;
    linkWithPopup(curUser, provider).then(function (usercred) {
        const user = usercred.user;
        updateProfile(user, {
            displayName: user.displayName
        }).then(function () {
            onSucceeded(convertUser(user));
        }).catch(onFailed)
    }).catch(onFailed);
}

export const loginWithAnonymous = (
    onSucceeded: Transfer<User> = loginDebugLog,
    onFailed: ErrorHandler = console.error
) => {
    signInAnonymously(auth).then((usercred) => {
        usercred.user && onSucceeded(convertUser(usercred.user))
    }
    ).catch(onFailed);
}

export const logout = (
    onSucceeded = console.log,
    onFailed: ErrorHandler = console.error
) => {
    signOut(auth).then(onSucceeded).catch(onFailed);
}

export const getIdToken = async () => await auth.currentUser.getIdToken()