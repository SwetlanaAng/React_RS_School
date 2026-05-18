interface InputProps {
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'search' | 'text';
  placeholder: string;
  value?: string;
  name: string;
  id: string;
}
export default function Input(props: InputProps) {
  return (
    <>
      <input {...props} />
    </>
  );
}
