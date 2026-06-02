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
    <div className="relative w-full overflow-hidden rounded border-2 border-purple-200 bg-white dark:border-teal-800  text-teal-900 shadow-lg transition-colors duration-300 dark:border-purple-800 dark:bg-slate-900 dark:text-teal-50 dark:shadow-purple-950 sm:max-w-sm">
      <button
        type="button"
        aria-label="Close details"
        onClick={onClose}
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-purple-700 shadow-md transition-colors hover:bg-purple-200 dark:bg-slate-950/90 dark:text-fuchsia-200 dark:hover:bg-purple-900"
      >
        ×
      </button>
      <img className="w-full" src={image} alt={name} />
      <div className="px-2 py-3 text-center sm:px-6 sm:py-4">
        <div className="mb-2 text-sm font-bold sm:w-[300px] sm:text-xl">
          {name}
        </div>
      </div>
      <div className="px-2 py-2 text-center sm:px-3">
        <div className="mb-2 text-xs sm:w-[300px] sm:text-base">
          {location.name}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center px-2 pt-3 pb-2 sm:px-6 sm:pt-4">
        <InfoSpan text={gender} />
        <InfoSpan text={species} />
        <InfoSpan text={status} />
      </div>
    </div>
  );
}
