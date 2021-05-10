import React, { useState, useEffect } from 'react';

export const useFetch = url => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        console.dir(res)
        const result = await res.json();
        console.log(result)
  
        if(res.ok) {
          setData(result);
          setError(null)
        } else {
          throw result;
        }
      } catch (error) {
        setError(error)
      }
    };

    fetchData();
  }, []);

  return { data, error };
};