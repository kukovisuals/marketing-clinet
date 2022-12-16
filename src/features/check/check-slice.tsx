import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CheckType = {
  id: string;
  isCheck: boolean;
}
interface CheckInterface {
  check: Array<CheckType>;
}

const initialState: CheckInterface = {
  check: []
};

// define slice container reducer logic
const profileSlice = createSlice({
  name: "check",
  initialState,
  reducers: {
    addCheck: (state, action: PayloadAction<CheckType>) => {
      state.check.push(action.payload);
    },
    updateCheck: (state, action: PayloadAction<CheckType>) => {
        
    },
    resetCheck: (state) => {
      // Create a shallow copy of the array using Array.prototype.slice()
      const newArray = state.check.slice();
      // Reset the copied array to an empty array
      newArray.length = 0;
      // Return a new state object with the reset array
      return {
        ...state,
        todos: newArray,
      };
    },
  },
});

export const { addCheck, resetCheck, updateCheck } = profileSlice.actions;
export default profileSlice.reducer;
