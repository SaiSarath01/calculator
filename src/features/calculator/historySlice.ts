import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  allHistory: [],
};

export const calculatorSlice = createSlice({
  initialState: initialState,
  name: "calculator",
  reducers: {
    updateHistory(state, action: PayloadAction<object>) {
      console.log(action);
      const currentHistory = [...state.allHistory];
      currentHistory.push(action.payload);
      state.allHistory = [...currentHistory];
      console.log(state.allHistory);
    },
  },
});

export const { updateHistory } = calculatorSlice.actions;

export default calculatorSlice.reducer;
