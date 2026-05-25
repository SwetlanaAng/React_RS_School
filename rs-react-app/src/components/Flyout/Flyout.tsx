import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import type { AppDispatch, RootState } from '../../store/store';
import { clearAllSelected } from '../../store/charactersSlice';
import { useDownload } from '../../hooks/useDownload';

export const Flyout = () => {
  const charactersSelected = useSelector(
    (state: RootState) => state.characters.selected
  );
  const { download } = useDownload();
  const dispatch = useDispatch<AppDispatch>();
  const handleUnselectClick = () => {
    dispatch(clearAllSelected());
  };
  if (charactersSelected.length === 0) return null;
  return (
    <div className="sticky bottom-0 left-0 z-50 flex w-full items-center justify-between gap-4 bg-teal-200/50 px-6 py-4 shadow-lg backdrop-blur-sm dark:bg-slate-900/80">
      <span className="font-semibold dark:text-teal-50">
        {`Selected characters : ${String(charactersSelected.length)}`}
      </span>
      <div className="flex gap-3">
        <Button type="button" onClick={handleUnselectClick}>
          Unselect all
        </Button>
        <Button
          type="button"
          onClick={() => {
            download(charactersSelected, charactersSelected.length);
          }}
        >
          Download
        </Button>
      </div>
    </div>
  );
};
