import { Component } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import CardsBox from './components/CardsBox/CardsBox';
import type { AppState, Character } from './shared/types';
import { ApiService } from './services/apiService/apiService';
import Button from './components/Button/Button';
import Spinner from './components/Spinner/Spinner';

class App extends Component {
  apiService = new ApiService();
  state: AppState = {
    search: '',
    characters: [],
    error: false,
    loading: false,
  };
  componentDidUpdate(_: object, prevState: AppState): void {
    if (prevState.search !== this.state.search) {
      this.updateData();
    }
  }
  componentDidMount() {
    this.updateData();
  }
  onFormSubmit(string: string) {
    this.setState({ search: string });
  }
  updateData = () => {
    this.setState({ loading: true });
    this.apiService
      .getCharacters()
      .then((res: Character[]) => {
        this.setState({ characters: res });
      })
      .catch(() => {
        this.setState({ error: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };
  render() {
    return (
      <>
        <SearchForm
          loading={this.state.loading}
          onSubmit={this.onFormSubmit.bind(this)}
        />
        <main>
          {this.state.loading ? (
            <Spinner />
          ) : (
            <CardsBox characters={this.state.characters} />
          )}
        </main>
        <div className="flex justify-center">
          <Button
            type="button"
            className="rounded-xl border-2 border-teal-300 bg-purple-300 px-6 py-3 font-bold text-teal-700 
            shadow-md transition-colors duration-300 hover:bg-purple-700 hover:text-teal-300"
          >
            Error Button
          </Button>
        </div>
      </>
    );
  }
}

export default App;
