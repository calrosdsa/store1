import React from 'react'
import Prodcuts from './Prodcuts'
function ProductsFeed4({posts}) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-32">
            {posts.sort(() => Math.random() - Math.random()).slice(0,10).map(({title,discount_price,slug,id,image,description,specifications,regular_price})=>(
                <Prodcuts
                key={id}
                id={id}
                title={title}
                image={image}
                description={description}
                discount_price={discount_price}
                slug={slug}
                specifications={specifications}
                regular_price={regular_price}
                />
                ))}
        </div>
    )
}

export default ProductsFeed4
