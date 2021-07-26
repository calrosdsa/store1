import { useRouter } from 'next/router'
import React from 'react'

function success() {
    const router=useRouter();
    return (
        <div>
            The Process was complited successfuly
            <button className="bg-gray-800 text-gray-300" onClick={()=>router.push('/orders')}>Go to my Orders</button>
        </div>
    )
}

export default success
