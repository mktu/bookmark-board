import { useEffect, useState, useCallback } from 'react'
import querystring from 'querystring';
import url from 'url';
import { getOrigin } from '@utils/index'

const clientId = process.env.NEXT_PUBLIC_LINE_CLIENT_ID
const clientSecret = process.env.NEXT_PUBLIC_LINE_CLIENT_SECRET
const addFriendLink = process.env.NEXT_PUBLIC_LINE_ADD_FRIEND_LINK
const lineLoginSettingPage = `${getOrigin()}/profile/line-setting`

const useLineAuth = () => {
  const [idtoken, setIdtoken] = useState('')
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')
  const getAccessToken = useCallback(async () => {
    const currentLocation = window.location.href
    const urlParts = url.parse(currentLocation, true);
    const query = urlParts.query;
    const hasCodeProperty = Object.prototype.hasOwnProperty.call(query, 'code');
    if (!hasCodeProperty) {
      setError('認可コードを取得できませんでした')
      return
    }
    const reqBody = {
      grant_type: 'authorization_code',
      code: query.code,
      redirect_uri: lineLoginSettingPage,
      client_id: clientId,
      client_secret: clientSecret
    };
    const reqConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    try {
      const response = await fetch(
        'https://api.line.me/oauth2/v2.1/token',
        { method: 'POST', headers: reqConfig.headers, body: querystring.stringify(reqBody) }
      )
      const data = await response.json()
      setIdtoken(data.id_token)
      setError('')
    } catch (e) {
      setError('アクセストークン取得に失敗しました')
      console.error(e)
    }
  }, []);

  const getUserId = useCallback(async () => {
    if (!idtoken) {
      return
    }
    try{
      const response = await fetch('https://api.line.me/oauth2/v2.1/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
          id_token: idtoken,
          client_id: clientId
        })
      })
      const data = await response.json()
      setUserId(data.sub)
      setError('')
    }catch(e){
      setError('ユーザID取得に失敗しました')
      console.error(e)
    }
  }, [idtoken])

  useEffect(() => {
    getAccessToken()
  }, [getAccessToken])

  useEffect(() => {
    getUserId()
  }, [getUserId])

  return {
    userId,
    error,
    addFriendLink
  }
}

const useLineLogin = () => {
  const lineLogin = () => {
    // Build query string.
    const query = querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      state: Math.random().toString(32).substring(2),
      scope: 'openid',
      prompt: 'consent',
      bot_prompt: 'normal',
      redirect_uri: lineLoginSettingPage
    });
    // Build the Line authorise URL.
    const lineAuthoriseURL =
      'https://access.line.me/oauth2/v2.1/authorize?' +
      query
    // Redirect to external URL.
    window.location.href = lineAuthoriseURL;
  }
  return {
    lineLogin,
  }
}

export {
  useLineAuth,
  useLineLogin
}