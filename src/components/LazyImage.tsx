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
  const [isLazyLoaded, setIsLazyLoaded] = useState(false);
  useEffect(() => {
    if (isLazyLoaded) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || !node.current) {
          return;
        }

        // Una vez renderizado, se desconecta el observador
        setCurrentSrc(src);
        observer.disconnect();
        setIsLazyLoaded(true);

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
  }, [src, onLazyLoad, isLazyLoaded])

  return (
    <img
      ref={node}
      src={currentSrc}
      { ...moreProps }
    />
  );
}

export { LazyImage }