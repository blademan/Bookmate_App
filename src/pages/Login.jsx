import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTitle } from '../helper'

export const Login = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	// Use the useTitle hook to update the page title
	useTitle('Login')

	// Initialize the useForm hook to handle form state and validation
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	// Initialize the useMutation hook to handle the form submission and API call using axios
	const mutateFn = authDetail => {
		return axios.post('http://localhost:8000/login', authDetail)
	}

	const mutation = useMutation(mutateFn, {
		onSuccess: response => {
			navigate('/products')
			toast.success('Login successful!')
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
	// Handle form submission by calling the useMutation hook
	const onSubmit = data => {
		mutation.mutate(data)
	}
	return (
		<main>
			<section>
				<p className='text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8'>
					Login
				</p>
			</section>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-6'>
					<label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
						Your email
					</label>
					<input
						{...register('email')}
						type='email'
						id='email'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='shubham@example.com'
						required
						autoComplete='off'
					/>
				</div>
				<div className='mb-6'>
					<label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
						Your password
					</label>
					<input
						{...register('password')}
						type='password'
						id='password'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						required
					/>
				</div>
				<button
					type='submit'
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				>
					Log In
				</button>
			</form>
			<button
				// onClick={handleLoginGuest}
				className='mt-3 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
			>
				Login As Guest
			</button>
		</main>
	)
}
