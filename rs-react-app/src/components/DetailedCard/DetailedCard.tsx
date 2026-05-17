import InfoSpan from '../InfoSpan/InfoSpan';
interface DetailedCardProps {
  name: string;
  gender: string;
  species: string;
  status: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
}
export default function DetailedCard({
  name,
  gender,
  species,
  status,
  image,
  location,
}: DetailedCardProps) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border-2 border-purple-200">
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4 text-center">
        <div className="font-bold w-[300px] text-xl mb-2">{name}</div>
      </div>
      <div className="px-3 py-2 text-center">
        <div className="w-[300px] text-m mb-2">{location.name}</div>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-center items-center">
        <InfoSpan text={gender} />
        <InfoSpan text={species} />
        <InfoSpan text={status} />
      </div>
    </div>
  );
}
