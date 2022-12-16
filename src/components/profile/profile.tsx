import React, { InputHTMLAttributes } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTodo, setNewTodo, setNewSku, reset, removeSku, updateTodo2 } from "../../features/profile/profile-slice";
import { removePdp, updatePdp, addSelectedPdp } from "../../features/sheet/sheet-slice";
// import { addCheck, resetCheck } from "../../features/check/check-slice";
const dummyData = [
  { id: 0, name: 'Beveled Glass product', size: '0####', available: '0' },
  { id: 1, name: 'Black leopard product', size: '1####', available: '123' },
  { id: 2, name: 'Green seamless product', size: '2####', available: '1' },
  { id: 3, name: 'Nude  product', size: '3####', available: '1' },
  { id: 4, name: 'Gray  product', size: '4####', available: '312' },
  { id: 5, name: 'Blue Opal product', size: '5####', available: '1' },
  { id: 6, name: 'Red product', size: '6####', available: '0' },
  { id: 7, name: 'Beveled Glass product', size: '7####', available: '0' },
  { id: 8, name: 'Black leopard product', size: '8####', available: '123' },
  { id: 9, name: 'Green seamless product', size: '9####', available: '1' },
  { id: 10, name: 'Nude  product', size: '10####', available: '1' },
  { id: 11, name: 'Gray  product', size: '11####', available: '312' },
  { id: 12, name: 'Blue Opal product', size: '12####', available: '1' },
  { id: 13, name: 'Red product', size: '13####', available: '0' },
  { id: 14, name: 'Green seamless product', size: '14####', available: '1' },
  { id: 15, name: 'Red product', size: '15####', available: '0' },
]
// -----------------------------------------------------------------
/* All the title of the different profiles
*/
// -----------------------------------------------------------------
function Profile() {
  const sheet = useAppSelector((state) => state.sheet);

  return (
    <div className="Profile">
      <h2>Profile</h2>
      <div className="eby-wrapper">
        <div className="eby-container">
          {sheet && sheet.map((profile: any, i: number) =>
            <ListProfiles
              data={profile.name}
              pdps={profile.pdps}
              pdps2={profile.pdps2}
              index={i}
              key={profile.name}
            />
          )}
        </div>
      </div>
    </div>
  )
}
// -----------------------------------------------------------------
type TodoType = {
  id: string;
  name: string;
}
type ListProps = {
  data: string;
  pdps?: string[];
  pdps2?: TodoType[];
  index: number;
}
type ListProps2 = {
  id: number;
  name: string;
  size: string;
  available: string;
}
type CheckType = {
  id: string;
  isCheck: boolean;
}
interface CheckInterface {
  check: Array<CheckType>;
}
// -----------------------------------------------------------------
/*
    List of Profiles Setup the dummy data to all profiles 
    Add buttons to each of them 
    Data of profile will be inserted here
*/
// -----------------------------------------------------------------
function ListProfiles(props: ListProps) {
  const [todoNth, newTodoNth] = React.useState(0)
  // ---------------------------------------------------------------
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);
  const sheet = useAppSelector((state) => state.sheet);
  // ---------------------------------------------------------------
  const [state, setState] = React.useState({ bottom: false });
  const [main, setMain] = React.useState<TodoType[]>([])
  // ---------------------------------------------------------------
  let newPdps: string[] = []
  if (props.pdps) newPdps = props.pdps

  // ---------------------------------------------------------------
  React.useEffect(() => {
    if (props.pdps2) setMain(props.pdps2)
    console.log(main[0])
  }, [props.pdps2])
  const handleCheckReset = (event: React.MouseEvent) => {

  }
  // ---------------------------------------------------------------
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
      setState({ ...state, ['bottom']: true });

      // grab the profile we need to update from sheet-slice
      const updateSku = sheet.find((obj) => obj.id === profIndex)
      // update profile-slice sku
      if (updateSku) dispatch(updateTodo2(updateSku.pdps2))
      // Grab the index and find it in shee-slice
      dispatch(updatePdp({ index, id: profIndex }));
    }
  // -------------------------------------------------------------
  const toggleDrawer =
    (anchor: string, open: boolean, index: number) =>
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
        // add the todo with its corresponding index
        dispatch(setNewTodo(todoNth));
        console.log('hi there')
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
      sx={{ width: 'auto' }}
      role="presentation"
    >
      <div className='DrawapiList'>
        <div className='wrapper-md'>

          <form onSubmit={onSubmit}>
            <div className='flx-container-wrp'>
              {dummyData.map((d: any, i: number) =>
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
                variant="contained"
                onClick={toggleDrawer(anchor, false, props.index)}
                onKeyDown={toggleDrawer(anchor, false, props.index)}
              >
                <button type="submit" className='sin-botton'>ADD SIZE</button>
              </Button>
              <Button
                variant="contained"
                onClick={handleCheckReset}>
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
          variant="contained"
          onClick={toggleDrawer('bottom', true, props.index)}>
          Add
        </Button>
        <Drawer
          anchor='bottom'
          open={state['bottom']}
          onClose={toggleDrawer('bottom', false, props.index)}
        >
          {list('bottom')}
        </Drawer>
      </div>
    </div>
  )
}
// -----------------------------------------------------------------
/*  Draw the check boxes with data
*/
// -----------------------------------------------------------------
function DrawApiList(props: ListProps2) {
  const { name, size, available, id }: ListProps2 = props;
  // create a ref to store a reference to the checkbox element
  const checkboxRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const profileSku = useAppSelector((state) => state.profile.profileSku);
  const newTodos = useAppSelector((state) => state.profile.todos);
  // -------------------------------------------------------------
  let checkboxes: Array<CheckType> = []
  const [isChecked, setIsChecked] = React.useState(false);
  // Create a state variable for the checked state of all checkboxes
  const [checkboxStates, setCheckboxStates] = React.useState<CheckType[]>([]);
  // React.useEffect(() => {
  //   checkboxes.push({ id, label: size })
  // }, [])
  // React.useEffect(() => {
  //   for (const sku of profileSku) {
  //     if (checkboxRef.current?.value.split('::')[1].includes(sku.split('::')[1])) {
  //       setCheckboxStates({
  //         ...checkboxStates,
  //         [checkboxRef.current.name]: true,
  //       });
  //       console.log(sku.split('::')[1])
  //     }
  //   }
  // }, [])
  // console.log(checkboxStates)
  // -------------------------------------------------------------
  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false 
    }
    for (const newTodo of newTodos) {
      // console.log(newTodo.id, checkboxRef.current?.name)
      if (newTodo.id == checkboxRef.current?.name) {
        checkboxRef.current.checked = true
        
        break
      }
    }
  }, [])
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const element = event.target;

    if (element.checked) {
      dispatch(addTodo({ id: element.name, name: element.value }))
      dispatch(setNewSku(element.value))
    } else if (!element.checked && profileSku.length > 0) {
      dispatch(removeSku())
    }
    // setIsChecked(!isChecked)
    // setCheckboxStates({
    //   ...checkboxStates,
    //   [id]: !checkboxStates[id],
    // });

    // console.log(checkboxStates)
  };
  // -------------------------------------------------------------
  
  console.log('hi', checkboxStates)
  return (
    <div className='eby-sm-flex br-bttm'>

      <input
        ref={checkboxRef}
        type='checkbox'
        // checked={isChecked}
        onChange={onChange}
        name={String(id)}
        value={name + '::' + size}
      />
      <span className='width-flex-md' >{name}</span>
      <span className='width-flex-sm'>Size: {size}</span>
      <span className='width-flex-sm'>{available} available</span>
    </div>
  );
}
export default Profile
