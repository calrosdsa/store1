import React from 'react'
import Prodcuts from './Prodcuts'
function ProductsFeed({posts}) {
    
    return (
        <div className=" overflow-x-auto mt-20 ">
        <div className="flex ">
            {posts.map(({title,slug,id,image,description,specifications,regular_price})=>(
                <Prodcuts
                key={id}
                id={id}
                title={title}
                image={image}
                description={description}
                slug={slug}
                specifications={specifications}
                regular_price={regular_price}
                />
                ))}
        </div>
                </div>

    )
}

export default ProductsFeed
