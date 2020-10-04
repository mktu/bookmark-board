import '../styles/globals.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  if(typeof window !== 'undefined'){
    console.log(window)
  }
  else{
    console.log('server')
  }
  return (
    <Layout
      header={<Header />}
      sidebar={<Sidebar />}
      main={<Component {...pageProps} />}
    />

  )
}

export default MyApp
