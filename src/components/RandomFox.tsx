import type { FunctionComponent, FC } from 'react'
import React, { useState } from 'react'

type RandomFoxProps = {
  image: string
}

const RandomFox = (props: RandomFoxProps): JSX.Element => {
  const {
    image
  } = props;

  return <img width={320} height={'auto'} className='rounded' src={image} />;
}

export { RandomFox }