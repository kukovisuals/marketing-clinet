import { configureStore } from "@reduxjs/toolkit";
import counterReducer  from '../features/counter/counter-slice';
import sheetReducer  from '../features/sheet/sheet-slice';
import profileReducer  from '../features/profile/profile-slice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        sheet: sheetReducer,
        profile: profileReducer,
    }
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

