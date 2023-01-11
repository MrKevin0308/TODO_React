import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'
import { ICard } from '../../interface';
import { RootState } from '../store'

export const loadCard = createAsyncThunk(
  "app/loadCard",
  //@ts-ignore
  (card: ICard[]): {card: ICard[]} => {
    // Get all quests
    return {
      card: card
    };
  },
);

const initialState = {
  card: null,
};

export interface IAppSlice {
  card: ICard[];
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
      fetchAppSuccess(state: any, action: { payload: any; }) {
          setAll(state, action.payload);
      },
  },
  extraReducers: (builder: any) => {
      builder
        .addCase(loadCard.fulfilled, (state: any, action: { payload: any; }) => {
            setAll(state, action.payload);
        });
  },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, (app: any) => app);

const setAll = (state: any, properties: any) => {
  const props = Object.keys(properties);
  props.forEach(key => {
      state[key] = properties[key];
  });
};
