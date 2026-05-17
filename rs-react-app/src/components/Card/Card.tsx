import { useSearchParams } from 'react-router';
import InfoSpan from '../InfoSpan/InfoSpan';
interface CardProps {
  name: string;
  gender: string;
  species: string;
  status: string;
  image: string;
  id: number;
}
export default function Card({
  name,
  gender,
  species,
  status,
  image,
  id,
}: CardProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div
      onClick={() => {
        const currentSearch = searchParams.get('name');
        const currentPage = searchParams.get('page');
        if (currentSearch && currentPage) {
          setSearchParams({
            name: currentSearch,
            page: currentPage,
            details: String(id),
          });
        } else if (currentPage) {
          setSearchParams({
            page: currentPage,
            details: String(id),
          });
        }
      }}
      className="max-w-sm h-[500px] rounded overflow-hidden shadow-lg border-2 border-purple-200"
    >
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4 text-center">
        <div className="font-bold w-[300px] text-xl mb-2">{name}</div>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-center items-center">
        <InfoSpan text={gender} />
        <InfoSpan text={species} />
        <InfoSpan text={status} />
      </div>
    </div>
  );
}
