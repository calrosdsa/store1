import React from 'react'
import CheckoutProduct from '../components/CheckoutProduct'
import {useSelector} from 'react-redux'  
import {selectItems,selectTotal} from '../slice/basketSlice'
import Header from '../components/Header'
import { useUser } from '@auth0/nextjs-auth0'
  import axios from "axios";
import {loadStripe} from "@stripe/stripe-js"
import Footer from '../components/Footer'
const stripePromise=loadStripe(process.env.stripe_public_key)
function Checkout({categories}) {
    const items=useSelector(selectItems)
    const total=useSelector(selectTotal)
    const {user}=useUser();
   async function createCheckoutSession() {
    const stripe = await stripePromise;

    // Call the backend to create a checkout user...
    const checkoutSession = await axios.post(
        "/api/create-checkout-session",
        {
            items,
            email:user.email,
        }
    );

    // After have created a session, redirect the user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
    });

    if (result.error) {
        alert(result.error.message); // @todo : Improve that!
    }
}
    return ( 
      <>

        <div className="">
                <Header data={categories}/>
          <img src="https://links.papareact.com/ikj" 
          className="h-28 mt-32 px-1 xl:col-span-4 xl:ml-20 sm:px-6 w-[900px] py-2 sm:h-[160px] " alt="" />
                <main className="xl:grid xl:grid-cols-6 xl:grid-rows-1  mt-2 ">
        <div className="ml-2 px-1 pr-3 max-w-[700px] xl:px- sm:px-5 md:px-20  xl:row-start-1  xl:col-span-2 xl:col-start-5  ">
              <div className="bg-gray-200   rounded-lg p-[1px] ">
              <h2 className="border-b-4 text-base truncate  font-semibold sm:text-base md:text-base my-5 ml-5  border-gray-300">
                Subtotal({items.length}items:)
              <span className="font-bold ml-1">${total}</span>
              </h2>
              </div>
              <button 
              role="link"
              onClick={createCheckoutSession}
              disabled={!user}
              className={`bg-gray-400 mt-2 h-8 p-1 lg:ml-10 text-black text-base font-semibold ml-2 rounded-md
              ${!user&& "bg-gray-300 "}`}>{!user? 'Sign in to Checkout':'Proced to checkout'}</button>

              <img className="hidden xl:block col-span-1   lg:h-[100px] my-7 min-w-[300px] 2xl:min-w-[600px]  xl:h-[150px]  " 
                      src="https://www.isidroperez.com/wp-content/uploads/2017/12/descuentos1.jpg" alt="" />
              <img className="hidden xl:block col-span-1   lg:h-[100px] my-7 min-w-[300px] 2xl:min-w-[600px]  xl:h-[150px]  " 
                      src="https://links.papareact.com/dyz" alt="" />
                      <img className="hidden xl:block col-span-1   lg:h-[100px] my-7 min-w-[300px] 2xl:min-w-[600px] xl:h-[150px]  " 
                      src="https://c0.wallpaperflare.com/preview/447/552/983/ecommerce-online-shop-euro.jpg"  alt="" />
       </div>
            <div className=" ">

                      </div>

                <div className="xl:col-start-1 xl:row-start-1 col-span-4 ">
             <div className="space-y-6 p-2 ">
                <h1 className="text-sm sm:text-base md:text-xl border-b-4 border-gray-300 font-bold italic text-gray-700 tracking-wider">
                  {items.length===0 ?`Your Basket is empty`:`Shopping Basket`}</h1>
                  {items.map((item,i)=>(
                    <CheckoutProduct
                      key={item.id}
                     {...item}
                      />
                      ))}
             </div>
                </div>
            <div className="col-span-8   mt-[400px] xl:mt-[600px]">
<Footer/>
            </div>
            </main>
                
                      </div>
                      </>
    
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
