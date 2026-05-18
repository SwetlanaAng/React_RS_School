import { useSearchParams } from 'react-router';
interface CardProps {
  name: string;
  image: string;
  id: number;
}
export default function Card({ name, image, id }: CardProps) {
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
        } else {
          setSearchParams({
            page: currentPage ?? '1',
            details: String(id),
          });
        }
      }}
      className="h-60 w-32 overflow-hidden rounded border-2 border-purple-200 shadow-lg sm:h-[450px] sm:w-auto sm:max-w-sm"
    >
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4 text-center">
        <div className="mb-2 text-sm font-bold sm:w-[300px] sm:text-xl">
          {name}
        </div>
      </div>
    </div>
  );
}
