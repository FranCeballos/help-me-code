import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedNodeId: {
    name: undefined,
    level: undefined,
  },
};

export const adminSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    setSelectedNodeId: (state, action) => {
      const [level, name] = action.payload.split("_");
      state.selectedNodeId = { name, level };
    },
  },
});

export const { setSelectedNodeId } = adminSlice.actions;

export default adminSlice.reducer;
