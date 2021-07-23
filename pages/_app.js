import 'tailwindcss/tailwind.css'
import {Provider as AuthProviderr} from 'next-auth/client'
import {Provider} from 'react-redux'
import {store} from '../app/store'
import {AuthProvider} from '../auth'
function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
    <AuthProviderr session={pageProps.session}> 
    <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
    </AuthProviderr>
    </AuthProvider>
    
    )
}

export default MyApp
