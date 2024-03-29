import React from 'react'
import 'focus-visible'
import '../styles/globals.css'
import 'react-responsive-modal/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import store from '../reducers'
import AppProvider from '../components/Provider'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </Provider>

  )
}

export default MyApp
