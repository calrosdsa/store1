import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateFilters, clearFilters, selectFilteredProducts, selectProducts } from "../slice/basketSlice"
import { getUniqueValues } from "../utils/helpers"
import styles from "../styles/Product.module.css"
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

function Filter() {
    const dispatch = useDispatch()
    const all_products = useSelector(selectProducts)
    const [activeCategory, setActiveCategory] = useState('all')
    const [activeSize, setActiveSize] = useState('all')
    const [activeColor, setActiveColor] = useState('all')
    const [lastChange, setLastChange] = useState(null)
    const [showClear, setShowClear] = useState(false)
    const [regular_price, setPrice] = useState(0)
    const [priceMax, setPriceMax] = useState(1)

    const categories = all_products ? getUniqueValues(all_products, 'category_name') : null
    const size = all_products ? getUniqueValues(all_products, 'size') : null
    const colors = all_products ? getUniqueValues(all_products, 'colors') : null

    const reFilter = (products, dont) => {
        const items = ['category_name', 'size', 'colors']
        let filtered = products
        products.filter(item => item !== dont).map(item => {
            if(item !== 'colors' && item !== 'size' && activeCategory !== 'all'){
                filtered = items.filter(product => product[item] === activeCategory)
            }else if(item !== 'category_name' && item !== 'size' && activeColor !== 'all'){
                // filtered = items.filter(product => product[item].includes(activeColor))
            }else if(item !== 'colors' && item !== 'category_name' && activeSize !== 'all'){
                //filtered = items.filter(product => product[item] === activeSize)
            }
        })
        return filtered
    }

    const filterCategory = (value, item) => {
        setShowClear(true)
        if(item === 'category_name'){
            setActiveCategory(value)
            setLastChange('category_name')
        }
        if(item === 'size'){
            setActiveSize(value)
            const filtered=(value !== 'all') ? all_products.filter(product=> product[item].includes(value)) : all_products
            dispatch(updateFilters(filtered))
        }
        if(item === 'colors'){
            setActiveColor(value)
            // setLastChange('colors')
            const filtered = (value !== 'all') ? all_products.filter(product => product[item].includes(value)) : all_products
            dispatch(updateFilters(filtered))
        }
    }

    useEffect(() => {
        const items = ['category_name']
        const hello = {
            category_name: activeCategory,
        }
        // const items = ['category_name', 'size', 'colors']
        if(all_products){

            let filtered = all_products
    
            if(hello[lastChange] !== 'all') {
                filtered = all_products.filter(product => product[lastChange] === hello[lastChange])
            }else{
                items.forEach(x => {
                    filtered = (x == lastChange && hello[x] !== 'all') ? filtered.filter(product => product[x] === hello[x]) : filtered
                })
            }
    
            items.forEach(x => {
                if(hello[x] !== 'all') {
                    filtered = (x !== lastChange) ? filtered.filter(product => product[x] === hello[x]) : filtered
                }
            })
            dispatch(updateFilters(filtered))
        }

    }, [activeCategory, lastChange])

    useEffect(() => {
        if (!all_products) return false
        const max = all_products?.map(product => product.regular_price).reduce((a, b) =>  Math.max(a, b))
        setPriceMax(max)
        setPrice(max)
    }, [all_products])
    
    const clearAllFilters = () => {
        dispatch(clearFilters())
        setShowClear(false)
        setActiveCategory('all')
        setActiveSize('all')
        setActiveColor('all')
        setPrice(priceMax)
    }

    const priceFilter = value => {
        setPrice(value)
        const filtered = all_products.filter(product => product.regular_price <= value)
        dispatch(updateFilters(filtered))
        setShowClear(true)
    }

    return (
        <div className="flex flex-col -mt-5 lg:mt-10">
            <div className="mb-4">
                <h2 className="font-bold text-base text-gray-600">
                    Categories
                </h2>
                <div className="space-x-10 overflow-x-auto flex lg:flex-col my-2 xl:my-5">
                    {categories && categories.map(value => (
                        <p key={value} className={`${value == activeCategory && 'bg-gray-900 p-1 rounded-lg text-white max-w-[100px]'} text-gray-500 cursor-pointer mb-2`}
                         onClick={() => filterCategory(value, 'category_name')}>{value}</p>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <h2 className="font-bold text-base text-gray-600">
                    Sizes
                </h2>
                <div className="flex space-x-10 my-2  xl:my-5 overflow-x-auto xl:overflow-hidden">
                    {size && size.map(value => (
                        <p key={value} className={`${value == activeSize && 'bg-gray-900 p-1 rounded-lg text-white '} text-gray-500  cursor-pointer mb-2`} onClick={() => filterCategory(value, 'size')}>{value}</p>
                    ))}
                </div>
            </div>
            <div className="mb-4 pr-10">
                <h2 className="font-bold text-base text-gray-600">
                    Price
                </h2>
                <div className="flex flex-col max-w-[300px] my-5">
                <InputRange
                    maxValue={priceMax}
                    minValue={0}
                    value={regular_price}
                    formatLabel={value => `$ ${value}`}
                    onChange={priceFilter} 
                />
                </div>
            </div>
            <div className="mb-4">
                <h2 className="font-bold text-base text-gray-600">
                    Colors
                </h2>
                <div className="flex max-w-[300px] justify-between my-3 lg:my-5">
                    {colors && colors.map(value => (
                        <div onClick={() => filterCategory(value, 'colors')} key={value} className={`w-7 h-7 cursor-pointer border-4  shadow-sm ${value == activeColor ? 'border-white' : 'border-gray-200'} rounded-full mx-1`} style={{ background: value }}/>
                    ))}
                </div>
            </div>

            {showClear && <button onClick={clearAllFilters} className="p-2 rounded-lg w-full font-bold bg-gradient-to-b from-gray-800 to-gray-900 text-gray-400">Clear Filter</button>}
            
        </div>
    )
}

export default Filter
