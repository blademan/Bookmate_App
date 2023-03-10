import axios from 'axios'

const useProducts = async url => {
	const { data } = await axios(`http://localhost:3000/${url}`)
	return data
}

export default useProducts
