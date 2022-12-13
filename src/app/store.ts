import { configureStore } from "@reduxjs/toolkit";
import counterReducer  from '../features/counter/counter-slice';
import sheetReducer  from '../features/sheet/sheet-slice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        sheet: sheetReducer,
    }
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

