import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TodoType = {
  id: string;
  name: string;
}
interface DragType {
  obj: TodoType | null;
  objId: number
}
interface DragArrayType {
  obj: TodoType[];
  objId: number;
}
interface CounterState {
  id: number;
  name: string;
  pdps2: TodoType[] | [];
  draggedItem: TodoType | null;
} 

const initialState: Array<CounterState> = [];
// define slice container reducer logic
const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    initObject(state, action: PayloadAction<{ id: number; name: string; pdpArr: TodoType[] | [] }>) {
      // console.log('redux sheet ', action.payload.id, action.payload.name)
      const pdpsArrValues = action.payload.pdpArr || []

      state.push({
        id: action.payload.id,
        name: action.payload.name,
        pdps2: pdpsArrValues,
        draggedItem:null
      });
    },
    // pushSkuSheet(state, action: PayloadAction<{ index: number; description: TodoType }>){
    //   state[action.payload.index].pdps2.push(action.payload.description)
    // },
    addSelectedPdp(
      state,
      action: PayloadAction<{ index: number; description: TodoType[] | []}>
    ) {
      console.log(action.payload.description)
      console.log(' pdpds -> ', state[action.payload.index])
      // if(state[action.payload.index] == undefined){
      //   state[action.payload.index].pdps2 = []  
      // }
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
    updateDrag(state, action: PayloadAction<{index:number, id:number, to:number}>) {

    const {index, id, to} = action.payload

      let getCopy = state[id].pdps2
      const a = getCopy.filter((a:any, index:number) => index != index)
      const x = a.slice(0,to)
      const y = getCopy.slice(to + 1)
      const z = [
        ...x,
        state[id].pdps2[index],
        ...y
      ]
      state[id].pdps2 = z
    },
    setDraggedItem: (state, action: PayloadAction<DragType>) => {
      const {obj, objId} = action.payload
      state[objId].draggedItem = obj;
    },
    setItemsDragged: (state, action: PayloadAction<DragArrayType>) => {
      const {obj, objId} = action.payload
      state[objId].pdps2 = obj;
    },
    resetSheet: (state) => {
      // Create a shallow copy of the array using Array.prototype.slice()
      state = initialState
    },
  },
});

export const { initObject, removePdp, updateDrag, addSelectedPdp, setDraggedItem, setItemsDragged, resetSheet } =
  sheetSlice.actions;
export default sheetSlice.reducer;
