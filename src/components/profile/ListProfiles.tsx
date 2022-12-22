import React from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setNewTodo, reset, updateTodo2 } from "../../features/profile/profile-slice";
import { removePdp, updatePdp, addSelectedPdp } from "../../features/sheet/sheet-slice";
import { DataType, TodoType, ListProps } from '../../utilities/profileTypes';

import DrawApiList from './DrawApiList';
/* -----------------------------------------------------------------
    List of Profiles Setup the dummy data to all profiles 
    Add buttons to each of them 
    Data of profile will be inserted here
*/
// -----------------------------------------------------------------
function ListProfiles(props: ListProps) {

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
  // ---------------------------------------------------------------
  React.useEffect(() => {
    if (props.pdps2) setMain(props.pdps2)
  }, [props.pdps2])
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
      // Grab the index and find it in shee-slice
      dispatch(updatePdp({ index, id: profIndex }));
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
        const filterData = profile.mainData.filter((value: DataType, index: number) =>
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
    <Box
      sx={{ width: 450 }}
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
                  available={d.available}
                />
              )}
            </div>
            <div className='hght-nly flx-container-wrp eby-flx-spc-btw'>
              <Button
                variant="outlined"
                onClick={toggleDrawer(anchor, false, props.index, newSize)}
                onKeyDown={toggleDrawer(anchor, false, props.index, newSize)}
              >
                <button type="submit" className='sin-botton'>ADD SIZE</button>
              </Button>
              <Button
                variant="outlined">
                Reset
              </Button>
            </div>

          </form>
        </div>
      </div>
    </Box>
  );
  // -----------------------------------------------------------------------------
  return (
    <div className="eby-list">
      <div>
        <span className='title-md'>{props.data}</span>
      </div>
      <div>
        <ul className='ul-list'>
          {main && main.map((d: any, i: number) =>
            <li className="skus-main" key={d.id + i}>
              <div className='eby-sm-flex eby-flx-spc-btw'>
                <span className='name-update' onClick={handleUpdate(i, props.index)}>{d.name}</span>
                <span className='x-remove' onClick={handleRemove(i, props.index)}>X</span>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className="eby-bttm-abs">

        <Button
          variant="outlined"
          size="large"
          onClick={toggleDrawer('right', true, props.index, newSize)}>
          <span>ADD {newSize}</span>
        </Button>
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
