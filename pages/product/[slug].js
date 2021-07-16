import {useRouter} from "next/router"

function Product({post}){
const router=useRouter();
if(router.isFallback){
    return <div></div>
}
    return(
          <div>
       <h1>{post.title}</h1>
          </div>
    )
}
export async function getStaticPaths(){
return{
    paths:[
        {params:{slug:"clothes"}},
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