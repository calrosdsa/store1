import { getSession, session } from 'next-auth/client';
import React from 'react'
import db from '../firebase';
import Order from '../components/Order';
import moment from 'moment';
import { useUser } from '@auth0/nextjs-auth0';
import Header from '../components/Header';
import Footer from '../components/Footer';
 function Orders({orders,categories}) {
    const {user}=useUser()
    console.log(orders)
    return (
        <div>

        <div className="grid xl:grid-cols-5 my-40">
            <Header data={categories}/>
            {user?(
                <h2 className="xl:text-2xl text-xl font-bold italic  border-b-4 border-gray-600  col-start-3 mx-auto">Your orders</h2>
                ):(<h2 className="my-40 -mt-1 xl:text-2xl font-bold italic  border-b-4 border-gray-600  col-start-3 mx-auto">
                Please Sign In to see your orders</h2>
                )}
            <div className="col-span-5">
        {orders?.map(({timestamp,amount,images,amountShipping,items,id})=>(
            <Order
            timestamp={timestamp}
            amount={amount}
            key={id}
            id={id}
            images={images}
            amountShipping={amountShipping}
            items={items}
            />
            ))}

            </div>
        </div>
            <Footer/>
            </div>
    )
}
export default Orders;
export async function getServerSideProps(context){
    const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);
    const user=await getSession(context);
    const ress=await fetch("https://djangoapi3.herokuapp.com/api/category/")
    const categories=await ress.json();
    if(!user){
        return{
            props:{
                categories,
            }
        }
    }
    const stripeOrders=await db.collection('users').doc(user.email).collection('orders')
    .orderBy('timestamp','desc').get();

    const orders=await Promise.all(
        stripeOrders.docs.map(async(order)=>({
            id:order.id,
            amount:order.data().amount,
            amountShipping:order.data().amount_shipping,
            images:order.data().images,
            timestamp:moment(order.data().timestamp.toDate()).unix(),
            items:(
                await stripe.checkout.sessions.listLineItems(order.id,{
                    limit:100
                })
            ).data,
        }))
        )
    return{
        props:{
            orders,
            categories,
        }
    }
}
