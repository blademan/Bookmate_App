import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useFilterStore } from '../store/FilterStore'

export const useProductsDetails = id => {
	async function fetchData(url) {
		const { data } = await axios(`http://localhost:8000/products/${url}`)
		return data
	}
	return useQuery(['ProductDetail'], () => fetchData(`${id}`))
}

export function useProductList(searchTerm) {
	const setProductList = useFilterStore(state => state.setProductList)
	const fetchList = async url => {
		const { data } = await axios(`http://localhost:8000/${url}`)
		return data
	}

	return useQuery({
		queryKey: ['ProductsList', searchTerm],
		queryFn: () => fetchList(`${searchTerm ? 'products?name_like=' + searchTerm : 'products'}`),
		onSuccess: setProductList,
		enabled: Boolean(searchTerm),
	})
}

export function useFeatureProduct() {
	const fetchList = async url => {
		const { data } = await axios(`http://localhost:8000/${url}`)
		return data
	}

	return useQuery({
		queryKey: ['product'],
		queryFn: () => fetchList('featured_products'),
	})
}
