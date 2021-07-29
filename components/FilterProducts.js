import { useSelector } from "react-redux"
import { selectFilteredProducts } from "../slice/basketSlice"
import Prodcuts from "./Prodcuts"

function FiltredProducts() {
    const products = useSelector(selectFilteredProducts)

    return (
        <>
            {products && (
                <p className="mb-4 font-bold text-xl text-gray-500">{products.length} Products Fond</p>
            )}
            <div className="grid grid-flow-row-dense md:grid-cols-1 lg:grid-cols-2  grid-cols-2 xl:grid-cols-3 ">
                
                {!!products?.length && products.map(({title,colors,size,slug,id,product_image,description,regular_price}) => (
                    <Prodcuts products={products} setShowCart={() => {}} key={id} title={title}
                    regular_price={regular_price}
                    slug={slug}
                    id={id}
                    colors={colors}
                    size={size}
                    product_image={product_image[0].product_image}
                    description={description}
                    />
                ))}
            </div>
            {!products?.length && (
                <p className="text-sm text-gray-400 text-center py-4">No Product Found :(</p>
            )}
        </>
    )
}

export default FiltredProducts