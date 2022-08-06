import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount } from './counterSlice';

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const amount = 23;
  return (
    <div>
      <span
        style={{
          color: '#f8f9fa',
          textShadow: '2px 2px #851bed',
        }}
      >
        {count}
      </span>
      <div>
        <button
          className="btn btn-info border me-1"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="btn btn-info border me-1"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className="btn btn-info border me-1"
          aria-label="Decrement value"
          onClick={() => dispatch(incrementByAmount(amount))}
        >
          by {amount}
        </button>
      </div>
    </div>
  );
}
