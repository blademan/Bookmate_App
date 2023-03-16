import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCartStore } from '../store/CartStore'

const apiUrl = import.meta.env.VITE_API_BASE_URL
export function getUser() {
	const { token, cbid } = sessionStorage
	// Define a function to fetch user data from the API
	async function fetchUser() {
		try {
			const response = await axios(`${apiUrl}/600/users/${cbid}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			return response.data
		} catch (error) {
			console.error('Error fetching user data:', error)
			throw error
		}
	}

	// Use the useQuery hook to fetch user data from the API
	return useQuery(['user'], fetchUser)
}

export function createOrder() {
	const { token } = sessionStorage
	const clearCart = useCartStore(state => state.clearAll)
	const navigate = useNavigate()

	const fetchOrder = async order => {
		try {
			const response = await axios.post(`${apiUrl}/660/orders/`, order, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})

			return response.data
		} catch (error) {
			console.error('Error sending order data:', error)
			throw error
		}
	}

	return useMutation(fetchOrder, {
		onSuccess: response => {
			clearCart()
			toast.success('Payment successful')
			navigate('/order-summary', {
				state: {
					status: true,
					order: response,
				},
			})
		},
		onError: error => {
			console.log('Error processing order:', error)
			toast.error('Something went wrong')
			navigate('/order-summary', {
				state: {
					status: false,
					order: null,
				},
			})
		},
	})
}

export function useGetUserOrders() {
	const { token, cbid } = sessionStorage
	async function fetchUserCart() {
		const response = await axios(`${apiUrl}/660/orders?user.id=${cbid}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		return response.data
	}
	return useQuery(['userCart'], fetchUserCart)
}
