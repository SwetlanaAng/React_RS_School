import type countriesReducer from './countriesSlice';
import type currentFormReducer from './currentFormSlice';
import type submissionsReducer from './submissionsSlice';

export interface RootState {
  currentForm: ReturnType<typeof currentFormReducer>;
  countries: ReturnType<typeof countriesReducer>;
  submissions: ReturnType<typeof submissionsReducer>;
}
