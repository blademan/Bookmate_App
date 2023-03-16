import { useTitle } from '../../helper'
import { useCartStore } from '../../store/CartStore'
import { CartEmpty } from './components/CartEmpty'
import { CartList } from './components/CartList'

export const CartPage = () => {
	const cartList = useCartStore(state => state.cartList)
	useTitle(`Cart (${cartList.length})`)

	return <main>{cartList.length ? <CartList /> : <CartEmpty />}</main>
}
