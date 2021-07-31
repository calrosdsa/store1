import { buffer } from "micro";
import * as admin from 'firebase-admin'
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});
const webhookSecret = process.env.STRIPE_SIGNING_SECRET;

export const config = {
    api: {
        bodyParser: false,
    },
};


const serviceAccount =require('../../permission.json')
const app =!admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

const fullfillOrder = async (user) => {
    try {
      return app
        .firestore()
        .collection("users")
        .doc(user.metadata.email)
        .collection("orders")
        .doc(user.id)
        .set({
          amount: user.amount_total / 100,
          amount_shipping: user.total_details.amount_shipping / 100,
          images: JSON.parse(user.metadata.images),
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log(`SUCCESS : Order ${user.id} has been added to DB.`);
        });
    } catch (error) {
      console.error(error);
    }
  };

const handler = async (req, res) => {
    if (req.method === "POST") {
        const buf = await buffer(req);
        const sig = req.headers["stripe-signature"];

        let stripeEvent;

        try {
            stripeEvent = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
            console.log( 'stripeEvent', stripeEvent );
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        if ( 'checkout.session.completed' === stripeEvent.type ) {
            const session = stripeEvent.data.object;
            console.log( 'payment success', session );
            return fullfillOrder(session).then(()=>res.status(200))
            .catch((err)=>res.status(400).send(`Webhook Error: ${err.message}`))
// Do something here on payment success, like update order etc.
        }

        res.json({ received: true });
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};

export default handler;