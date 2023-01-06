import React, { useEffect, useState } from 'react';

interface Props {
  uri: string;
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  body?: any;
}

interface ReturnValue {
  data: any | null;
  setData: any;
  error: Error | null;
  isLoading: boolean;
  request: () => void;
}

const url = 'http://localhost:3001';

function useFetch(props: Props): ReturnValue {
  const { uri, method = 'GET', body = null } = props;
  const [data, setData] = useState<any | null>(null);
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
      console.log('url -----------')
      console.log(url, uri)
      const response = await fetch(url+uri, options);
      const data = await response.json();
      console.log('data -> ', data)
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

  return { data, setData, error, isLoading, request };
}

export default useFetch;