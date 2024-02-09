// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // массив объектов товаров в корзине
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
        const { product, quantity } = action.payload;
        const existingItem = state.items.find(item => item.product.id === product.id);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.items.push({ product, quantity });
        }
      },
    removeItem(state, action) {
      const productIdToRemove = action.payload;
      state.items = state.items.filter(item => item.product.id !== productIdToRemove);
    },
    updateItemQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === productId);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
