import React from 'react'
import Prodcuts from './Prodcuts'
function ProductsFeed4({products}) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-20 mt-24  grid-flow-row-dense">

                <img className=" col-span-full h-[130px] md:h-[200px] lg:h-[300px] my-7 min-w-full place-items-center" 
                src="https://www.isidroperez.com/wp-content/uploads/2017/12/descuentos1.jpg" alt="" />
            {products.sort(() => Math.random() - Math.random()).slice(0,4).map(({title,discount_price,slug,id,product_image,description,specifications,regular_price})=>(
                <Prodcuts
                key={id}
                id={id}
                title={title}
                product_image={product_image[0].product_image}
                description={description}
                discount_price={discount_price}
                slug={slug}
                specifications={specifications}
                regular_price={regular_price}
                />
                ))}
                <img className=" col-span-full h-[130px] md:h-[200px] lg:h-[300px] my-3 min-w-full place-items-center" src="https://links.papareact.com/dyz" alt="" />

        {products.slice(5,10).map(({title,slug,id,product_image,description,discount_price,specifications,regular_price})=>(
            <Prodcuts
            key={id}
            id={id}
            title={title}
            product_image={product_image[0].product_image}
            description={description}
            slug={slug}
            discount_price={discount_price}
            specifications={specifications}
            regular_price={regular_price}
            />
            ))}
        </div>
    )
}

export default ProductsFeed4
