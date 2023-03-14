import { useCartStore } from '../../store/CartStore'
import { CartEmpty } from './components/CartEmpty'
import { CartList } from './components/CartList'

export const CartPage = () => {
	const cartList = useCartStore(state => state.cartList)

	return <main>{cartList.length ? <CartList /> : <CartEmpty />}</main>
}
