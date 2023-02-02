import React from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setNewTodo, reset, updateTodo2 } from "../../features/profile/profile-slice";
import { removePdp, updateDrag, addSelectedPdp } from "../../features/sheet/sheet-slice";
import { DataType, TodoType, ListProps } from '../../utilities/profileTypes';

import useDragAndDrop from '../useDragAndDrop/useDragAndDrop';
import DrawApiList from './DrawApiList';
import { styled } from '@mui/material/styles';
const CuatomBox = styled(Box)`
  width: 50%;
`;
const ButtonProfile = styled(Button)`
  color: #000000;
  border: 1px solid gray;
  &:hover{
    color: #1976d2;
  }
`;
const ButtonCheckbox = styled(Button)`
  padding:0;

  border: 1px solid gray;
`;
type Somethign = {
  draggedFrom: number,
  draggedTo: number,
  isDragging: boolean,
  originalOrder: TodoType[],
  updatedOrder: TodoType[],
}
const initialDndState: Somethign = {
  draggedFrom: 0,
  draggedTo: 0,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
}
/* 
  -----------------------------------------------------------------
    List of Profiles Setup the dummy data to all profiles 
    Add buttons to each of them 
    Data of profile will be inserted here
  -----------------------------------------------------------------
*/
function ListProfiles(props: ListProps) {
  // console.log('list items listProfiles.tsx => ', props.data)
  const myRef = React.useRef<HTMLLIElement>(null);
  const [stateDrag, setSateDrag] = React.useState({
    id: 0,
    index: 0
  })
  const [dragAndDrop, setDragAndDrop] = React.useState(initialDndState);

  const [play, setPlay] = React.useState([1, 2, 3, 4, 5, 6])

  const [todoNth, newTodoNth] = React.useState(0)

  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);
  const sheet = useAppSelector((state) => state.sheet);

  const [state, setState] = React.useState({ right: false });
  const [main, setMain] = React.useState<TodoType[]>([]);

  const [newSearch, setNewSearch] = React.useState<string>('');

  let newSize = ''
  if (props.data) {
    newSize = props.data.split(') in ')[1]
  }
  const [filterMain, setFilterMain] = React.useState<DataType[]>([]);

  const [testItem, setTestItem] = React.useState<{id: string, profiles: TodoType}[]>([]);
  /*
    ---------------------------------------------------------------
     main drag and drop fix the initial state 
     should be the index of the card grabbed
     ---------------------------------------------------------------
  */
  const { profileItems, itemIndex, setItemIndex, handleDragStart, handleDragOver } = useDragAndDrop();
  
  // ---------------------------------------------------------------
  React.useEffect(() => {
    if (props.newProfile) setMain(props.newProfile)
  }, [props.newProfile])
  // ---------------------------------------------------------------
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }
  const filteredItems = filterMain.filter(item => item.name.toLowerCase().includes(newSearch.toLowerCase()));
  const handleRemove = (index: number, profIndex: number) =>
  (event: React.MouseEvent<HTMLElement>) => {
    // Grab the index and find it in shee-slice
    dispatch(removePdp({ index, id: profIndex }));
    console.log(event.target, index, ' profile ', profIndex)
  }
  // ---------------------------------------------------------------
  const handleUpdate = (index: number, profIndex: number) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
      (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, ['right']: true });
      
      // grab the profile we need to update from sheet-slice
      const updateSku = sheet.find((obj) => obj.id === profIndex)
      // update profile-slice sku
      if (updateSku) dispatch(updateTodo2(updateSku.pdps2))
    }
    // -------------------------------------------------------------
    const toggleDrawer =
    (anchor: string, open: boolean, index: number, pSize: string) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState({ ...state, [anchor]: open });
        newTodoNth(index)
        const filterData = profile.mainData.filter((value: any, index: number) =>
        value.size == pSize
        )
        setFilterMain(filterData)
        // add the todo with its corresponding index
        dispatch(setNewTodo(todoNth));
      };
      // -------------------------------------------------------------
      const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // add the todo with its corresponding index
        dispatch(setNewTodo(todoNth));
        // concat the checked items to the profiles 
        dispatch(addSelectedPdp({ index: todoNth, description: profile.todos }))
        // clear the profile skus from the from 
        dispatch(reset())
      };
      // -------------------------------------------------------------
      const list = (anchor: string) => (
        <CuatomBox
        sx={{ width: '450px' }}
        role="presentation"
        >
      <div className='DrawapiList'>
        <div className='wrapper-md'>
          <div className='input-filter'>
            <input
              type="text"
              placeholder='search'
              onChange={handleSearch}
              value={newSearch}
              />
          </div>
          <form onSubmit={onSubmit}>
            <div className='flx-container-wrp'>
              {filteredItems.map((d: any, i: number) =>
                <DrawApiList
                name={d.name}
                size={d.size}
                id={d.id}
                sku={d.sku}
                sizeId={d.sizeId}
                />
                )}
            </div>
            <div className='hght-nly flx-container-wrp eby-flx-spc-btw'>
              <ButtonCheckbox
                variant="outlined"
                onClick={toggleDrawer(anchor, false, props.index, newSize)}
                onKeyDown={toggleDrawer(anchor, false, props.index, newSize)}
                >
                <button type="submit" className='sin-botton'>ADD {newSize}</button>
              </ButtonCheckbox>
            </div>
          </form>
        </div>
      </div>
    </CuatomBox>
  );
  
  // ---------------------------------------------------------------
  React.useEffect(() => {
    if(main.length > 0){
      const newItems = {id: props.index, profiles: main}
      setTestItem( prev => ({
        ...prev, 
        id: props.index,
        profiles : main
      }))
      // console.log(testItem)
    }
    setItemIndex(props.index)
  },[main])
  
  // console.log('---------------------------------------------------------------')
  // console.log(profileItems, itemIndex)
  // console.log('---------------------------------------------------------------')
  console.log('prifles-> ', typeof profileItems)
  return (
    <div className="eby-list">
      <div>
        <span className='title-md'>{props.index}. {props.data}</span>
      </div>
      <div>

        <ul className='ul-list'>
          {(profileItems && profileItems.length > 0) && profileItems.map((item: any, i: number) =>
            <li
              key={item.id}
              draggable
              onDragStart={e => handleDragStart(e, i, props.index)}
              onDragOver={() => handleDragOver(i, props.index)}
              className="skus-main"
            >
              <div className='eby-sm-flex eby-flx-spc-btw'>
                <span className='name-update' onClick={handleUpdate(i, props.index)}>{item.name}</span>
                <span className='x-remove' onClick={handleRemove(i, props.index)}>X</span>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className="eby-bttm-abs">
        <ButtonProfile
          variant="outlined"
          size="small"
          onClick={toggleDrawer('right', true, props.index, newSize)}>
          <span>ADD {newSize}</span>
        </ButtonProfile>
        <Drawer
          anchor='right'
          open={state['right']}
          onClose={toggleDrawer('right', false, props.index, newSize)}
        >
          {list('right')}
        </Drawer>
      </div>
    </div>
  )
}


export default ListProfiles
