import { useRouter } from "next/router";
import ProductsFeed from "../../components/ProductsFeed";
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar";
export default function Category({otherPosts,categories}){
    
const router=useRouter();
if(router.isFallback){
    return <div></div>
}
    return(
        <div className="mt-32 relative">
            <Header data={categories}/> 
         <ProductsFeed posts={otherPosts}/>
        
        </div>
    )
}
export async function getStaticPaths(){
   return{
       paths:[
           {params:{slug:'popolares'}},
       ],fallback:true
   }
}
export async function getStaticProps({params}){
    const res= await fetch(`https://djangoapi3.herokuapp.com/api/`)
    const posts= await res.json();
    const ress=await fetch(`https://djangoapi3.herokuapp.com/api/category/`)
  const categories=await ress.json();
  const otherPosts = posts.filter(post => post.slug !== params.slug);
    return{
        props:{
            posts,
            categories,
            otherPosts: otherPosts.sort(() => Math.random() - Math.random()).slice(0, 10)
        }
    }
}