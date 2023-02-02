export type TodoType = {
    id: string;
    name: string;
}
export interface DragType {
    obj: TodoType | null;
    objId: number
}
export interface DragArrayType {
    obj: TodoType[];
    objId: number;
}
export interface CounterState {
    id: number;
    name: string;
    pdps2: TodoType[] | [];
    draggedItem: TodoType | null;
}
