import { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { storageService } from '../../services/storageService/storageService';
interface SearchFormProps {
  className?: string;
  onSubmit: (string: string) => void;
}
class SearchForm extends Component<SearchFormProps> {
  private storageService = new storageService();
  state = {
    search: storageService.getSearch(),
  };

  render() {
    const { onSubmit } = this.props;
    return (
      <div className="flex items-center justify-center px-4 my-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const search = String(formData.get('search')).trim();
            this.setState({ search });
            this.storageService.saveSearch(search);
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
                this.setState({ search: event.target.value });
              }}
              type="search"
              value={this.state.search ?? ''}
              placeholder="Search..."
              name="search"
              id="search"
            />
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
          </div>
          <Button
            type="submit"
            className="rounded-xl border-2 border-teal-300 bg-purple-300 px-6 py-3 font-bold text-teal-700 
            shadow-md transition-colors duration-300 hover:bg-purple-700 hover:text-teal-300"
          >
            Click me
          </Button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
