import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ProductCard } from '../../components/'
import { Pagination } from '../../components/Elements/Pagination'
import useProducts from '../../helper/useProducts'
import { useTitle } from '../../helper/useTitle'
import { useFilterStore } from '../../store/FilterStore'
import { FilterBar } from './components/FilterBar'

export const ProductsList = () => {
	const [show, setShow] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const search = useLocation().search
	const searchTerm = new URLSearchParams(search).get('q')

	const {
		setReset,
		setProductList, // add setProductList to access the store's method
	} = useFilterStore()

	const showCurrentProductList = useFilterStore(state => state.getCurrentProductList())

	useTitle('All Products')
	const { isLoading, error, refetch } = useQuery({
		queryKey: ['ProductsList'], // add filter as a dependency
		queryFn: () => useProducts(`${searchTerm ? 'products?name_like=' + searchTerm : 'products'}`), // pass filter to useProducts helper function
		onSuccess: setProductList,
	})

	useEffect(() => {
		refetch()
	}, [searchTerm])

	const itemsPerPage = 4
	const totalPages = Math.ceil(showCurrentProductList.length / itemsPerPage)

	const getCurrentProducts = () => {
		const startIndex = (currentPage - 1) * itemsPerPage
		const endIndex = startIndex + itemsPerPage
		let currentList = showCurrentProductList.slice(startIndex, endIndex)
		return currentList
	}

	const handleFilter = newFilter => {
		setReset(prevFilter => ({ ...prevFilter, ...newFilter }))
		setCurrentPage(1)
		refetch()
	}

	if (isLoading) return 'Loading...'

	if (error) return 'An error has occurred: ' + error.message
	return (
		<main>
			<section className='my-5'>
				<div className='my-5 flex justify-between'>
					<span className='text-2xl font-semibold dark:text-slate-100 mb-5'>
						All eBooks ({showCurrentProductList.length})
					</span>
					<span>
						<button
							onClick={() => setShow(!show)}
							className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700'
							type='button'
						>
							<svg
								className='w-6 h-6'
								aria-hidden='true'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'></path>
							</svg>
						</button>
					</span>
				</div>
				<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

				<div className='flex flex-wrap justify-center lg:flex-row'>
					{getCurrentProducts().map(product => (
						<ProductCard key={product.id} {...product} />
					))}
				</div>
			</section>
			{show && <FilterBar setShow={setShow} handleFilter={handleFilter} setCurrentPage={setCurrentPage} />}
		</main>
	)
}
