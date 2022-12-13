import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    [index:string]: string
}

const initialState: Array<CounterState> = [];

// define slice container reducer logic
const sheetSlice = createSlice({
    name: 'sheet',
    initialState,
    reducers: {
        initObject(state, action:PayloadAction<any>){
            state.push({name: action.payload});
        }
    }
});

export const { initObject  } = sheetSlice.actions;
export default sheetSlice.reducer;