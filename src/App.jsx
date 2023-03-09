import { Footer, Header } from './components'
import { AllRoutes } from './routes/AllRoutes'

function App() {
	return (
		<div className='text-red-200'>
			<Header />
			<AllRoutes />
			<Footer />
		</div>
	)
}

export default App
