import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducer'

// const store = configureStore({
//   reducer: {
//     counter: counterReducer.reducer,
//   },
// })

// export default store;


export default function (preloadedState) {
  return configureStore({
    reducer: { counter: counterReducer.reducer },
    preloadedState,
  })
}
