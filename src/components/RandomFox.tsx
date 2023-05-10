import type { FunctionComponent, FC } from 'react'
import React, { useRef } from 'react'

type RandomFoxProps = {
  image: string
}

const RandomFox = (props: RandomFoxProps): JSX.Element => {
  const {
    image
  } = props;

  const node = useRef<HTMLImageElement>(null);

  return <img ref={node} width={320} height={'auto'} className='rounded' src={image} />;
}

export { RandomFox }