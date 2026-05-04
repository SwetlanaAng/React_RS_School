import { Component } from 'react';
import type { AppState } from '../../shared/types';
import Spinner from '../Spinner/Spinner';
import CardsBox from '../CardsBox/CardsBox';
type MainContentProps = Omit<AppState, 'searchFailed' | 'search' | 'error'>;
class MainContent extends Component<MainContentProps> {
  render() {
    const { loading, characters } = this.props;
    return <>{loading ? <Spinner /> : <CardsBox characters={characters} />}</>;
  }
}

export default MainContent;
