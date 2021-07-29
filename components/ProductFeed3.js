import React from 'react'
import Prodcuts from './Prodcuts'
function ProductsFeed3({products,setShowCart}) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 mb-20 mt-24  grid-flow-row-dense">

            {products && products.slice(0,8).map(({title,colors,size,slug,id,product_image,description,regular_price})=>(
                <Prodcuts
                key={id}
                setShowCart={setShowCart}
                products={products}
                size={size}
                id={id}
                colors={colors}
                title={title}
                product_image={product_image[0].product_image}
                description={description}
                setShowCart={setShowCart}
                slug={slug}
                regular_price={regular_price}
                />
                ))}
                <img className=" col-span-full h-[130px] md:h-[200px] lg:h-[300px] my-3 min-w-full place-items-center" src="https://links.papareact.com/dyz" alt="" />

        {products && products.slice(8,products.lentgh).map(({title,colors,slug,id,product_image,description,discount_price,specifications,regular_price})=>(
            <Prodcuts
            key={id}
            products={products}
            id={id} 
            colors={colors}
            title={title}
            product_image={product_image[0].product_image}
            description={description}
            slug={slug}
            setShowCart={setShowCart}
            regular_price={regular_price}
            />
            ))}
        </div>
    )
}



export default ProductsFeed3
