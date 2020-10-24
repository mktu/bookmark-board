import Head from 'next/head'
import HomeComponent from '../components/Home'
import {AppLayout} from '../components/Layout'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <AppLayout 
        header={<Header />}
        sidebar={<Sidebar />}
        main={<HomeComponent />}
      />
    </div>
  )
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const {firebaseAdmin} = await import('../services/firebaseServer')
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const {uid} = token
    console.log(cookies.token)
    return {
      props: { uid },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    ctx.res.writeHead(302, { Location: '/signin' })
    ctx.res.end();

    // `as never` prevents inference issues 
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've 
    // already redirected the user.
    return { props: {} as never };
  }
};