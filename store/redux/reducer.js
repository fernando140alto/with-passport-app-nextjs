import { createSlice } from "@reduxjs/toolkit";
import { alsoIncrement } from "./actions";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
      state.error = false;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(alsoIncrement.fulfilled, (state, action) => {
      console.log("alsoIncrement.fulfilled");
      state.value += action.payload;
      state.error = false;
    });
    builder.addCase(alsoIncrement.rejected, (state, action) => {
        console.log("alsoIncrement.rejected");
        state.error = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice;
