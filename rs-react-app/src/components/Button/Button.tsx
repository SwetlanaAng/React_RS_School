import { Component } from 'react';
interface ButtonProps {
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type: 'submit' | 'button';
}
class Button extends Component<ButtonProps> {
  render() {
    return <button {...this.props}>{this.props.children}</button>;
  }
}

export default Button;
