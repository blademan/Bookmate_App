import produce from 'immer'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useCartStore = create(
	(set, get) => ({
		cartList: [],
		total: 0,
		clearAll: () =>
			set(
				produce(draft => {
					draft.cartList = []
					draft.total = 0
				})
			),
		addToCart: product =>
			set(
				produce(draft => {
					draft.cartList.push(product)
					draft.total += product.price
				})
			),

		removeProduct: id =>
			set(
				produce(draft => {
					const product = draft.cartList.find(item => item.id === id)
					if (product) {
						draft.cartList = draft.cartList.filter(item => item.id !== id)
						draft.total -= product.price
					}
				})
			),
	})

	// {
	// 	name: 'cart_storage', // unique name
	// 	storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
	// }
)
// useCartStore.subscribe(state => {
// 	state.total = state.cartList.reduce((acc, item) => (acc = acc + item.price), 0)
// })
