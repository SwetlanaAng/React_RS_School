import Button from '../Button/Button';

interface FlyoutProps {
  charactersSelected: number;
}
export const Flyout = ({ charactersSelected }: FlyoutProps) => {
  return (
    <div>
      {`Selected characters : ${String(charactersSelected)}`}
      <div>
        <Button type="button">Clear all</Button>
        <Button type="button">Download</Button>
      </div>
    </div>
  );
};
