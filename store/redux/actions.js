import { createAsyncThunk } from "@reduxjs/toolkit";

const mockError = new Error(new Error('Mock error'));

export const alsoIncrement = createAsyncThunk(
  "counter/alsoIncrement",
  async (error = false, { getState }) => {
      console.log('alsoIncrement');
    try {
        if (error) {
            throw mockError;
        }
        return await Promise.resolve(1);
    }
    catch (e) {
        return await Promise.reject(e);
    }
  }
);
