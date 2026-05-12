import type { AppState } from '../../shared/types';
import Spinner from '../Spinner/Spinner';
import CardsBox from '../CardsBox/CardsBox';
type MainContentProps = Omit<AppState, 'searchFailed' | 'search' | 'error'>;
export function MainContent({ loading, characters }: MainContentProps) {
  return <>{loading ? <Spinner /> : <CardsBox characters={characters} />}</>;
}

export default MainContent;
