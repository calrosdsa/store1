import React from 'react'
import Prodcuts from './Prodcuts'
function ProductsFeed({posts}) {
    
    return (
        <div className=" overflow-x-auto mt-1 ">
        <div className="flex  lg:grid-cols-4 2xl:grid-cols-5 m-4">
            {posts.map(({title,slug,id,image,description,specifications})=>(
                <Prodcuts
                key={id}
                id={id}
                title={title}
                image={image}
                description={description}
                slug={slug}
                specifications={specifications}
                />
                ))}
        </div>
                </div>
    )
}

export default ProductsFeed
