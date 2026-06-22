import type { ImgHTMLAttributes } from 'react';

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
};

export default function Image({ fill, priority, alt = '', ...props }: ImageProps) {
  void fill;
  void priority;

  return <img alt={alt} {...props} />;
}
