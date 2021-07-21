import {buffer} from 'micro'
import * as admin from 'firebase-admin'

const serviceAccount =require('../../permission.json')
const app =!admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();
const stripe =require ("stripe")(process.env.STRIPE_SECRET_KEY);
const fullfillOrder=async (session)=>{

 return app.firestore().collection("users")
 .doc(session.metadata.email)
 .collection("orders").doc(session.id).set({
     amount: session.amount_total /100,
     amount_shipping:session.total_datails.amount_shipping /100,
     images:JSON.parse(session.metadata.images),
     timestamp: admin.firestore.FieldValue.serverTimestamp(),
 })
 .then(()=>{
     console.log(`SECCES:order ${session.id} had been added to the db`);
 })
}

export default async (req, res)=>{
    if(req.method === "POST"){
        const requestBuffer=await buffer(req);
        const payload=requestBuffer.toString();
        const sig= req.headers["stripe-signature"];
        const event=stripe.webhooks.constructEvent(payload,sig,process.env.STRIPE_SIGNING_SECRET)
        
        if (event.type === 'checkout-session-complited'){
            const session=event.data.object;

        return fullfillOrder(session).then(()=>res.status(200))
        .catch((err)=>res.status(400).send(`Webhook Error: ${err.message}`));
        }
    }
};
export const config={
    api:{
        bodyParser: false,
        externalResolver: true
    }
}