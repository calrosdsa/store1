import {useRouter} from "next/router"

function Product({post}){
const router=useRouter();
if(router.isFallback){
    return <div></div>
}
    return(

<div className="m-3 mt-10  grid grid-cols-2">
<h1 className="text-[13px] col-span-2 font-bold">{post.title}</h1>
<div className="col-start-2  ">

<h1 className=" mx-8 text-xs font-bold mt-5">
    {post.regular_price}$
</h1>
<h1>{post.specifications}</h1>
<button className="ml-5 bg-gray-200 rounded-md p-1 mt-2">Add to Cart</button>
</div>
<div className="-mt-12 col-start-1">

<img className="w-[130px] h-[130px] rounded-xl" src={post.product_image[0].image} alt={post.title} />
</div>
<p className="text-xs mt-2 col-span-2">{post.description}</p>
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
    return{
        props:{
            post
        }
    }
}
export default Product;