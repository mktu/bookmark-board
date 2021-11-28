import { useEffect, useState } from 'react'
import querystring from 'querystring';
import url from 'url';
import { getOrigin } from '@utils/index'

const clientId = process.env.NEXT_PUBLIC_LINE_CLIENT_ID
const clientSecret = process.env.NEXT_PUBLIC_LINE_CLIENT_SECRET
const addFriendLink = process.env.NEXT_PUBLIC_LINE_ADD_FRIEND_LINK

export const lineLoginSettingPage = `${getOrigin()}/profile/line-setting`
export const lineGroupsPage = `${getOrigin()}/line/groups`

class LineLogicError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const getAccessToken = async (redirectUrl: string) => {
  const currentLocation = window.location.href
  const urlParts = url.parse(currentLocation, true);
  const query = urlParts.query;
  const hasCodeProperty = Object.prototype.hasOwnProperty.call(query, 'code');
  if (!hasCodeProperty) {
    throw new LineLogicError('認可コードを取得できませんでした')
  }
  const reqBody = {
    grant_type: 'authorization_code',
    code: query.code,
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

const getUser = async (idToken: string) => {
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

const useLineAuth = (redirectUrl: string) => {
  const [idtoken, setIdtoken] = useState('')
  const [user, setUser] = useState<{ id: string, name: string }>()
  const [error, setError] = useState('')

  useEffect(() => {
    getAccessToken(redirectUrl).then(setIdtoken).catch(e => {
      console.error(e)
      if (e instanceof LineLogicError) {
        setError(e.message)
      } else {
        setError('アクセストークン取得に失敗しました')
      }
    })
  }, [redirectUrl])

  useEffect(() => {
    if(!idtoken){
      return
    }
    getUser(idtoken).then(user => {
      setUser(user)
      setError('')
    }).catch(e => {
      setError('ユーザID取得に失敗しました')
      console.error(e)
    })
  }, [idtoken])

  return {
    user,
    error,
    addFriendLink
  }
}

const lineLogin = (redirectUrl: string) => {
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

export {
  useLineAuth,
  lineLogin,
  getUser,
  getAccessToken
}