import React from 'react'

export const Rating = ({ rating }) => {
	let ratingArray = Array(5).fill(false)
	for (let i = 0; i < rating; i++) {
		ratingArray[i] = true
	}

	return (
		<>
			{ratingArray.map((star, i) =>
				star ? (
					<i key={i} className='text-lg bi bi-star-fill text-yellow-500 mr-1'></i>
				) : (
					<i key={i} className='text-lg bi bi-star text-yellow-500 mr-1'></i>
				)
			)}
		</>
	)
}
