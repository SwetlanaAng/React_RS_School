import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import type { AppDispatch } from '../../store/store';
import { clearAllSelected } from '../../store/charactersSlice';

interface FlyoutProps {
  charactersSelected: number;
}
export const Flyout = ({ charactersSelected }: FlyoutProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    dispatch(clearAllSelected());
  };
  return (
    <div className="sticky bottom-0 left-0 z-50 flex w-full items-center justify-between gap-4 bg-teal-200/50 px-6 py-4 shadow-lg backdrop-blur-sm dark:bg-slate-900/80">
      <span className="font-semibold">
        {`Selected characters : ${String(charactersSelected)}`}
      </span>
      <div className="flex gap-3">
        <Button type="button" onClick={handleClick}>
          Unselect all
        </Button>
        <Button type="button">Download</Button>
      </div>
    </div>
  );
};
