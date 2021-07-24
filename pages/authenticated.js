import React from 'react'
import nookies from 'nookies'
import {verifyToken} from '../firebaseAdmin'
import firebaseClient from '../firebaseClient'
import firebase from 'firebase/app'
function Authenticated({session}) {
    firebaseClient();
    if(session){

        return (
            <div>
            <h1>Auhthenticated</h1>
            <div>
                <h1>{session}</h1>
            </div>
            <div>
                <button className="bg-gray-300 h-20 w-44" onClick={async()=>{
                    await firebase.auth().signOut();
                    window.location.href="/"}}
                >Sign out</button>
            </div>
        </div>
    );
}else{
    return(
        <div>Text loading</div>
    )
}
}

export async function getServerSideProps(context){
    try{
        const cookies=nookies.get(context);
        const token=await verifyToken(cookies.token);
        const{uid, email}=token;
        return{
            props:{session:`Your email is ${email} and you uid is ${uid}`},
        };
    }catch(err){
        context.res.writeHead(302,{location:"/login"});
        context.res.end();
    return{props:[]};
    }
}
export default Authenticated;