import { useLocation } from 'react-router-dom'
import { useTitle } from '../../helper/useTitle'
import { OrderFail } from './components/OrderFail'
import { OrderSuccess } from './components/OrderSuccess'

export const OrderPage = () => {
	useTitle('Order Summary')
	const { state } = useLocation()

	return <main>{state.status ? <OrderSuccess state={state.order} /> : <OrderFail />}</main>
}
