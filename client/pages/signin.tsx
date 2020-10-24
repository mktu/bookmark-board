import Head from 'next/head'
import SignIn from '../components/SignIn'
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';

export default function Signin() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <SignIn/>
    </div>
  )
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const {firebaseAdmin} = await import('../services/firebaseServer')
    await firebaseAdmin.auth().verifyIdToken(cookies.token)
    
    ctx.res.writeHead(302, { Location: '/home' })
    ctx.res.end();

    return { props: {} as never };
  } catch (err) {

    return { props: {} };
  }
};