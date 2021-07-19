import React from 'react'
import CheckoutProduct from '../components/CheckoutProduct'
import {useSelector} from 'react-redux'  
import {selectItems} from '../slice/basketSlice'
import Header from '../components/Header'
function Checkout({categories}) {
    const items=useSelector(selectItems)
    return (
        <div>

        <main>
                <Header data={categories}/>
          <img src="https://links.papareact.com/ikj" className="h-28 px-1 lg:col-span-4 xl:ml-20 sm:px-6 w-[1000px] py-2 sm:h-[160px] " alt="" />
                <div>

                </div>


                <div className="lg:col-start-1 lg:col-span-4 ">
             <div className="space-y-6 p-2  mx-">
                <h1 className="text-sm sm:text-base md:text-lg border-b-4 border-gray-300 font-bold italic text-gray-700 tracking-wider">
                  {items.length===0 ?`Your Basket is empty`:`Shopping Basket`}</h1>
                  {items.map((item,i)=>(
                      <CheckoutProduct
                      key={i}
                      slug={item.slug}
                      id={item.id}
                      image={item.image}  
                      title={item.title}
                      regular_price={item.regular_price}
                      description={item.description}
                      />
                      ))}
             </div>
                </div>
            </main>

                      </div>
    
    )
}
export async function getServerSideProps(){
    const ress=await fetch("https://djangoapi3.herokuapp.com/api/category/")
    const categories=await ress.json();
    return{
      props:{
        categories
      }
    }
  }

export default Checkout
