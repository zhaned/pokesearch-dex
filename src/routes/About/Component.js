import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/';
import { getTest } from './aboutSlice';

export default function Component() {
  const dispatch = useDispatch();
  const test = useSelector((state) => state.about.list);
  console.log('test', test);
  // console.log('get test', getTest);
  // console.log('dispatch', dispatch(getTest()));
  useEffect(() => {
    dispatch(getTest());
  }, [dispatch]);

  return (
    <div
      style={{
        color: '#f8f9fa',
        textShadow: '2px 2px #851bed',
      }}
    >
        {test[234].name}
      
    </div>
  );
}
