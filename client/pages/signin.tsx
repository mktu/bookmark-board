import React from 'react'
import Head from 'next/head'
import SignIn from '../components/SignIn'
import { RequireNotSigned } from '../components/App'

export default function Signin() {
  return (
    <div>
      <Head>
        <title>Signin</title>
      </Head>
      <RequireNotSigned>
        <SignIn />
      </RequireNotSigned>
    </div>
  )
}
