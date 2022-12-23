import React, { useEffect, useState } from 'react';

interface Data {
  // define the shape of your data here
  [index: string]: any;
}

interface Props {
  url: string;
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  body?: any;
}

interface ReturnValue {
  data: any | null;
  error: Error | null;
  isLoading: boolean;
  request: () => void;
}


function useFetch(props: Props): ReturnValue {
  const { url, method = 'GET', body = null } = props;
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function request() {
    setIsLoading(true);
    try {
      const options = { method, body, headers: {} };
      if (body) {
        options.body = JSON.stringify(body);
        options.headers = {
          'Content-Type': 'application/json',
        };
      }
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log(data)
      setData(data);
    } catch (error) {
      if (error instanceof Error)
        setError(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    request();
  }, [method, body]);

  return { data, error, isLoading, request };
}

export default useFetch;