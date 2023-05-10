import type { FunctionComponent, FC, ImgHTMLAttributes } from 'react'
import React, { useRef, useEffect, useState} from 'react'

type LazyImageProps = {
  src: string,
  onLazyLoad?: (img: HTMLImageElement) => void
}

type ImageNativeTypes = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImageProps & ImageNativeTypes

const LazyImage = (props: Props): JSX.Element => {
  const {
    src,
    onLazyLoad,
    ...moreProps
  } = props;

  const node = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || !node.current) {
          return;
        }

        setCurrentSrc(src);

        if (typeof onLazyLoad === 'function') {
          onLazyLoad(node.current);
        }
      })
    })

    if (node.current) {
      observer.observe(node.current);
    }
    return () => {
      observer.disconnect();
    }
  }, [src])

  return (
    <img
      ref={node}
      onLoad={() => onLazyLoad(node)}
      src={currentSrc}
      { ...moreProps }
    />
  );
}

export { LazyImage }