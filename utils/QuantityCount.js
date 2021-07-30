import styles from '../styles/QuantityCount.module.css'
import { updateQuantity } from "../slice/basketSlice";
import { useDispatch } from 'react-redux';


function QuantityCount({ setQuantity, quantity = 1, dispatch = false, id = null }) {
    const newDispatch = useDispatch()

    const increaseCount = () => {
        setQuantity(quantity + 1)
        updateQuantityHere(quantity + 1)
    }

    const decreaseCount = () => {
        if(quantity > 0) {
            setQuantity(quantity - 1)
            updateQuantityHere(quantity - 1)
        }
    }

    const updateQuantityHere = count => {
        if(dispatch){
            const product = {id, quantity: count}
            newDispatch(updateQuantity(product))
        }
    }


    return (
        <div className={styles.quantityCount}>
            <button  onClick={decreaseCount} className="bg-gray-200  rounded-lg p-3 h-8 w-8 md:h-9 xl:h-13 md:w-9 xl:w-13 xl:p-3  items-center justify-center flex font-extrabold ">-</button>
            <div className={styles.counter}>{quantity}</div>
            <button onClick={increaseCount} className="bg-gray-200  rounded-lg p-3 h-8 w-8 md:h-9 xl:h-13 md:w-9 xl:w-13 xl:p-3  items-center justify-center flex font-extrabold">+</button>
        </div>
    )
}

export default QuantityCount
