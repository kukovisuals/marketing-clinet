import React from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { mainProfileData } from "../../features/profile/profile-slice";
import useProduct from '../useFetch/useProducts';
import ListProfiles from './ListProfiles';
import { DataType } from '../../utilities/profileTypes';

import './Profile.css'
/*
  ******************************************************************
  *         All the title of the different profiles                *
  ******************************************************************
*/

function Profile() {
  const sheet = useAppSelector((state) => state.sheet);
  const dispatch = useAppDispatch();

  const url = 'https://api.join-eby.com/other/subcal/get_products.php';
  const { data, isLoading, error, request } = useProduct({ url, method: 'GET' });
  /*
    ****************************************************************
    *                   profile.mainData                           *
    *  id: counter,                                                *
    *  name: name of product                                       *
    *  size: size of pdp,                                          *
    *  sku: sku                                                    *
    *  size: size id                                               *
    ****************************************************************
  */
  async function fetchProductShopify() {
    let k = 0
    if (typeof data == 'object' && data != null) {

      let newData = await data.prodData
      console.log('profiles -> ', newData)
      for (let pdp = 0; pdp < newData.length; pdp++) {

        const productVariants = newData[pdp].variants
        for (let j = 0; j < productVariants.length; j++) {

          const checkKeys = (productVariants[j].title && productVariants[j].sku)
          if (checkKeys) {

            let newField: DataType = {
              'id': k,
              'name': newData[pdp]['title'],
              'size': productVariants[j].title,
              'sku': productVariants[j].sku,
              'sizeId': String(productVariants[j].product_id)
            }
            dispatch(mainProfileData(newField))
            k++
          }
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
    return (
      <div className='spinner-wrapper'>
        <div className="spinner">
          <div className='spinner-p'>
            <p>Loading All product SKUs</p>
            <p>One Moment Please...</p>
          </div>
          <div className='spinner-inner'></div>
        </div>
      </div>
    );
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