import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTodo, setNewSku, removeSku } from "../../features/profile/profile-slice";
import { DataType } from '../../utilities/profileTypes';

function DrawApiList(props: DataType) {
  const { name, size, sizeId, id, sku }: DataType = props;
  // create a ref to store a reference to the checkbox element
  const checkboxRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const profileSku = useAppSelector((state) => state.profile.profileSku);
  const newTodos = useAppSelector((state) => state.profile.todos);
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

  };
  // -------------------------------------------------------------
  return (
    <div className='eby-sm-flex br-bttm'>

      <input
        ref={checkboxRef}
        type='checkbox'
        // checked={isChecked}
        onChange={onChange}
        name={String(id)}
        value={sku + '::' + sizeId}
      />
      <span className='width-flex-md' >{name}</span>
      <span className='width-flex-sm'>{sku}</span>
      <span className='width-flex-sm'>:: {sizeId}</span>
      {/* <span className='width-flex-sm'>{size}</span> */}
    </div>
  );
}

export default DrawApiList;