import { Component } from 'react';
interface ButtonProps {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
  type: 'submit' | 'button';
}
class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return <button {...this.props}>{this.props.children}</button>;
  }
}

export default Button;
