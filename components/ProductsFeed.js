import React from 'react'
import Prodcuts from './Prodcuts'
function ProductsFeed({posts}) {
    
    return (
        <div className=" overflow-x-auto mt-10 ">
        <div className="flex">
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
                </div>
    )
}

export default ProductsFeed
