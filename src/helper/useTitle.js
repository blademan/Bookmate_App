import { useEffect } from 'react'

export const useTitle = title => {
	useEffect(() => {
		const prevTitle = document.title
		document.title = `${title} / BookMate`

		return () => {
			document.title = prevTitle
		}
	}, [title])

	return null
}
