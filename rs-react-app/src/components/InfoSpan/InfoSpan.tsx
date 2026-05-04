import { Component } from 'react';
interface InfoSpanProps {
  text: string;
}
class InfoSpan extends Component<InfoSpanProps> {
  render() {
    return (
      <span className="inline-block bg-purple-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        {this.props.text}
      </span>
    );
  }
}

export default InfoSpan;
