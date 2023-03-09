import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export const SmoothScroll = ({ children }) => {
	const location = useLocation()
	const navType = useNavigationType()
	console.log(navType)
	useEffect(() => {
		if (navType !== 'POP') {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		}
	}, [location])
	return <>{children}</>
}
