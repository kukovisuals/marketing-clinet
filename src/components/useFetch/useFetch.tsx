import React, { useEffect, useState } from 'react';

interface FetchType{
    url:string
}
type MyType<T> = {
    [key in keyof T]: T[key]
  }
const url = 'http://localhost:5173/products.json'

function useFetch()  {
  const [data, setData] = useState<any>();
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
    
  useEffect(() => {
    fetch(url)
        .then(response => response.json())
        .then(data => setData(data.products))
        .then((data) => setLoad(false))
        .catch(error => setError('Fetch Error -> ' + error))

  }, []);

  return {data, load, error}
};

export default useFetch;