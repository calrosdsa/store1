import React from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'

function Prodcuts({slug,id, title,image,description,specifications}) {
  const router=useRouter();
 
  return (
      <div>

        <div className="bg-gray-200 m-1 p-1 rounded-2xl" key={id} onClick={()=>router.push(`../product/${encodeURIComponent(slug)}`)} >
            <h1 className="text-xs mx-1 line-clamp-1">{title}</h1>
            <div className="m-1 w-[110px] sm:w-[135px] lg:w-[170px] 2xl:w-[270px]" >
      
          <Image 
          src={image}
          height={270}
          width={270}
          objectFit='contain'
          />
                
            <p className="text-xs line-clamp-2">{description}</p>
              </div>
        </div>
          </div>
    )
}

export default Prodcuts
