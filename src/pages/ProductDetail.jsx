import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Rating } from '../components/Elements/Rating'
import { useTitle } from '../helper'
import { useProductDetails } from '../services'
import { useCartStore } from '../store/CartStore'

export const ProductDetail = () => {
	const [inCart, setInCart] = useState(false)
	const cartList = useCartStore(state => state.cartList)
	const removeProduct = useCartStore(state => state.removeProduct)
	const addToCart = useCartStore(state => state.addToCart)

	const { id } = useParams()

	const { data: product, isLoading, error } = useProductDetails(id)

	useTitle(product ? product.name : 'Loading...')

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

	if (isLoading) return 'Loading...'

	if (error) return 'An error has occurred: ' + error.message

	const { best_seller, in_stock, name, long_description, price, rating, size, poster, overview } = product

	return (
		<main>
			<section>
				<h1 className='mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200'>{name}</h1>
				<p className='mb-5 text-lg text-center text-gray-900 dark:text-slate-200'>{overview}</p>
				<div className='flex flex-wrap justify-around'>
					<div className='max-w-xl my-3'>
						<img className='rounded' src={poster} alt='' />
					</div>
					<div className='max-w-xl my-3'>
						<p className='text-3xl font-bold text-gray-900 dark:text-slate-200'>
							<span className='mr-1'>$</span>
							<span className=''>{price}</span>
						</p>
						<p className='my-3'>
							<span>
								<Rating rating={rating} />
							</span>
						</p>
						<p className='my-4 select-none'>
							{best_seller && (
								<span className='font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2'>
									BEST SELLER
								</span>
							)}

							{in_stock ? (
								<span className='font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2'>
									INSTOCK
								</span>
							) : (
								<span className='font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2'>
									OUT OF STOCK
								</span>
							)}

							<span className='font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2'>
								{size} MB
							</span>
						</p>
						<p className='my-3'>
							{inCart ? (
								<button
									onClick={handleRemoveProduct}
									className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`}
									disabled={in_stock ? '' : 'disabled'}
								>
									Remove Item <i className='ml-1 bi bi-trash3'></i>
								</button>
							) : (
								<button
									disabled={in_stock ? '' : 'disabled'}
									onClick={handleAddToCart}
									className={`${
										in_stock ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-700'
									} inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white  rounded-lg `}
								>
									{in_stock ? 'Add To Cart' : 'Out of Stock'}
									<i className='ml-1 bi bi-plus-lg'></i>
								</button>
							)}
						</p>
						<p className='text-lg text-gray-900 dark:text-slate-200'>{long_description}</p>
					</div>
				</div>
			</section>
		</main>
	)
}
