import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../reducers'
import FirebaseProvider from '../components/Provider/FirebaseProvider'

function MyApp({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    console.log(window)
  }
  else {
    console.log('server')
  }
  return (
    <Provider store={store}>
      <FirebaseProvider>
        <Component {...pageProps} />
      </FirebaseProvider>
    </Provider>

  )
}

export default MyApp
