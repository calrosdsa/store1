import React from 'react'
import Producto from './Producto'

function ProductFeed2({product}) {

    return (
        <div className="">
           <Producto
           title={product.title}
           image={product.image}
           description={product.description}
           id={product.id}
           colors={product.colors}
           key={product.id}
           size={product.size}
           category_name={product.category_name}
           slug={product.slug}
           regular_price={product.regular_price}
           product_image={product.product_image}
              
           />
        </div>
    )
}

export default ProductFeed2
