import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// payload is the action of one
interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0
};
// define slice container reducer logic
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incremented(state){
            state.value++;
        },
        amountAdded(state, action:PayloadAction<number>){
            state.value += action.payload;
        }
    }
});

export const {incremented, amountAdded  } = counterSlice.actions;
export default counterSlice.reducer;