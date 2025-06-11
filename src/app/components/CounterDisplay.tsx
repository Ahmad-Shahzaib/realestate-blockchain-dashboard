'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { increment, decrement } from '@/redux/reducers/counterSlice';

const CounterDisplay: React.FC = () => {
    const dispatch = useDispatch();
    const count = useSelector((state: RootState) => state.counter.value);

    return (
        <div className="p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold">Counter Value</h2>
            <p className="text-3xl mt-2">{count}</p>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={() => dispatch(increment())}
            >
                Increment
            </button>
            <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </button>
        </div>
    );
};

export default CounterDisplay;