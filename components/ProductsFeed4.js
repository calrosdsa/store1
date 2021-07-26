import React from 'react'
import Prodcuts from './Prodcuts'
function ProductsFeed4({posts}) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-20 mt-24  grid-flow-row-dense">

                <img className=" col-span-full h-[130px] md:h-[200px] lg:h-[300px] my-7 min-w-full place-items-center" 
                src="https://www.isidroperez.com/wp-content/uploads/2017/12/descuentos1.jpg" alt="" />
            {posts.sort(() => Math.random() - Math.random()).slice(0,4).map(({title,discount_price,slug,id,image,description,specifications,regular_price})=>(
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
                <img className=" col-span-full h-[130px] md:h-[200px] lg:h-[300px] my-3 min-w-full place-items-center" src="https://links.papareact.com/dyz" alt="" />

        {posts.slice(5,10).map(({title,slug,id,image,description,discount_price,specifications,regular_price})=>(
            <Prodcuts
            key={id}
            id={id}
            title={title}
            image={image}
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
