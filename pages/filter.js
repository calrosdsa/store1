import React,{useState} from 'react'
import { useRouter } from 'next/router';
const Filter = ({categories}) => {
    const [title,setTitle]=useState();
    const [search,setSearch]=useState();
    const [sort,setSort]=useState();
    const [category,setCategory]=useState();
    const router=useRouter();
   
    return (
        <div className="mt-10">
            <div>
                <select  
                value={category} name="" id="">
                    {categories.map((item)=>(
                            <option onSelectCapture={()=>router.push(`../category/${encodeURIComponent(item.slug)}`)}> 
                                {item.name}
                               </option>
                    ))}
                </select>
            </div>
            <form autoComplete="off" action="">
                <input type="text" list="title_product"  />
                <details id='title_product'>
                    <option value="name">Title Name</option>
                </details>
                <button type="submit">Search</button>
            </form>
            <div>
                <select value={sort} name="" id="">
                  <option value="-createdAt">Newest</option> 
                  <option value="oldest">Oldest</option> 
                  <option value="-sold">Best Sales</option> 
                  <option value="-price">Price:Hight to Low</option> 
                  <option value="price">Price:Low-Hight</option> 


                </select>
            </div>
        </div>
    )
}

export default Filter

export async function getStaticProps(){
    const res = await fetch("https://djangoapi3.herokuapp.com/api/");
    const posts= await res.json();
    const ress=await fetch("https://djangoapi3.herokuapp.com/api/category/")
    const categories=await ress.json();
    
   ;
    return{
      props:{
        posts,
        categories,
      }
    }
  }
  