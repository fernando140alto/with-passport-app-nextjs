import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducer'

const store = configureStore({
  reducer: {
    counter: counterReducer.reducer,
  },
  preloadedState: {
    counter: {
       value: 10
    }
  },
})

export default store;
