import { useForm } from 'react-hook-form'
import { useTitle } from '../helper'
import { useRegister } from '../services'

export const Register = () => {
	// Use the useTitle hook to update the page title
	useTitle('Register')
	// Initialize the useForm hook to handle form state and validation
	const { register, handleSubmit } = useForm()
	// Initialize the useMutation hook to handle the form submission and API call using axios
	const { mutate, isLoading } = useRegister()
	// Handle form submission by calling the useMutation hook
	const onSubmit = data => {
		mutate(data)
	}

	return (
		<main>
			<section>
				<p className='text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8'>
					Register
				</p>
			</section>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-6'>
					<label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
						Your name
					</label>
					<input
						{...register('name')}
						type='name'
						id='name'
						className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
						placeholder='Shubham Sarda'
						required
						autoComplete='off'
					/>
				</div>
				<div className='mb-6'>
					<label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
						Your email
					</label>
					<input
						{...register('email')}
						type='email'
						id='email'
						className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
						placeholder='shubham@example.com'
						autoComplete='off'
						required
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
						className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
						required
						minLength='7'
					/>
				</div>
				<button
					disabled={isLoading}
					type='submit'
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				>
					Register
				</button>
			</form>
		</main>
	)
}
