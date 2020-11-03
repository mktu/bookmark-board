import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../reducers'
import AppProvider from '../components/Provider'

function MyApp({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    console.log(window)
  }
  else {
    console.log('server')
  }
  return (
    <Provider store={store}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </Provider>

  )
}

export default MyApp
