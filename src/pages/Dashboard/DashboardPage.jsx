import { useTitle } from '../..//helper/useTitle'
import { useGetUserCart } from '../../services'
import { DashboardCard } from './components/DashboardCard'
import { DashboardEmpty } from './components/DashboardEmpty'

export const DashboardPage = () => {
	useTitle('Dashboard')

	const { data: orders, isLoading } = useGetUserCart()

	if (isLoading) {
		return <p>Loading</p>
	}

	return (
		<main>
			<section>
				<p className='text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8'>
					My Dashboard
				</p>
			</section>
			<section>{orders.length !== 0 && orders.map(order => <DashboardCard key={order.id} order={order} />)}</section>
			<section>{!orders.length && <DashboardEmpty />}</section>
		</main>
	)
}
