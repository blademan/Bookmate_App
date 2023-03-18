import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCartStore } from '../store/CartStore'

const apiUrl = import.meta.env.VITE_API_BASE_URL

// Get user data
async function fetchUser() {
	const { token, cbid } = sessionStorage
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

export function getUser() {
	return useQuery(['user'], fetchUser)
}

// Create Order
async function fetchOrder(order) {
	const { token } = sessionStorage
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

export function createOrder() {
	const clearCart = useCartStore(state => state.clearAll)
	const navigate = useNavigate()

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

// Get User Orders
async function fetchUserCart() {
	const { token, cbid } = sessionStorage
	const response = await axios(`${apiUrl}/660/orders?user.id=${cbid}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
	return response.data
}

export function useGetUserOrders() {
	return useQuery(['userCart'], fetchUserCart)
}
