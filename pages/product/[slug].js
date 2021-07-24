import {useRouter} from "next/router"
import Footer from "../../components/Footer";
import Header from "../../components/Header"
import ProductFeed2 from "../../components/ProductFeed2";
import ProductsFeed from "../../components/ProductsFeed";
export default function Product({post,categories,posts}){

const router=useRouter();
if(router.isFallback){
    return <div>loading</div>
}
    return(

<div className="relative"> 
<img className="col-span-full h-[160px] md:h-[200px] lg:h-[300px] mt-24 my-2 min-w-full place-items-center" src="https://links.papareact.com/dyz" alt="" />

    <Header data={categories} />
    <ProductFeed2  post={post}/>
    
    <h1 className="mt-6 font-bold">Productos Relacionados</h1>
    <ProductsFeed posts={posts}/>
    <h1 className="font-bold">Productos en Oferta</h1>
    <ProductsFeed posts={posts}/>
    <h1 className="font-bold">Productos mas Vendidos</h1>
    <ProductsFeed posts={posts}/>
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
    const post=await res.json();
    const ress=await fetch("https://djangoapi3.herokuapp.com/api/category/")
    const categories=await ress.json();
    const resss = await fetch("https://djangoapi3.herokuapp.com/api/");
    const posts= await resss.json();
   return{
        props:{
            post,
            categories,
            posts
        }
    }
}