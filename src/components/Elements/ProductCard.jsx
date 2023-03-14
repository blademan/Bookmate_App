import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/CartStore'
import { Rating } from './Rating'

export const ProductCard = ({ id, name, overview, price, poster, rating, best_seller }) => {
	const [inCart, setInCart] = useState(false)
	const cartList = useCartStore(state => state.cartList)
	const addToCart = useCartStore(state => state.addToCart)
	const removeProduct = useCartStore(state => state.removeProduct)

	useEffect(() => {
		setInCart(cartList.some(item => item.id === id))
	}, [cartList, id])

	const handleAddToCart = () => {
		addToCart({ id, name, poster, price })
		setInCart(true)
	}

	const handleRemoveProduct = () => {
		removeProduct(id)
		setInCart(false)
	}
	return (
		<div className='m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
			<Link to={`/products/${id}`} className='relative'>
				{best_seller && (
					<span className='absolute top-4 left-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded'>Best Seller</span>
				)}
				<img className='rounded-t-lg w-full h-64' src={poster} alt='' />
			</Link>
			<div className='p-5'>
				<Link to={`/products/${id}`}>
					<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{name}</h5>
				</Link>
				<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{overview}</p>

				<div className='flex items-center my-2'>
					<Rating rating={rating} />
				</div>

				<p className='flex justify-between items-center'>
					<span className='text-2xl dark:text-gray-200'>
						<span>$</span>
						<span>{price}</span>
					</span>
					{inCart ? (
						<button
							onClick={handleRemoveProduct}
							className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800'
						>
							Remove Item <i className='ml-1 bi bi-trash3'></i>
						</button>
					) : (
						<button
							onClick={handleAddToCart}
							className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800'
						>
							Add To Cart <i className='ml-1 bi bi-plus-lg'></i>
						</button>
					)}
				</p>
			</div>
		</div>
	)
}
