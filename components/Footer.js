import React from 'react'

function Footer() {
    return (
        <div className="grid p-1 text-xs sm:text-sm lg:text-lg  md:py-20 justify-evenly  text-gray-400 relative bg-gray-900 pt-14 lg:px-10 2xl:px-32 lg:p-20 xl:p-32 2xl:p-44 xl:text-xl ">
            <div className="row-start-1 " >
                <h1 className="font-bold text-gray-200">Customer Services</h1>
                    <li>Your Account</li>
                    <li>Your Orders</li>
                    <li>Contact Us</li>
                    <li>Report Abuses</li>
                    <li>Policies & Rules</li>
        </div>
            <div className="hidden md:block col-span-1 justify-end">
                <div className="justify-center space-x-1">
                <h1 className="font-bold text-gray-200" >About Us</h1>
                <li>Abaout Ashop</li>
                <li>Aboun Ashop Group</li>
                <li>Sitemap</li>
                </div>
            </div>
            <div className="row-start-1  justify-center" >
                <h1 className="font-bold text-gray-200">Trade Services</h1>
                <li>Trade Assurances</li>
                <li>Bussines Identitiy</li>
                <li>Logistic Services</li>
                <li>Production Monitoring </li>
                <li>Inspection Services</li>
                <li>Letter or Credit</li>
            </div>
            <div className=" top-1  col-span-2 md:col-span-3 justify-center mt-5  xl:mt-10 ">
               <div className="flex space-x-8 my-2 justify-center ">
               <img className="w-[30px] xl:w-[50px] rounded-full" src="data:image/png;base64,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"/>
               <img className="w-[30px] xl:w-[50px] rounded-xl bg-white " src="https://image.flaticon.com/icons/png/512/60/60580.png"/>
               <img className="w-[30px] xl:w-[50px] rounded-full" src="https://icones.pro/wp-content/uploads/2021/02/icone-du-logo-whatsapp-noir.png" alt="" />
            </div>
            </div>
            </div>
    )
}

export default Footer
