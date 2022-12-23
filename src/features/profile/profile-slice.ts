import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TodoType = {
  id: string;
  name: string;
};
type MyType<T> = {
  [key in keyof T]: T[key];
};
type DataType = {
  id: number;
  size: string;
  name: string;
  sku: string;
};
interface CounterState {
  todos: Array<TodoType>;
  nth: number;
  profileSku: string[];
  mainData: DataType[];
  isUpload: boolean;
}

const initialState: CounterState = {
  todos: [],
  nth: 0,
  profileSku: [],
  mainData: [],
  isUpload: false,
};

// define slice container reducer logic
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos.splice(action.payload, 1);
    },
    updateTodo: (state, action: PayloadAction<string[]>) => {
      state.profileSku = action.payload;
    },
    updateTodo2: (state, action: PayloadAction<TodoType[]>) => {
      state.todos = action.payload;
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
    mainProfileData: (state, action: PayloadAction<DataType>) => {
      state.mainData.push(action.payload);
    },
    reset: (state) => {
      // Create a shallow copy of the array using Array.prototype.slice()
      const newArray = state.profileSku.slice();
      const newArray2 = state.todos.slice();
      // Reset the copied array to an empty array
      newArray.length = 0;
      newArray2.length = 0;
      // Return a new state object with the reset array
      return {
        ...state,
        todos: newArray2,
        profileSku: newArray,
      };
    },
    isUpload: (state, action: PayloadAction<boolean>) => {
      state.isUpload = action.payload;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  setNewTodo,
  setNewSku,
  reset,
  removeSku,
  updateTodo,
  updateTodo2,
  mainProfileData,
  isUpload,
} = profileSlice.actions;
export default profileSlice.reducer;
