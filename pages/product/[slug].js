import {useRouter} from "next/router"
import Image from 'next/image'
import Head from "../../components/Head";
function Product({post,otherPosts}){
const router=useRouter();
if(router.isFallback){
    return <div></div>
}
    return(

<div>
<Head />
<div className="m-3 mt-6  grid grid-cols-2  md:grid-cols-3 mb-20 sm:mx-10 lg:grid-cols-4 xl:grid-cols-5 gap-1" >

<h1 className="text-[16px] mb-3 col-span-2 font-bold underline text-gray-500 italic md:col-start-2">{post.title}</h1>
    
<div className="col-start-2 ml-5 md:col-start-3  md:mr-16 ">

<h1 className=" mx-8 text-xs sm:text-base font-bold mt-5">
    Price:
    <br />
    {post.regular_price}$
</h1>
<h1>{post.specifications}</h1>
<button className="bg-gray-900 text-gray-500 md:font-bold rounded-lg">Add to Cart</button>
</div>
<div className="-mt-16 col-start-1">

<img className="w-[130px] md:w-[160px] lg:w-[200px] xl:w-[260px]  rounded-xl lg   md:ml-16" src={post.product_image[0].image} alt={post.title} />
    </div>
<p className="text-xs mt-2 col-span-2  md:mx-20 md:text-sm mb-6  md:col-start-1 md:col-span-3 lg:col-span-2">{post.description}</p>
    </div>
<div className="grid grid-cols-3 mt-4 md:grid-cols-4 xl:grid-cols-5">
{otherPosts.map((otherPost)=>(
    <div className="" onClick={()=>router.push(`../product/${encodeURIComponent(otherPost.slug)}`)}>
           <h1 className="text-sm line-clamp-1">{otherPost.title}</h1>
           <div className="w-[80px] sm:w-[120px] md:w-[150px] 2xl:w-[200px] ">

       <Image
         height={200}
         width={200}
         src={otherPost.product_image[0].image}
         />
         </div>
       </div>
       
       )
       )}
       </div>
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
    const res = await fetch("https://djangoapi3.herokuapp.com/api/")
    const posts=await res.json();
    const post=posts.filter(post=>post.slug.includes(params.slug));
    const otherPosts=posts.filter(post=>post.slug !== params.slug)
    
    return{
        props:{
            post:post[0],
            otherPosts:otherPosts.sort(()=>Math.random()-Math.random()).slice(0,3),
        
        }
    }
}
export default Product;