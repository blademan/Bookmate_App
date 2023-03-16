import produce from 'immer'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useFilterStore = create((set, get) => ({
	productList: [],
	onlyInStock: false,
	bestSellerOnly: false,
	sortBy: null,
	rating: null,
	setReset: () =>
		set(
			produce(draft => {
				draft.onlyInStock = false
				draft.bestSellerOnly = false
				draft.sortBy = null
				draft.rating = null
			})
		),
	setProductList: productList =>
		set(
			produce(draft => {
				draft.productList = productList
			})
		),
	toggleOnlyInStock: () =>
		set(
			produce(draft => {
				draft.onlyInStock = !draft.onlyInStock
			})
		),
	toggleBestSellerOnly: () =>
		set(
			produce(state => {
				state.bestSellerOnly = !state.bestSellerOnly
			})
		),
	setSortBy: sortBy =>
		set(
			produce(state => {
				state.sortBy = sortBy
			})
		),
	setRating: rating =>
		set(
			produce(state => {
				state.rating = rating
			})
		),
	getCurrentProductList: () => {
		const { productList, onlyInStock, bestSellerOnly, sortBy, rating } = get()

		let filteredList = productList

		if (onlyInStock) filteredList = filteredList.filter(product => product.in_stock)

		if (bestSellerOnly) filteredList = filteredList.filter(product => product.best_seller)

		if (sortBy === 'low') {
			filteredList = produce(filteredList, draft => {
				draft.sort((a, b) => a.price - b.price)
			})
		}

		if (sortBy === 'high') {
			filteredList = produce(filteredList, draft => {
				draft.sort((a, b) => b.price - a.price)
			})
		}
		if (rating) {
			filteredList = filteredList.filter(product => product.rating >= rating)
		}

		return filteredList
	},
}))
