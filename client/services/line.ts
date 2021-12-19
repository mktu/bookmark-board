import querystring from 'querystring';
import { getClientsideQueryStrings } from '@utils/routes'

export const clientId = process.env.NEXT_PUBLIC_LINE_CLIENT_ID
export const clientSecret = process.env.NEXT_PUBLIC_LINE_CLIENT_SECRET
export const addFriendLink = process.env.NEXT_PUBLIC_LINE_ADD_FRIEND_LINK



export class LineLogicError extends Error {
    constructor(e?: string) {
        super(e);
        this.name = new.target.name;

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}


export const getUser = async (idToken: string) => {
    if (!idToken) {
        return null
    }
    const response = await fetch('https://api.line.me/oauth2/v2.1/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
            id_token: idToken,
            client_id: clientId
        })
    })
    const data = await response.json()
    return {
        id: data.sub,
        name: data.name
    }
}


export const getAccessToken = async (redirectUrl: string) => {
    const code = getClientsideQueryStrings('code')
    if (!code) {
        throw new LineLogicError('認可コードを取得できませんでした')
    }
    const reqBody = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUrl,
        client_id: clientId,
        client_secret: clientSecret
    };
    const reqConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const response = await fetch(
        'https://api.line.me/oauth2/v2.1/token',
        { method: 'POST', headers: reqConfig.headers, body: querystring.stringify(reqBody) }
    )
    const data = await response.json()

    return data.id_token as string
}

export const lineLogin = (redirectUrl: string) => {
    // Build query string.
    const query = querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        state: Math.random().toString(32).substring(2),
        scope: 'profile openid',
        prompt: 'consent',
        bot_prompt: 'normal',
        redirect_uri: redirectUrl
    });
    // Build the Line authorise URL.
    const lineAuthoriseURL =
        'https://access.line.me/oauth2/v2.1/authorize?' +
        query
    // Redirect to external URL.
    window.location.href = lineAuthoriseURL;
}