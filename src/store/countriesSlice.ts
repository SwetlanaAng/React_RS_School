import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../Shared/countries';
import type { RootState } from './rootState';

export interface CountriesState {
  countries: readonly string[];
}

const initialState: CountriesState = {
  countries: COUNTRIES,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const selectCountries = (state: RootState) => state.countries.countries;

export default countriesSlice.reducer;
