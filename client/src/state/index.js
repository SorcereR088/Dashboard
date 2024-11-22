import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user_id: 1,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

// Correct export for actions
export const { setMode } = globalSlice.actions;

// Correct export for reducer
export default globalSlice.reducer; // Fix: `reducer` (not `reducers`)
