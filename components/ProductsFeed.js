import React from 'react'
import Prodcuts from './Prodcuts'
function ProductsFeed({products,setShowCart}) {
    
    return (
        <div className=" overflow-x-auto mt-20 ">
        <div className="flex ">
            {products && products.map(({title,slug,id,product_image,description,specifications,regular_price})=>(
                <Prodcuts
                key={id}
                id={id}
                setShowCart={setShowCart}
                setShowCart={setShowCart}
                title={title}
                product_image={product_image[0].product_image}
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
