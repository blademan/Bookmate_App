import axios from 'axios'

export const useProducts = async url => {
	const { data } = await axios(`http://localhost:3000/${url}`)
	return data
}
