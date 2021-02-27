import React from 'react'
import SignIn from '../components/SignIn'
import AppMeta from '../components/Meta/AppMeta'
import { RequireNotSigned } from '../components/App'

export default function Signin() {
  return (
    <div>
      <AppMeta title='サインイン' path='signin' />
      <RequireNotSigned>
        <SignIn />
      </RequireNotSigned>
    </div>
  )
}
