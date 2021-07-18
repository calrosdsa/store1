import React from 'react'
import Prodcuts from './Prodcuts'
function ProductsFeed({posts}) {
    
    return (
        <div className=" overflow-x-auto mt-1 ">
        <div className="flex sm:grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 m-4">
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
