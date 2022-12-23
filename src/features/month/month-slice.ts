import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {DataType} from '../../utilities/profileTypes';

type SizesType = {
  xs: string[];
  sm: string[];
  md: string[];
  lg: string[];
  xl: string[];
  "1x"?: string[] | null;
  "2x": string[];
  "3x": string[];
  "4x": string[];
};

type NameType = {
  name: string;
  ref: string;
  sizes: SizesType[];
  _id:string;
}
type TodoType = {
  id: string;
  name: string;
};

interface CounterState {
  id: number;
  name: string;
  newProfile: DataType[];
}

const initialState: Array<CounterState> = [];
// define slice container reducer logic
const monthSlice = createSlice({
  name: "month",
  initialState,
  reducers: {
    initObject(state, action: PayloadAction<{ id: number; name: string }>) {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        newProfile:[],
      });
    },
    addSelectedPdp(
      state,
      action: PayloadAction<{ index: number; description: DataType[] }>
    ) {
      console.log(action.payload.description)
      state[action.payload.index].newProfile = action.payload.description;
    },
    removePdp(state, action: PayloadAction<{index:number, id:number}>) {
      const {index, id} = action.payload;
      // Find the object with the specified 'id'
      const object = state.find((obj) => obj.id === id);
      // Use splice to remove the array at the specified index from the nestedArray
      if (object) {
        object.newProfile.splice(index, 1);
      }

      return state;
    },
    restartMonth(state) {
      return initialState
    },
  },
});

export const { initObject, removePdp, restartMonth, addSelectedPdp } =
  monthSlice.actions;
export default monthSlice.reducer;
