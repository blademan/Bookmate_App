import React from 'react'
import { useTitle } from '../../helper/useTitle'
import { Faq } from './components/Faq'
import { FeaturedProducts } from './components/FeaturedProducts'
import { Hero } from './components/Hero'
import { Testimonials } from './components/Testimonials'

export const HomePage = () => {
	useTitle('Home')
	return (
		<main>
			<Hero />
			<FeaturedProducts />
			<Testimonials />
			<Faq />
		</main>
	)
}
