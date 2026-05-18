import type { AppState } from '../../shared/types';
import Spinner from '../Spinner/Spinner';
import CardsBox from '../CardsBox/CardsBox';
type MainContentProps = Omit<AppState, 'searchFailed' | 'search' | 'error'>;
export function MainContent({ loading, characters }: MainContentProps) {
  return (
    <section className="min-w-0 flex-1">
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <CardsBox characters={characters} />
      )}
    </section>
  );
}
