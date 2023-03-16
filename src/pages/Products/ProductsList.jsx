import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Pagination, ProductCard } from '../../components/'
import { useCloseSearchBar, useTitle } from '../../helper'
import { useProductList } from '../../services'
import { useFilterStore } from '../../store/FilterStore'
import { FilterBar } from './components/FilterBar'

export const ProductsList = () => {
	const [show, setShow] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const search = useLocation().search
	const searchTerm = new URLSearchParams(search).get('q')
	const navigate = useNavigate()
	const [isSearchOpen, closeSearchBar] = useCloseSearchBar()
	const setReset = useFilterStore(state => state.setReset)

	const showCurrentProductList = useFilterStore(state => state.getCurrentProductList())

	useTitle('All Products')

	const { isLoading, error, refetch } = useProductList(searchTerm)

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

	const handleFilter = () => {
		setReset()
		setCurrentPage(1)
		navigate('/products')
	}

	const filterToggle = () => {
		if (isSearchOpen) {
			closeSearchBar()
		}

		setShow(!show)
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
							onClick={() => filterToggle()}
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

				{showCurrentProductList.length === 0 ? (
					<button onClick={() => navigate('/products')}>Back</button>
				) : (
					<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
				)}

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
