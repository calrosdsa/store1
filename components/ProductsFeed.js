import React from 'react'
import Prodcuts from './Prodcuts'
function ProductsFeed({posts}) {
    
    return (
        <div className=" overflow-x-auto mt-32 ">
        <div className="flex lg:grid lg:grid-cols-4 2xl:grid-cols-5 m-4">
            {posts.sort((a, b)=>a.toString().localeCompare(b)).map(({title,slug,id,image,description,specifications,regular_price})=>(
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
