import { useSearchParams } from 'react-router';
interface CardProps {
  name: string;
  image: string;
  id: number;
  setChosenCharacter: React.Dispatch<React.SetStateAction<number | null>>;
}
export default function Card({
  name,
  image,
  id,
  setChosenCharacter,
}: CardProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
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
        setChosenCharacter(id);
      }}
      className="max-w-sm h-[450px] rounded overflow-hidden shadow-lg border-2 border-purple-200"
    >
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4 text-center">
        <div className="font-bold w-[300px] text-xl mb-2">{name}</div>
      </div>
    </div>
  );
}
