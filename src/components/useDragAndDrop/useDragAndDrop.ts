import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setDraggedItem, setItemsDragged } from '../../features/sheet/sheet-slice';

interface Item {
  id: string;
  name: string;
}

interface Capsule {
  id: string;
  profiles: Item[];
}


interface DragAndDropHook {
  profileItems: Item[];
  itemIndex: number;
  setItemIndex: React.Dispatch<React.SetStateAction<number>>;
  handleDragStart: (e: React.DragEvent<HTMLLIElement>, index: number, id: number) => void;
  handleDragOver: (index: number, id: number) => void;
}


function useDragAndDrop(): DragAndDropHook {
  const [itemIndex, setItemIndex] = useState(0);
  // const [draggedItem, setDraggedItem2] = useState<Item | null>(null);
  /*
    ****************************************************************
    * Drag Starts by finding only the array we need to modify
    ****************************************************************
  */
  const profileItems = useAppSelector((state) => state.sheet[itemIndex].pdps2)
  const draggedItem = useAppSelector((state) => state.sheet[itemIndex].draggedItem)
  const dispatch = useAppDispatch();

  function handleDragStart(e: React.DragEvent<HTMLLIElement>, index: number, id: number) {
    // get id of the card we want to modify
    console.log('almost there man you got it')
    console.log(profileItems, itemIndex)
    console.log('---   ---')
    console.log('    >    ', index)
    console.log('  -____- ')
    console.log(profileItems[index])

    dispatch(setDraggedItem({ obj: profileItems[index], objId: itemIndex }))
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(index: number, id: number) {

    const draggedOverItem = profileItems[index];
    console.log('drag over -> ', draggedOverItem)
    // If the item is dragged over itself, ignore
    console.log('new item --------- >>>>')
    console.log(profileItems, draggedItem)
    if (draggedItem === draggedOverItem) {
      return;
    }

    // Filter out the currently dragged item
    let newItems = profileItems.filter(item => item !== draggedItem);

    // Add the dragged item back into the list at the correct index
    if (draggedItem) {
      newItems.splice(index, 0, draggedItem);
      dispatch(setItemsDragged({ obj: newItems, objId: itemIndex }));
    }
  }

  function handleDragEnd() {
    dispatch(setDraggedItem({ obj: null, objId: itemIndex }));
  }

  useEffect(() => {
    function handleDrop(e: DragEvent) {
      e.preventDefault();
      dispatch(setDraggedItem({ obj: null, objId: itemIndex }));
    }

    window.addEventListener('drop', handleDrop);
    window.addEventListener('dragend', handleDragEnd);

    return () => {
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragend', handleDragEnd);
    };
  }, []);
  // console.log('items-> ', items)
  return { profileItems, itemIndex, setItemIndex, handleDragStart, handleDragOver };
}


export default useDragAndDrop;