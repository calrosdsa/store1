import React from 'react'
import Prodcuts from './Prodcuts'
function ProductsFeed({posts}) {
    
    return (
        <div>
            {posts.map(({title,slug,id,product_image,description})=>(
                <Prodcuts
                key={id}
                id={id}
                title={title}
                product_image={product_image}
                description={description}
                slug={slug}
                />
            ))}
        </div>
    )
}

export default ProductsFeed
