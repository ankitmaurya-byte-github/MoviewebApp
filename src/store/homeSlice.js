import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  url:{},
  genres:{}
};

const sliceName = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    getApiConfiguration: (state, action) => {
        state.url=action.payload
    },
    getGenres: (state, action) => {
        state.genres=action.payload
    },
  },
});

export const { getApiConfiguration,getGenres} = sliceName.actions;
export default sliceName.reducer;
