import 'tailwindcss/tailwind.css'
import {Provider} from 'react-redux'
import {store} from '../app/store'
import {Provider as AuthProviderr} from 'next-auth/client'
import {AuthProvider} from '../auth'
function MyApp({ Component, pageProps }) {
  return(
    <AuthProviderr session={pageProps.session}>
    <AuthProvider  session={pageProps.session}>
    <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
    </AuthProvider>
    </AuthProviderr>


    
    )
}

export default MyApp
