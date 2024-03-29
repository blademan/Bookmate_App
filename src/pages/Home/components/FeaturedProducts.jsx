import { ProductCard } from '../../../components'
import { useFeaturedProduct } from '../../../services'

export const FeaturedProducts = () => {
	const { data: products, isLoading, error } = useFeaturedProduct()

	if (isLoading) return 'Loading...'

	if (error) return 'An error has occurred: ' + error.message

	return (
		<section className='my-20'>
			<h1 className='text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8'>
				Featured eBooks
			</h1>
			<div className='flex flex-wrap justify-center lg:flex-row'>
				{products?.map(product => (
					<ProductCard key={product.id} {...product} />
				))}
			</div>
		</section>
	)
}
