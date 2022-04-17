import { createSlice } from '@reduxjs/toolkit';

const cartInitialState = {
    products: [],
    totalAmount: 0,
    totalNumber: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        updateCart(state, action) {
            state.totalAmount = state.totalAmount + action.payload.price.amount;
            state.totalNumber++;

            let existingProduct = state.products.find((el) => el.id === action.payload.id)

            if (existingProduct) {
                existingProduct.productCount++;
                existingProduct.productTotalPrice = existingProduct.productTotalPrice + action.payload.price.amount;
            } else {
                state.products.push({
                    ...action.payload,
                    productCount: 1,
                    productTotalPrice: action.payload.price.amount
                })
            }
        },

        updateProductCount(state, action) {
            state.totalAmount = state.totalAmount + action.payload.amount;
            state.totalNumber++;

            let existingProduct = state.products.find((el) => el.id === action.payload.id)
            existingProduct.productCount++;
            existingProduct.productTotalPrice = existingProduct.productTotalPrice + action.payload.amount;
        },

        deleteProduct(state, action) {
            state.totalAmount = Math.abs(state.totalAmount - action.payload.amount);
            state.totalNumber--;

            let existingProduct = state.products.find((el) => el.id === action.payload.id)

            if (existingProduct.productCount === 1) {
                state.products = state.products.filter((el) => el.id !== action.payload.id)
            } else {
                existingProduct.productCount--;
                existingProduct.productTotalPrice = existingProduct.productTotalPrice - action.payload.amount;
            }
        }
    },
});

export const cartActions = cartSlice.actions

export default cartSlice.reducer