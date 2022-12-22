export type DataType = {
  id: number;
  size: string;
  name: string;
  sku: string;
};

export type TodoType = {
  id: string;
  name: string;
};
export type ListProps = {
  data: string;
  pdps?: string[];
  pdps2?: TodoType[];
  index: number;
};
export type ListProps2 = {
  id: number;
  name: string;
  size: string;
  available: string;
};
export type CheckType = {
  id: string;
  isCheck: boolean;
};
