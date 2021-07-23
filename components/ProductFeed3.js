import React from 'react'
import Prodcuts from './Prodcuts'
function ProductsFeed3({posts}) {
    
    return (
        <div className="sm:grid-flow-row-dense mx-auto  mb-16 m-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {posts.slice(0,8).map(({title,slug,id,image,description,specifications,regular_price})=>(
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
        <img className="col-span-full h-[130px] md:h-[200px] lg:h-[300px] my-2 min-w-full place-items-center" src="https://links.papareact.com/dyz" alt="" />
        <div className="md:col-span-2 ">

        {posts.slice(8,9).map(({title,slug,id,image,description,specifications,regular_price})=>(
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
        {posts.slice(9,posts.length).map(({title,slug,id,image,description,specifications,regular_price})=>(
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

)
}

export default ProductsFeed3
