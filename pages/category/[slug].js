import { useRouter } from "next/router";
import ProductsFeed from "../../components/ProductsFeed";

export default function Category({posts}){
const router=useRouter();
if(router.isFallback){
    return <div></div>
}
    return(
        <div>
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
    return{
        props:{
            posts
        }
    }
}