import { createSlice } from '@reduxjs/toolkit';


const itemsInitialState = {
    items: [],
    cat: 'All',
    curr: 'USD',
    symbol: '$',
};

const itemsSlice = createSlice({
    name: 'items',
    initialState: itemsInitialState,
    reducers: {
        updateItems(state, action) {
            state.items = action.payload.items;
            state.cat = action.payload.cat;
        },

        updateCurrency(state, action) {
            state.curr = action.payload.curr;
            state.symbol = action.payload.symbol;
        },
    },
});

export const itemsActions = itemsSlice.actions

export default itemsSlice.reducer

