import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface CartItem {
  id: number
  name: string
  price: string
  quantity: number
  image?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: number) => void
  updateItemQuantity: (params: { productId: number; quantity: number }) => void
  clearCart: () => void
  getItemCount: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          }

          return {
            items: [...state.items, { ...product, quantity: 1 }],
          }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      updateItemQuantity: ({ productId, quantity }) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.id !== productId)
              : state.items.map((item) =>
                  item.id === productId
                    ? { ...item, quantity }
                    : item,
                ),
        })),

      clearCart: () => set({ items: [] }),

      getItemCount: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
            (total, item) => total + parseFloat(item.price) * item.quantity,
            0,
        )
    }),
    {
      name: 'marketplace-cart',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)