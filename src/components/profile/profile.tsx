import React from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { mainProfileData } from "../../features/profile/profile-slice";
import useFetch from '../useFetch/useFetch';
import ListProfiles from './ListProfiles';
import {DataType} from '../../utilities/profileTypes';
/* -----------------------------------------------------------------
    All the title of the different profiles
  -----------------------------------------------------------------
*/
 function Profile() {
  const sheet = useAppSelector((state) => state.sheet);
  const dispatch = useAppDispatch();

  const { data, load, error } = useFetch();
  React.useEffect(() => {

    let k = 0
    if (!load) {
      let newData: any = Object.values(data)
      for (let pdp = 0; pdp < newData.length; pdp++) {

        for (let j = 0; j < newData[pdp].variants.length; j++) {
          if (newData[pdp].variants[j].title && newData[pdp].variants[j].sku) {

            let newField: DataType = {
              'id': k,
              'name': newData[pdp]['title'],
              'size': newData[pdp].variants[j].title,
              'sku': newData[pdp].variants[j].sku
            }
            dispatch(mainProfileData(newField))
            k++

          }
        }

      }
    }
  }, [data])
  return (
    <div className="Profile">
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
export default Profile;