import React, { InputHTMLAttributes } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTodo, removeTodo, setNewTodo, setNewSku, reset, removeSku, updateTodo } from "../../features/profile/profile-slice";
import { insertIndex, removePdp, updatePdp } from "../../features/sheet/sheet-slice";

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
type ListProps = {
    data: string;
    pdps?: string[];
    index: number;
}
type ListProps2 = {
    id: number;
    name: string;
    size: string;
    available: string;
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
    // -------------------------------------------------------------
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state) => state.profile);
    const sheet = useAppSelector((state) => state.sheet);
    // -------------------------------------------------------------
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
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
            };
    // -------------------------------------------------------------
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // add the todo with its corresponding index
        dispatch(setNewTodo(todoNth));
        // concat the checked items to the profiles 
        dispatch(insertIndex({ index: todoNth, description: profile.profileSku }))
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
                    <h2>Add Product to Profile</h2>
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
                        <Button
                            variant="contained"
                            onClick={toggleDrawer(anchor, false, props.index)}
                            onKeyDown={toggleDrawer(anchor, false, props.index)}
                        >
                            <button type="submit" >Add Todo</button>
                        </Button>

                    </form>
                </div>
            </div>
        </Box>
    );
    // -------------------------------------------------------------
    let newPdps: string[] = []
    if (props.pdps) {
        newPdps = props.pdps
    }
    // -----------------------------------------------------------------------------
    const handleRemove = (index: number, profIndex: number) =>
        (event: React.MouseEvent<HTMLElement>) => {
            // Grab the index and find it in shee-slice
            dispatch(removePdp({ index, id: profIndex }));
            console.log(event.target, index, ' profile ', profIndex)
        }
    // -----------------------------------------------------------------------------
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
            if (updateSku) dispatch(updateTodo(updateSku.pdps))
            // Grab the index and find it in shee-slice
            dispatch(updatePdp({ index, id: profIndex }));
        }
    // -----------------------------------------------------------------------------
    return (
        <div className="eby-list">
            <div>
                <span className='title-md'>{props.data}</span>
            </div>
            <div>
                <ul className='ul-list'>
                    {newPdps.length > 0 && newPdps.map((d: string, i: number) =>
                        <li className="skus-main" key={d + i}>
                            <div className='eby-sm-flex eby-flx-spc-btw'>
                                <span className='name-update' onClick={handleUpdate(i, props.index)}>{d}</span>
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
                    Add Product {props.index}
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
type CheckType = {
    id: number,
    label: string
}
function DrawApiList(props: ListProps2) {
    const { name, size, available, id }: ListProps2 = props;
    // create a ref to store a reference to the checkbox element
    const checkboxRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const profileSku = useAppSelector((state) => state.profile.profileSku);
    // -------------------------------------------------------------
    const checkboxes: Array<CheckType> = []
    // Create a state variable for the checked state of all checkboxes
    const [checkboxStates, setCheckboxStates] = React.useState<{ [key: number]: boolean }>({});
    React.useEffect(() => {
        checkboxes.push({ id, label: size })
        // setCheckboxStates({
        //     ...checkboxStates,
        //     [id]: !checkboxStates[id],
        // });
        // console.log(checkboxes[0].id >= 0)
    }, [])
    React.useEffect(() => {
        for(const sku of profileSku){
            if(checkboxRef.current?.value.split('::')[1].includes(sku.split('::')[1])){
                setCheckboxStates({
                    ...checkboxStates,
                    [checkboxRef.current.name]: true,
                });     
                console.log(sku.split('::')[1])
            }
        }
    }, [])
    console.log(checkboxStates)
    // -------------------------------------------------------------
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const element = event.target
        if (element.checked) {
            dispatch(addTodo(element.name))
            dispatch(setNewSku(element.value))
        } else if (!element.checked && profileSku.length > 0) {
            dispatch(removeSku())
        }
        setCheckboxStates({
            ...checkboxStates,
            [id]: !checkboxStates[id],
          });
        console.log(checkboxStates)
    };
    // -------------------------------------------------------------
    return (
        <div className='eby-sm-flex br-bttm'>

            <input
                ref={checkboxRef}
                type='checkbox'
                checked={checkboxStates[id] || false}
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
