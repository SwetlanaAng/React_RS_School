import { Component } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import Card from './components/Card/Card';

class App extends Component {
  render() {
    return <><SearchForm />
    <Card name="Rick Sanchez" gender="Male" species="Human" status="Alive" img="https://rickandmortyapi.com/api/character/2" />
    </> 
  }
}

export default App;
