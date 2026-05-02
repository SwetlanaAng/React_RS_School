import { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import searchSVG from '../../assets/search.svg';
export interface SearchFormProps {
  className?: string;
  onSubmit: (string: string) => void;
  loading?: boolean;
  error: boolean;
  search: string;
}
class SearchForm extends Component<SearchFormProps> {
  state = { inputValue: this.props.search ?? '' };
  render() {
    if (this.props.error) {
      throw new Error('ErrorBoundary test error');
    }
    const { onSubmit } = this.props;
    return (
      <div className="flex items-center justify-center px-4 my-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const search = String(formData.get('search')).trim();
            onSubmit(search);
          }}
          className={`flex w-full max-w-xl items-center gap-5 rounded-2xl 
            border border-teal-200 bg-white p-6 shadow-lg shadow-teal-100 ${this.props.className ?? ''}`}
        >
          <div className="relative flex-1">
            <Input
              className="w-full rounded-xl border-2 border-teal-300 bg-fuchsia-50 py-3 pl-11 pr-4
               text-teal-700 outline-none transition-colors duration-300 placeholder:text-teal-300 
               focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ inputValue: event.target.value });
              }}
              type="search"
              value={this.state.inputValue}
              placeholder="Search..."
              name="search"
              id="search"
            />
            <img
              src={searchSVG}
              alt="spinner"
              className="block pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-400"
            />
          </div>
          <Button type="submit" loading={this.props.loading}>
            Search
          </Button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
