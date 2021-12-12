import { useEffect, useState, useContext, useCallback } from 'react'
import { getOrigin } from '@utils/index'
import { getUser, getAccessToken, lineLogin, LineLogicError, addFriendLink } from '../services/line'
import FirebaseContext from '@context/FirebaseContext'


export const lineLoginSettingPage = `${getOrigin()}/profile/line-setting`
export const lineGroupsPage = `${getOrigin()}/line/groups`

const useLineAuth = (redirectUrl: string) => {
  const { clientService } = useContext(FirebaseContext)
  const [idToken, setIdToken] = useState('')
  const [registerStatus, setStatus] = useState<'executing'|'error'|'complete'>('executing')
  const [error, setError] = useState('')

  useEffect(() => {
    getAccessToken(redirectUrl).then(setIdToken).catch(e => {
      console.error(e)
      setStatus('error')
      if (e instanceof LineLogicError) {
        setError(e.message)
      } else {
        setError('アクセストークン取得に失敗しました')
      }
    })
  }, [redirectUrl])

  const register = useCallback(async () => {
    if (!idToken || clientService.mock) {
      return
    }
    setStatus('executing')
    const firebaseIdToken = await clientService.getIdToken()
    const res = await fetch(`/api/line/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${firebaseIdToken}`,
      },
      body: JSON.stringify({
        idToken,
      })
    });
    if(!res.ok){
      setError('LINE連携登録に失敗しました.')
      setStatus('error')
      return
    }
    setError('')
    setStatus('complete')

  }, [clientService, idToken])

  useEffect(() => {
    register().catch(e=>{
      console.error(e)
      setStatus('error')
    })
  }, [register])

  return {
    error,
    addFriendLink,
    registerStatus
  }
}

export {
  useLineAuth,
  lineLogin,
  getUser,
  getAccessToken
}