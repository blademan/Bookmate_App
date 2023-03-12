import { Footer, Header } from './components'
import { ScrollToTop } from './helper'
import { AllRoutes } from './routes/AllRoutes'

function App() {
	return (
		<ScrollToTop>
			<div className='App dark:bg-slate-800'>
				<Header />
				<AllRoutes />
				<Footer />
			</div>
		</ScrollToTop>
	)
}

export default App
