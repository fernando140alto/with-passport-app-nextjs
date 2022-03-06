import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducer'
import { createWrapper } from 'next-redux-wrapper'

const store = () => configureStore({
  reducer: {
    counter: counterReducer.reducer,
  },
})

export const wrapper = createWrapper(store);

// export default function (preloadedState) {
//   return configureStore({
//     reducer: { counter: counterReducer.reducer },
//     preloadedState,
//   })
// }
