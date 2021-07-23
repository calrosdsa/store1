import React from 'react'
import Producto from './Producto'

function ProductFeed2({post}) {

    return (
        <div className="mt-32">
           <Producto
           title={post.title}
           image={post.image}
           description={post.description}
           id={post.id}
           key={post.id}
           slug={post.slug}
           regular_price={post.regular_price}
           specifications={post.specifications.map((specification)=>(
               <h1>{specification.value}</h1>
           ))}
           />
        </div>
    )
}

export default ProductFeed2
