import InfoSpan from '../InfoSpan/InfoSpan';
interface DetailedCardProps {
  name: string;
  gender: string;
  species: string;
  status: string;
  image: string;
  onClose: () => void;
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
  onClose,
  location,
}: DetailedCardProps) {
  return (
    <div className="relative max-w-sm overflow-hidden rounded border-2 border-purple-200 shadow-lg">
      <button
        type="button"
        aria-label="Close details"
        onClick={onClose}
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-purple-700 shadow-md transition-colors hover:bg-purple-200"
      >
        ×
      </button>
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
