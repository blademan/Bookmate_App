import React from 'react'
import { Faq } from './components/Faq'
import { FeaturedProducts } from './components/FeaturedProducts'
import { Hero } from './components/Hero'
import { Testimonials } from './components/Testimonials'

export const HomePage = () => {
	return (
		<main>
			<Hero />
			<FeaturedProducts />
			<Testimonials />
			<Faq />
		</main>
	)
}
