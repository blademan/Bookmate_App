import { useState } from 'react'

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const [pageNumberLimit] = useState(5)
	const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(pageNumberLimit)
	const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

	const handlePageClick = pageNumber => {
		onPageChange(pageNumber)
	}

	const handleNextClick = () => {
		onPageChange(currentPage + 1)
		if (currentPage + 1 > maxPageNumberLimit) {
			setMaxPageNumberLimit(prev => prev + pageNumberLimit)
			setMinPageNumberLimit(prev => prev + pageNumberLimit)
		}
	}

	const handlePrevClick = () => {
		onPageChange(currentPage - 1)
		if ((currentPage - 1) % pageNumberLimit === 0) {
			setMaxPageNumberLimit(prev => prev - pageNumberLimit)
			setMinPageNumberLimit(prev => prev - pageNumberLimit)
		}
	}

	const pages = []
	for (let i = 1; i <= totalPages; i++) {
		if (i < maxPageNumberLimit && i > minPageNumberLimit) {
			pages.push(
				<li key={i}>
					<button
						className={`mx-1 px-3 py-1 rounded-md ${
							i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-900'
						}`}
						onClick={() => handlePageClick(i)}
					>
						{i}
					</button>
				</li>
			)
		}
	}

	return (
		<div className='flex justify-center my-5'>
			<ul className='pagination flex items-center'>
				<li>
					<button className='mx-2' onClick={handlePrevClick} disabled={currentPage === 1}>
						Previous
					</button>
				</li>
				{pages}
				<li>
					<button className='mx-2' onClick={handleNextClick} disabled={currentPage === totalPages}>
						Next
					</button>
				</li>
			</ul>
		</div>
	)
}
