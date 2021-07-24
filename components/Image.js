import React from 'react'

function Image({title,slug,image}) {
    return (
<div className=" pt-2 bg-white flex mx-auto items-center" onClick={()=>router.push(`../product/${encodeURIComponent(slug)}`)}>
            <img src={image} alt="" />
            <h1>{title}</h1>
            </div>
    )
}

export default Image
