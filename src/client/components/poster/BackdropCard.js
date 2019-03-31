import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../layout/ImageLoader';
import { downloadFileUrl } from '../../helpers/helperFunctions';

/* eslint camelcase: 0 */
const BackdropCard = (props) => {
  const [isDownloading, setIfDownloading] = useState(false);
  const { file_path } = props.backdrop;
  const tmdbPosterPath = 'https://image.tmdb.org/t/p/w500_and_h282_face/';
  const tmdbPosterBase = 'https://image.tmdb.org/t/p/original';

  const download = () => {
    setIfDownloading(true);

    try {
      downloadFileUrl(`${tmdbPosterBase + file_path}`, () => {
        setIfDownloading(false);
      });
    } catch (e) {
      console.log('Cannot download file ', e);
      setIfDownloading(false);
    }
  };

  return (
    <div className="card backdrop__card">
      <div className="card__image">
        <LazyLoad 
            debounce={false}
            offsetVertical={500}
        >
          <ImageLoader 
              src={file_path ? `${tmdbPosterPath + file_path}` : '/images/img-placeholder.jpg'} 
            />
        </LazyLoad>
      </div>
      <div className="card__details poster__details">
        <button 
            className="button--link poster__download m-auto"
            disabled={isDownloading}
            onClick={download}
        >
          {isDownloading ? 'Downloading, Please wait' : 'Download'}
        </button>
      </div>
    </div>
  );
};

BackdropCard.propTypes = {
  backdrop: PropTypes.shape({
    file_path: PropTypes.string
  })
};

export default BackdropCard;
