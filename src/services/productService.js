import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useFilterStore } from '../store/FilterStore'

const apiUrl = import.meta.env.VITE_API_BASE_URL
// fetch data for a single product
async function fetchProductData(id) {
	const { data } = await axios(`${apiUrl}/444/products/${id}`)
	return data
}

// custom hook to fetch product details
export function useProductDetails(id) {
	return useQuery(['productDetails', id], () => fetchProductData(id))
}

// fetch data for a list of products
async function fetchProductList(searchTerm) {
	const { data } = await axios(`${apiUrl}/444/products${searchTerm ? '?name_like=' + searchTerm : ''}`)
	return data
}

// custom hook to fetch product list
export function useProductList(searchTerm) {
	const setProductList = useFilterStore(state => state.setProductList)

	return useQuery({
		queryKey: ['productList', searchTerm],
		queryFn: () => fetchProductList(searchTerm),
		onSuccess: data => setProductList(data),
		onError: () => toast.error('Error fetching product list'),
		enabled: Boolean(searchTerm),
	})
}

// fetch data for a list of featured products
async function fetchFeaturedProducts() {
	const { data } = await axios(`${apiUrl}/444/featured_products`)
	return data
}

// custom hook to fetch featured products
export function useFeaturedProduct() {
	return useQuery({
		queryKey: ['featuredProducts'],
		queryFn: () => fetchFeaturedProducts(),
	})
}
