import { Component } from 'react';
interface CardProps {
  name: string;
  gender: string;
  species: string;
  status: string;
  image: string;
}
class Card extends Component<CardProps> {
  render() {
    const { name, gender, species, status, image } = this.props;
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg border-2 border-purple-200">
        <img className="w-full" src={image} alt={name} />
        <div className="px-6 py-4 text-center">
          <div className="font-bold text-xl mb-2">{name}</div>
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-center items-center">
          <span className="inline-block bg-purple-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {gender}
          </span>
          <span className="inline-block bg-purple-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {species}
          </span>
          <span className="inline-block bg-purple-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {status}
          </span>
        </div>
      </div>
    );
  }
}

export default Card;
