import { configureStore } from '@reduxjs/toolkit'
import counterReducer, { increment } from './reducer'
import { createWrapper } from 'next-redux-wrapper'

const store = () => configureStore({
  reducer: {
    counter: counterReducer.reducer,
  },
});

store().dispatch(increment());

export const wrapper = createWrapper(store);
