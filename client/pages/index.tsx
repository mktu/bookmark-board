import Head from 'next/head'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Main/>
    </div>
  )
}
