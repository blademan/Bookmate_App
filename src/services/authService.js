import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const apiUrl = import.meta.env.VITE_API_BASE_URL

export const useLogin = () => {
	const loginMutation = async authDetail => {
		const response = await axios.post(`${apiUrl}/login`, authDetail)
		if (response.data.accessToken) {
			sessionStorage.setItem('token', response.data.accessToken)
			sessionStorage.setItem('cbid', response.data.user.id)
		}
		return response.data
	}

	const navigate = useNavigate()

	return useMutation(loginMutation, {
		onSuccess: data => {
			navigate('/products')
			toast.success(`Welcome ${data.user.name} `)
		},

		// Handle errors by displaying them using toast
		onError: error => {
			console.error(error)
			toast.error(error.response?.data || 'Network Error')
		},
	})
}

export const useRegister = () => {
	const registerMutation = async authDetail => {
		const response = await axios.post(`${apiUrl}/register`, authDetail)
		if (response.data.accessToken) {
			sessionStorage.setItem('token', response.data.accessToken)
			sessionStorage.setItem('cbid', response.data.user.id)
		}
		return response.data
	}

	const navigate = useNavigate()

	return useMutation(registerMutation, {
		onSuccess: data => {
			navigate('/login')
			toast.success('Registration successful!')
		},

		// Handle errors by displaying them using toast
		onError: error => {
			console.error(error)
			toast.error(error.response?.data || 'Network Error')
		},
	})
}

export function useLogout() {
	toast.success('Logout successful')
	sessionStorage.removeItem('token')
	sessionStorage.removeItem('cbid')
}
