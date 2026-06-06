import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../Shared/countries';

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

export const selectCountries = (state: { countries: CountriesState }) =>
  state.countries.countries;

export default countriesSlice.reducer;
