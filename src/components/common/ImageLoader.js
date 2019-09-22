import React, { useState } from 'react';


const ImageLoader = (props) => {
  const _loaded = {};
  const [loaded, setLoaded] = useState(_loaded[props.src]);

  const onLoad = () => {
    _loaded[props.src] = true;
    setLoaded(true);
  };

  return (
    <img 
        className={`${props.className} ${loaded ? props.loadedClassName : props.loadingClassName}`} 
        data-key={props.imgId}
        onLoad={onLoad} 
        src={props.src} 
    />   
  );
};

ImageLoader.defaultProps = {
  className: '',
  loadingClassName: 'img-loading',
  loadedClassName: 'img-loaded'
};

export default ImageLoader;
