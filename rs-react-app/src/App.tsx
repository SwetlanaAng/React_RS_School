import { Component } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import CardsBox from './components/CardsBox/CardsBox';
import type { Character } from './shared/types';
import { ApiService } from './services/apiService/apiServise';

class App extends Component {
  apiService = new ApiService();
  state: {search:string, characters:Character[]} = {search:'', characters:[]}
  componentDidUpdate(_: object, prevState: Readonly<{search: string; characters: Character[]}>): void {
    if (prevState.search !== this.state.search){
      this.updateData();
    }
  }
  componentDidMount() {
    this.apiService.getCharacters().then((characters: Character[]) => {
      this.setState({ characters });
    });
  }
  onFormSubmit(string: string){
    this.setState({ search: string });
  }
  updateData = () => {
    this.apiService
      .getCharacters()
      .then((res: Character[]) => {
        this.setState({ characters: res });
      })
  };
  render() {
    return (
      <>
        <SearchForm onSubmit={this.onFormSubmit.bind(this)}/>
        <main><CardsBox characters={this.state.characters} /></main>
        
      </>
    );
  }
}

export default App;
