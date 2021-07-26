import moment from 'moment'
import React from 'react'

function Order({id,amount,amountShipping,items,timestamp,images}) {
    return (
        <div className=" my-3 p-2  md:mx-4 lg:mx-8 xl:mx-16 2xl:mx-24" key={id}>
            <div className=" grid   grid-cols-2 my-5 bg-gray-900  justify-between min-w-full text-gray-200">
                <div className="border-b-2 my-2 border-gray-400 col-start-1 grid grid-rows-2 justify-center row-start-1 border-r-2 border-gray-400">

            <p className="font-extrabold text-gray-300">Order Placed</p>
            <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
                </div>
            
                <div className=" border-b-2 my-2 border-gray-400 justify-center row-start-1 grid grid-rows-2 col-start-2">

            <h1 className="row-start-1 flex"><p className="font-extrabold text-gray-300">Total:</p>{amount}$</h1>
            <h2 className="row-start-2">{items.length} Items</h2>
                </div>
                <div className="row-start-2 grid-rows-1 lg:mx-auto  justify-center  col-span-2 ">
            <div className="truncate flex row-start-1">
                <p className="font-extrabold text-gray-300">Order:</p>
                  {id}</div>
                </div>
            </div>
            <div className="grid grid-cols-2  xl:flex">
            {images.map((image)=>(
                <img className="object-contain w-[140px] lg:w-[270px] h-[150px] lg:h-[250px]" src={image} alt="" />
            ))}
            </div>

        </div>

    )
}

export default Order
