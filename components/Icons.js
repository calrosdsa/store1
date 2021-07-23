import React from 'react'
import Image from 'next/image'
function Icons({Icon,title,src}) {
    return (

        <div className="mt-1 flex ">
            {src &&(
                <Image
                className="rounded-full"
                height={5}
                src={src}
                width={50}
                />
                )}
            <div className="flex m-4 ">
            {Icon && <Icon className="h-8 w-8 text-blue-500"/>}

            <h1 className="text-xs sm:text-sm lg:text-base font-bold text-gray-200 mt-1 ">{title}</h1>
            </div>
                </div>
    )
}

export default Icons
