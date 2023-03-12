import { atom, useAtom } from 'jotai'

const searchBarAtom = atom(false)

export const useCloseSearchBar = () => {
	const [isSearchOpen, setIsSearchOpen] = useAtom(searchBarAtom)

	const closeSearchBar = () => {
		setIsSearchOpen(!isSearchOpen)
	}

	return [isSearchOpen, closeSearchBar]
}
