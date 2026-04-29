import { Component } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import type { AppState, Character } from './shared/types';
import { ApiService } from './services/apiService/apiService';
import Button from './components/Button/Button';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import MainContent from './components/MainContent/MainContent';
import { storageService } from './services/storageService/storageService';
import ErrorUI from './components/ErrorUI/ErrorUI';

class App extends Component {
  apiService = new ApiService();
  state: AppState = {
    search: '',
    characters: [],
    error: false,
    loading: false,
    searchFailed: false,
  };
  storageService = new storageService();
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
    this.storageService.saveSearch(string);
  }
  updateData = () => {
    this.setState({ loading: true });
    this.apiService
      .getCharacters()
      .then((res: Character[]) => {
        this.setState({ characters: res });
        this.setState({ searchFailed: false });
      })
      .catch(() => {
        this.setState({ searchFailed: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };
  render() {
    return (
      <>
        <ErrorBoundary errorSwitcher={this.setState.bind(this)}>
          <SearchForm
            error={this.state.error}
            loading={this.state.loading}
            onSubmit={this.onFormSubmit.bind(this)}
          />
          <main>
            {this.state.searchFailed ? (
              <ErrorUI errorMessage="There is no matching characters"></ErrorUI>
            ) : (
              <MainContent
                loading={this.state.loading}
                characters={this.state.characters}
              ></MainContent>
            )}
          </main>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                this.setState({ error: true });
              }}
              type="button"
              className="mb-6"
            >
              Error Button
            </Button>
          </div>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
