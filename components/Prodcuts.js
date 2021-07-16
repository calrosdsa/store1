import React from 'react'
import {useRouter} from 'next/router'

function Prodcuts({slug,id, title,product_image,description}) {
    const router=useRouter();
    return (
        <div key={id} onClick={()=>router.push(`product/${encodeURIComponent(slug)}`)} >
            <h1>{title}</h1>
            <img src={product_image[0].image} alt="" />
            <p>{description}</p>
        </div>
    )
}

export default Prodcuts
