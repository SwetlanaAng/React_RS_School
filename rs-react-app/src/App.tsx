import { Component } from 'react';
import Button from './components/Button/Button';

class App extends Component {
  render() {
    return (
      <Button
        onClick={() => {}}
        type="button"
        className="border-2 bg-yellow-300 border-purple-700 text-purple-700 
        transition-colors duration-300 hover:text-yellow-300
       hover:bg-purple-700 font-bold py-2 px-4 rounded"
      >
        Click me
      </Button>
    );
  }
}

export default App;
