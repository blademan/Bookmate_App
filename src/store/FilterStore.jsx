import { create } from 'zustand'

export const useFilterStore = create((set, get) => ({
	productList: [],
	onlyInStock: false,
	bestSellerOnly: false,
	sortBy: null,
	rating: null,
	setReset: () => set({ onlyInStock: false, bestSellerOnly: false, sortBy: null, rating: null }),
	setProductList: productList => set({ productList }),
	toggleOnlyInStock: () => set(({ onlyInStock }) => ({ onlyInStock: !onlyInStock })),
	toggleBestSellerOnly: () => set(({ bestSellerOnly }) => ({ bestSellerOnly: !bestSellerOnly })),
	setSortBy: sortBy => set({ sortBy }),
	setRating: rating => set({ rating }),
	getCurrentProductList: () => {
		const { productList, onlyInStock, bestSellerOnly, sortBy, rating } = get()

		let filteredList = productList
		if (onlyInStock) filteredList = filteredList.filter(product => product.in_stock)
		if (bestSellerOnly) filteredList = filteredList.filter(product => product.best_seller)
		if (sortBy === 'low') filteredList.sort((a, b) => a.price - b.price)
		if (sortBy === 'high') filteredList.sort((a, b) => b.price - a.price)
		if (rating) filteredList = filteredList.filter(product => product.rating >= rating)

		return filteredList
	},
}))
