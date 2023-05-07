import type { FunctionComponent, FC} from 'react'
import React from 'react'

type Props = {}

const RandomFox = (): JSX.Element => {

  const image: string = "https://randomfox.ca/floof/"

  return <img src={image} />;
}

export { RandomFox }