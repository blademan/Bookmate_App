import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const apiUrl = import.meta.env.VITE_API_BASE_URL

export const useLogin = () => {
	const mutateFn = authDetail => {
		return axios.post(`${apiUrl}/login`, authDetail)
	}
	const navigate = useNavigate()

	return useMutation(mutateFn, {
		onSuccess: response => {
			navigate('/products')
			toast.success('Login successful!')
			if (response.data.accessToken) {
				sessionStorage.setItem('token', response.data.accessToken)
				sessionStorage.setItem('cbid', response.data.user.id)
			}
		},

		onError: error => {
			console.log(error)
			toast.error(error.response.data)
		},
	})
}

export const useRegister = () => {
	const mutateFn = authDetail => {
		return axios.post(`${apiUrl}/register`, authDetail)
	}
	const navigate = useNavigate()
	return useMutation(mutateFn, {
		onSuccess: response => {
			navigate('/login')
			toast.success('Registration successful!')
			if (response.data.accessToken) {
				sessionStorage.setItem('token', response.data.accessToken)
				sessionStorage.setItem('cbid', response.data.user.id)
			}
		},

		// Handle errors by logging them to the console
		onError: error => {
			console.log(error)
			toast.error(error.response.data)
		},
	})
}

export function useLogout() {
	toast.success('Logout successful')
	sessionStorage.removeItem('token')
	sessionStorage.removeItem('cbid')
}
