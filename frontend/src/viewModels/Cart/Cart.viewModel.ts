import { useCartStore } from "../../shared/store/cart-store";

export default function useCartViewModel() {

    const { items, removeItem, updateItemQuantity, clearCart, getTotalPrice } = useCartStore();
    
    return {
        items,
        removeItem,
        updateItemQuantity,
        clearCart,
        getTotalPrice
    }
}