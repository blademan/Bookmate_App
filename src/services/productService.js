import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useFilterStore } from '../store/FilterStore'
const ORDER_ENDPOINT = 'http://localhost:8000/660/orders?user.id='

export const useProductsDetails = id => {
	async function fetchData(url) {
		const { data } = await axios(`http://localhost:8000/products/${url}`)
		return data
	}
	return useQuery(['ProductDetail'], () => fetchData(`${id}`))
}

export function useGetUserCart() {
	const { token, cbid } = sessionStorage
	async function fetchUserCart() {
		const response = await axios(`${ORDER_ENDPOINT}${cbid}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		return response.data
	}
	return useQuery(['userCart'], fetchUserCart)
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
