import { useParams } from 'react-router-dom'
import { Rating } from '../components/Elements/Rating'

import { useQuery } from '@tanstack/react-query'

import useProducts from '../helper/useProducts'
import { useTitle } from '../helper/useTitle'
export const ProductDetail = () => {
	const { id } = useParams()
	const {
		data: product,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['ProductDetail'],
		queryFn: () => useProducts(`products/${id}`),
	})

	if (isLoading) return 'Loading...'

	if (error) return 'An error has occurred: ' + error.message

	const { best_seller, in_stock, name, long_description, price, rating, size, poster, overview } = product

	useTitle(name)

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
							<button
								className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800`}
							>
								Add To Cart <i className='ml-1 bi bi-plus-lg'></i>
							</button>
							{/* <button className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`}  disabled={ product.in_stock ? "" : "disabled" }>Remove Item <i className="ml-1 bi bi-trash3"></i></button> */}
						</p>
						<p className='text-lg text-gray-900 dark:text-slate-200'>{long_description}</p>
					</div>
				</div>
			</section>
		</main>
	)
}
