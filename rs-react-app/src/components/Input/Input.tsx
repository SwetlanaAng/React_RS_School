import { Component } from 'react';
interface InputProps {
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'search' | 'text';
  placeholder: string;
  value?: string;
  name: string;
  id: string;
}
class Input extends Component<InputProps> {
  render() {
    return (
      <>
        <input {...this.props} />
      </>
    );
  }
}

export default Input;
