import { getProviders, signIn,csrfToken, getCsrfToken, getSession } from 'next-auth/client'

export default function SignIn({ providers,csrfToken }) {
  return (
    <>
    <div>
    <form method='post' action='/api/auth/signin/email'>
      <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
      <label>
        Email address
        <input type='email' id='email' name='email'/>
      </label>
      <button type='submit'>Sign in with Email</button>
    </form>
    </div>

      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))}
    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
/*
export async function getServerSideProps(context){
  const providers = await getProviders()
  return {
    props: { providers }
  }
}
export async function getServerSideProps(context){
    const csrfToken = await getCsrfToken(context)
    return {
      props: { csrfToken }
    }
  }
*/
// If older than Next.js 9.3
SignIn.getInitialProps = async (context) => {
    const{req,res}=context;
    const session=await getSession({req});

    if (session && res){
        res.writeHead(302,{
            Location:"/",
        });
        res.end()
        return;
    }
  return {
      session: undefined,
    providers: await getProviders(),
    csrfToken:await getCsrfToken()
  }
}
  