import 'tailwindcss/tailwind.css'
import {Provider} from 'react-redux'
import {store} from '../app/store'
import { UserProvider } from '@auth0/nextjs-auth0';
function MyApp({ Component, pageProps }) {
  return(
    <UserProvider>
    <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
    </UserProvider>


    
    )
}

export default MyApp
