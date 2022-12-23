import React from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { mainProfileData } from "../../features/profile/profile-slice";
import useProduct from '../useFetch/useProducts';
import ListProfiles from './ListProfiles';
import { DataType } from '../../utilities/profileTypes';
/* -----------------------------------------------------------------
    All the title of the different profiles
  -----------------------------------------------------------------
*/

const url = 'https://api.join-eby.com/other/subcal/get_products.php'

function Profile() {
  const sheet = useAppSelector((state) => state.sheet);
  const dispatch = useAppDispatch();

  const { data, isLoading, error, request } = useProduct({ url, method: 'GET' });
  /*
    ****************************************************************
    id: counter,
    name: name of product
    size: size of pdp,
    sku: sku
    size: size id
    ****************************************************************
  */
  async function fetchProductShopify() {
    let k = 0
    let newData = await data.prodData
    console.log('profiles -> ', newData)
    for (let pdp = 0; pdp < newData.length; pdp++) {

      for (let j = 0; j < newData[pdp].variants.length; j++) {
        const checkKeys = (newData[pdp].variants[j].title && newData[pdp].variants[j].sku)
        if (checkKeys) {

          let newField: DataType = {
            'id': k,
            'name': newData[pdp]['title'],
            'size': newData[pdp].variants[j].title,
            'sku': newData[pdp].variants[j].sku,
            'sizeId': newData[pdp].variants[j].product_id
          }
          dispatch(mainProfileData(newField))
          k++

        }
      }
    }
  }
  React.useEffect(() => {
    console.log(isLoading)
    if (!isLoading)
      fetchProductShopify()
  }, [data, isLoading, error])

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="Profile">
      <div className="eby-wrapper">
        <div className="eby-container">
          {sheet && sheet.map((profile: any, i: number) =>
            <ListProfiles
              data={profile.name}
              pdps={profile.pdps}
              newProfile={profile.pdps2}
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