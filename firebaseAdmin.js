
const admin=require('firebase-admin')
const serviceAccount=require('./permission.json')

export const verifyToken=(token)=>{
    if(!admin.apps.length){
        admin.initializeApp({

            credential:admin.credential.cert(serviceAccount),
        });
    }
    return admin.auth().verifyIdToken(token).catch((error)=>{
        throw error;
    })
}