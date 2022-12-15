import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  todos: string[];
  newTodo: string;
  nth: number;
  profileSku: string[];
}

const initialState: CounterState = {
  todos: [],
  newTodo: "",
  nth: 0,
  profileSku: [],
};

// define slice container reducer logic
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos.splice(action.payload, 1);
    },
    setNewTodo: (state, action: PayloadAction<number>) => {
      state.nth = action.payload;
    },
    setNewSku: (state, action: PayloadAction<string>) => {
      state.profileSku.push(action.payload);
    },
    removeSku: (state) => {
      state.profileSku.pop();
    },
    reset: (state) => {
      // Create a shallow copy of the array using Array.prototype.slice()
      const newArray = state.profileSku.slice();
      // Reset the copied array to an empty array
      newArray.length = 0;
      // Return a new state object with the reset array
      return {
        ...state,
        profileSku: newArray,
      };
    },
  },
});

export const { addTodo, removeTodo, setNewTodo, setNewSku, reset, removeSku } =
  profileSlice.actions;
export default profileSlice.reducer;
