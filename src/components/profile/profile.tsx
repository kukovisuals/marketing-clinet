import React, { InputHTMLAttributes } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTodo, removeTodo, setNewTodo, setNewSku, reset, removeSku } from "../../features/profile/profile-slice";
import { insertIndex, removePdp, updatePdp } from "../../features/sheet/sheet-slice";

const dummyData = [
    { name: 'Beveled Glass product', size: '####', available: '0' },
    { name: 'Black leopard product', size: '####', available: '123' },
    { name: 'Green seamless product', size: '####', available: '1' },
    { name: 'Nude  product', size: '####', available: '1' },
    { name: 'Gray  product', size: '####', available: '312' },
    { name: 'Blue Opal product', size: '####', available: '1' },
    { name: 'Red product', size: '####', available: '0' },
    { name: 'Beveled Glass product', size: '####', available: '0' },
    { name: 'Black leopard product', size: '####', available: '123' },
    { name: 'Green seamless product', size: '####', available: '1' },
    { name: 'Nude  product', size: '####', available: '1' },
    { name: 'Gray  product', size: '####', available: '312' },
    { name: 'Blue Opal product', size: '####', available: '1' },
    { name: 'Red product', size: '####', available: '0' },
    { name: 'Green seamless product', size: '####', available: '1' },
    { name: 'Red product', size: '####', available: '0' },
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
// -----------------------------------------------------------------------------
type ListProps = {
    data: string;
    pdps?: string[];
    index: number;
}
type ListProps2 = {
    name: string;
    size: string;
    available: string;
}
// -----------------------------------------------------------------------------
function ListProfiles(props: ListProps) {
    // Use the useDispatch hook to dispatch actions to the Redux store
    const [todos, newTodo] = React.useState('')
    const [todoNth, newTodoNth] = React.useState(0)

    const dispatch = useAppDispatch();
    const profile = useAppSelector((state) => state.profile);

    // console.log(todoNth)
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    // -----------------------------------------------------------------------------
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
    // -----------------------------------------------------------------------------
    // This function will be called when the form is submitted
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // add the todo with its corresponding index
        dispatch(setNewTodo(todoNth));
        // Add the new todo to the list of todos
        dispatch(addTodo(todos));
        newTodo('')
        // concat the checked items to the profiles 
        dispatch(insertIndex({ index: todoNth, description: profile.profileSku }))
        // clear the profile skus from the from 
        dispatch(reset())
    };
    // -----------------------------------------------------------------------------
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
    // -----------------------------------------------------------------------------
    let newPdps: string[] = []
    if (props.pdps) {
        newPdps = props.pdps
    }
    // -----------------------------------------------------------------------------
    const handleRemove = (index: number, profIndex: number) =>
        (event: React.MouseEvent<HTMLElement>) => {
            // Grab the index and find it in shee-slice
            dispatch(removePdp({index, id:profIndex}));
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
            // Grab the index and find it in shee-slice
            dispatch(updatePdp({index, id:profIndex}));
            console.log(event.target, index, ' update  ', profIndex)
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
// -----------------------------------------------------------------------------
function DrawApiList(props: ListProps2) {
    // create a ref to store a reference to the checkbox element
    const { name, size, available }: ListProps2 = props;
    const checkboxRef = React.useRef<HTMLInputElement>(null);
    // use useState to store the value of the checkbox
    const [isChecked, setIsChecked] = React.useState(false);

    const dispatch = useAppDispatch();
    const profileSku = useAppSelector((state) => state.profile.profileSku);

    // -----------------------------------------------------------------------------
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const element = event.target
        if (element.checked) {
            console.log(element.value)
            dispatch(setNewSku(element.value))
        } else if (!element.checked && profileSku.length > 0) {
            dispatch(removeSku())
        }
    };
    // -----------------------------------------------------------------------------
    // this function will be called when the button is clicked
    function handleClick() {
        // if the checkboxRef is not null, we can access the value of the
        // checkbox using the current property of the ref
        if (checkboxRef.current) {
            setIsChecked(!checkboxRef.current.checked);
        }
    }
    // -----------------------------------------------------------------------------
    return (
        <div className='eby-sm-flex br-bttm'>
            <input
                ref={checkboxRef}
                type='checkbox'
                onChange={onChange}
                name={name}
                value={name + '::' + size}
            />
            <span className='width-flex-md' onClick={handleClick}>{name}</span>
            <span className='width-flex-sm'>Size: {size}</span>
            <span className='width-flex-sm'>{available} available</span>
        </div>
    );
}
export default Profile
