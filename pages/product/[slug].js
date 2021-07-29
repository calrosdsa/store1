import {useRouter} from "next/router"
import Footer from "../../components/Footer";
import {useState} from 'react'
import Header from "../../components/Header"
import Prodcuts from "../../components/Prodcuts";
import ProductFeed2 from "../../components/ProductFeed2";
export default function Product({product,categories,products}){

const router=useRouter();
const [showCart, setShowCart] = useState(false)

if(router.isFallback){
    return <div>loading</div>
}
    return(

<div className="relative"> 

    <Header data={categories} setShowCart={setShowCart} showCart={showCart} products={products}/>
<img className="col-span-full h-[160px] md:h-[200px] lg:h-[300px] mt-24 my-2 min-w-full place-items-center" src="https://links.papareact.com/dyz" alt="" />
    <ProductFeed2  product={product}/>
    


    <div className="max-w-screen-2xl mx-auto">
                    <h1 className="text-yellow-500 text-3xl mb-7">Related Projects</h1>
                    <div className="grid grid-flow-row-dense grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products && products.slice(0, 4).map(({ id, name, regular_price, description, category,slug, product_image, shipping, colors }) => (
                            <Prodcuts products={products} setShowCart={setShowCart} key={id} 
                            slug={slug} id={id} name={name} title={name} shipping={shipping} regular_price={regular_price} description={description} category={category} product_image={product_image[0].product_image} colors={colors} />
                        ))}
                    </div>
                </div>
    <Footer/>

</div>
    )
}
export async function getStaticPaths(){
return{
    paths:[
        {params:{slug:"botas-1"}},
    ],fallback:true
};
}
export async function getStaticProps({params}){
const res = await fetch(`https://djangoapi3.herokuapp.com/api/${params.slug}`)
    const product=await res.json();
    const ress=await fetch("https://djangoapi3.herokuapp.com/api/category/")
    const categories=await ress.json();
    const resss = await fetch("https://djangoapi3.herokuapp.com/api/");
    const products= await resss.json();
   return{
        props:{
            product,
            categories,
            products
        }
    }
}