import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { useCloseSearchBar } from '../../helper'
import { useCartStore } from '../../store/CartStore'
import { DropdownLoggedIn, DropdownLoggedOut, Search } from '../index'

const darkModeAtom = atomWithStorage('darkMode', false)

export const Header = () => {
	const cartList = useCartStore(state => state.cartList)
	const [dropdown, setDropdown] = useState(false)
	const [darkMode, setDarkMode] = useAtom(darkModeAtom)
	const token = sessionStorage.getItem('token')
	let totalInCart = cartList.length

	const location = useLocation()
	useEffect(() => {
		// execute on location change
		setDropdown(false)
	}, [location])

	// Toggle the dark mode class on the document element when darkMode changes
	useEffect(() => {
		document.documentElement.classList.toggle('dark')
	}, [darkMode])

	const [isSearchOpen, closeSearchBar] = useCloseSearchBar()

	return (
		<header>
			<nav className='bg-white dark:bg-gray-900'>
				<div className='border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-3'>
					<Link to='/' className='flex items-center'>
						<img src={Logo} className='mr-3 h-10' alt='CodeBook Logo' />
						<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>CodeBook</span>
					</Link>
					<div className='flex items-center relative'>
						<span
							onClick={() => setDarkMode(!darkMode)}
							className='cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-wide-connected'
						></span>
						<span
							onClick={() => closeSearchBar()}
							className='cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-search'
						></span>
						<Link to='/cart' className='text-gray-700 dark:text-white mr-5'>
							<span className='text-2xl bi bi-cart-fill relative'>
								<span className='text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full '>
									{totalInCart}
								</span>
							</span>
						</Link>
						<span
							onClick={() => setDropdown(!dropdown)}
							className='bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white'
						></span>
						{dropdown &&
							(token ? (
								<DropdownLoggedIn setDropdown={setDropdown} />
							) : (
								<DropdownLoggedOut setDropdown={setDropdown} />
							))}
					</div>
				</div>
			</nav>

			{isSearchOpen && <Search />}
		</header>
	)
}
