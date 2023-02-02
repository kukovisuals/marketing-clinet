export type TodoType = {
  id: string;
  name: string;
};

export type CounterState = {
  id: number;
  name: string;
  newProfile: TodoType[];
}
export type DataType = {
  id: number;
  size: string;
  name: string;
  sku: string;
  sizeId?: string | number;
};

export type ListProps = {
  data: string;
  pdps?: string[];
  newProfile?: TodoType[];
  index: number;
};

export type CheckType = {
  id: string;
  isCheck: boolean;
};
