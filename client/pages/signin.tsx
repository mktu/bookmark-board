import Head from 'next/head'
import SignIn from '../components/SignIn'
import { RequireNotSigned } from '../components/App'

export default function Signin() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <RequireNotSigned>
        <SignIn />
      </RequireNotSigned>
    </div>
  )
}
