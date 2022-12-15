import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  id: number;
  name: string;
  pdps: string[];
}

const initialState: Array<CounterState> = [];
// define slice container reducer logic
const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    initObject(state, action: PayloadAction<{ id: number; name: string }>) {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        pdps: [],
      });
    },
    insertIndex(
      state,
      action: PayloadAction<{ index: number; description: string[] }>
    ) {
      console.log(action.payload);
      state[action.payload.index].pdps = action.payload.description;
    },
    removePdp(state, action: PayloadAction<{index:number, id:number}>) {
      const {index, id} = action.payload;
      // Find the object with the specified 'id'
      const object = state.find((obj) => obj.id === id);
      // Use splice to remove the array at the specified index from the nestedArray
      if (object) object.pdps.splice(index, 1);

      return state;
    },
    updatePdp(state, action: PayloadAction<{index:number, id:number}>) {},
  },
});

export const { initObject, insertIndex, removePdp, updatePdp } =
  sheetSlice.actions;
export default sheetSlice.reducer;
