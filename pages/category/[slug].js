import { useRouter } from "next/router";
import ProductsFeed from "../../components/ProductsFeed";
import Head from "../../components/Head"
export default function Category({posts,categories}){
const router=useRouter();
if(router.isFallback){
    return <div></div>
}
    return(
        <div>
            <Head/>
            
        <h1>{categories.name}</h1>       
         <ProductsFeed posts={posts}/>
         <h1 className="text-xl font-bold  text-gray-800 border-b-4 border-gray-200">En Oferta</h1>
         <ProductsFeed posts={posts}/>
         <h1 className="text-xl font-bold  text-gray-800 border-b-4 border-gray-200">Lo mas vendido</h1>
         <ProductsFeed posts={posts}/>

        </div>
    )
}
export async function getStaticPaths(){
   return{
       paths:[
           {params:{slug:'botas'}},
       ],fallback:true
   }
}
export async function getStaticProps({params}){
    const res= await fetch(`https://djangoapi3.herokuapp.com/api/category/${params.slug}`)
    const posts= await res.json();
    const ress=await fetch(`https://djangoapi3.herokuapp.com/api/category/`)
  const categories=await ress.json();
    return{
        props:{
            posts,
            categories
        }
    }
}