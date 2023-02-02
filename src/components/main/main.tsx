import React from 'react';
import Selection from './selection/selection';
import PdpSheet from './pdpSheet/pdpSheet';
import useFetch from '../useFetch/useFetch';
import { useAppDispatch } from '../../app/hooks';
// import { initObject } from "../../features/month/month-slice";
import { initObject, restartMonth } from "../../features/month/month-slice";
import { setCurrentMonth } from '../../features/profile/profile-slice';
import './main.css';

function Main() {
  const [year, month] = formatDay()
  const mvid = `${year}-${month}`

  const uri = `/api/monthViews/${mvid}`
  const { data, isLoading, error } = useFetch({ uri, method: 'GET' });

  const dispatch = useAppDispatch()

  dispatch(setCurrentMonth(mvid))
  /* 
    -----------------------------------------------------------------
    -               Add each card from the database                 -
    -----------------------------------------------------------------
  */
  const retrieveMonth = async () => {

    if (typeof data == 'object' && data != null) {
      const newMonth = await data[0].profiles
      console.log('main => ', data[0].profiles)
      dispatch(restartMonth())
      for (let i = 0; i < newMonth.length; i++) {
        
          dispatch(initObject({ id: i, name: newMonth[i] }))
      }
      // for (let i = 0; i < newMonth.length; i++) {
      //   await dispatch(initObject({ id: i, name: newMonth[i] }))
      // }
    }
  }
  React.useEffect(() => {
    if (!isLoading) {
      retrieveMonth()
    }
  }, [isLoading])

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="Main">
      <Selection />
      <PdpSheet />
    </div>
  )
}

function formatDay() {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  console.log(mm)
  return [yyyy, mm];
}

export default Main
