import { useRouter } from "next/router";
import ProductsFeed from "../../components/ProductsFeed";
import Header from "../../components/Header"
import Footer from "../../components/Footer";
export default function Category({posts,categories}){
    
const router=useRouter();
if(router.isFallback){
    return <div></div>
}
    return(
        <div className="mt-32 relative">
            <Header data={categories}/> 
         <ProductsFeed posts={posts}/>
        <Footer/>
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