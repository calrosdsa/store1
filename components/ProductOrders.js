import React from 'react'

function ProductOrders() {
    return (
        <div className="grid xl:grid-cols-5 mt-40">
            
        {session?(

            <h2 className="xl:text-2xl font-bold italic  border-b-4 border-gray-600  col-start-3 mx-auto">Your orders</h2>
        ):(<h2 className="xl:text-2xl font-bold italic  border-b-4 border-gray-600  col-start-3 mx-auto">Please Sign In to see your orders</h2>)}
        <div className="col-span-5">
    {orders?.map(({timestamp,amount,images,amountShipping,items,id})=>(
        <Order
        timestamp={timestamp}
        amount={amount}
        key={id}
        id={id}
        images={images}
        amountShipping={amountShipping}
        items={items}
        />
    ))}

        </div>
    </div>
    )
}

export default ProductOrders
