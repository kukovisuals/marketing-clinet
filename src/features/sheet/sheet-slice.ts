import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TodoType = {
  id: string;
  name: string;
}
interface CounterState {
  id: number;
  name: string;
  pdps2: TodoType[];
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
        pdps2:[],
      });
    },
    addSelectedPdp(
      state,
      action: PayloadAction<{ index: number; description: TodoType[] }>
    ) {
      console.log(action.payload.description)
      state[action.payload.index].pdps2 = action.payload.description;
    },
    removePdp(state, action: PayloadAction<{index:number, id:number}>) {
      const {index, id} = action.payload;
      // Find the object with the specified 'id'
      const object = state.find((obj) => obj.id === id);
      // Use splice to remove the array at the specified index from the nestedArray
      if (object) {
        object.pdps2.splice(index, 1);
      }

      return state;
    },
    updatePdp(state, action: PayloadAction<{index:number, id:number}>) {},
  },
});

export const { initObject, removePdp, updatePdp, addSelectedPdp } =
  sheetSlice.actions;
export default sheetSlice.reducer;
