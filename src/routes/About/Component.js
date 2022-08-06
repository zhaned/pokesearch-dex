import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/';
import { getPokemon } from '../Homepage/homepageSlice';

export default function Component() {
  const dispatch = useDispatch();
  const test = useSelector((state) => state.about.list);
  console.log('test', test);

  useEffect(() => {
    dispatch(getPokemon());
  }, [dispatch]);

  return (
    <div
      style={{
        color: '#f8f9fa',
        textShadow: '2px 2px #851bed',
      }}
    >
      
    </div>
  );
}
