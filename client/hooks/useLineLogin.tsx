import { useEffect, useState } from 'react'
import { getOrigin } from '@utils/index'
import { getUser, getAccessToken, lineLogin, LineLogicError, addFriendLink } from '../services/line'


export const lineLoginSettingPage = `${getOrigin()}/profile/line-setting`
export const lineGroupsPage = `${getOrigin()}/line/groups`

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

export {
  useLineAuth,
  lineLogin,
  getUser,
  getAccessToken
}