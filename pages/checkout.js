import React from 'react'
import CheckoutProduct from '../components/CheckoutProduct'
import {useSelector} from 'react-redux'  
import {useSession} from 'next-auth/client'
import {selectItems,selectTotal} from '../slice/basketSlice'
import Header from '../components/Header'
import { useAuth } from '../auth'
  import axios from "axios";
import {loadStripe} from "@stripe/stripe-js"
import Footer from '../components/Footer'
const stripePromise=loadStripe(process.env.stripe_public_key)
function Checkout({categories}) {
    const items=useSelector(selectItems)
    const total=useSelector(selectTotal)
   const [session ] =useSession();
  const{user}=useAuth();
    

    const createCheckoutSession=async()=>{
      const stripe=await stripePromise;
      //call the backend for the create checkoutsession
      const checkoutSession=await axios.post('/api/create-checkout-session',
      {
         items:items,
         email:user.email,
      }
      );
      const result=await stripe.redirectToCheckout({
         sessionId:checkoutSession.data.id
      })
      if (result.error){
         alert(result.error.message)
      }
     }
    return ( 
        <div className="relative">
                <Header data={categories}/>
        <main className="lg:grid lg:grid-cols-6 mt-32">
          <img src="https://links.papareact.com/ikj" 
          className="h-28 px-1 lg:col-span-4 xl:ml-20 sm:px-6 w-[900px] py-2 sm:h-[160px] " alt="" />
        <div className="ml-2 lg:ml-16  m-5 lg:col-span-2 lg:col-start-5  ">
              <div className="bg-gray-200   rounded-lg p-[1px] ">
              <h2 className="border-b-4 text-base ml-2 font-semibold sm:text-base md:text-base my-5 md:ml-1 lg:ml-7  border-gray-300">
                Subtotal({items.length}items:)
              <span className="font-bold ml-1">${total}</span>
              </h2>
              </div>
              <button 
              role="link"
              onClick={createCheckoutSession}
              disabled={!user && !session}
              className={`bg-gray-400 mt-2 h-8 p-1 lg:ml-10 text-black text-base font-semibold ml-2 rounded-md
               ${!session&& "bg-gray-300 "}`}>{ !user && !session? 'Sign in to Checkout':'Proced to checkout'}</button>
       </div>


                <div className="lg:col-start-1 col-span-4 ">
             <div className="space-y-6 p-2 ">
                <h1 className="text-sm sm:text-base md:text-lg border-b-4 border-gray-300 font-bold italic text-gray-700 tracking-wider">
                  {items.length===0 ?`Your Basket is empty`:`Shopping Basket`}</h1>
                  {items.map((item,i)=>(
                      <CheckoutProduct
                      key={item.id}
                      slug={item.slug}
                      id={item.id}
                      image={item.image}  
                      title={item.title}
                      price={item.price}
                      description={item.description}
                      />
                      ))}
             </div>
                </div>
            </main>
            <div className="mt-[600px]">

<Footer/>
            </div>
                      </div>
    
    )
}
export async function getServerSideProps(){
    const ress=await fetch("https://djangoapi3.herokuapp.com/api/category/")
    const categories=await ress.json();
    return{
      props:{
        categories
      }
    }
  }

export default Checkout
