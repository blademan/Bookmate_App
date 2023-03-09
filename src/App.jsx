import { Footer, Header } from './components'
import { SmoothScroll } from './helper/ScrollToTop'
import { AllRoutes } from './routes/AllRoutes'

function App() {
	return (
		<SmoothScroll>
			<div className='App dark:bg-slate-800'>
				<Header />
				<AllRoutes />
				<Footer />
			</div>
		</SmoothScroll>
	)
}

export default App
