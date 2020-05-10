import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../common/ImageLoader';
import { downloadFileUrl } from 'helpers/helperFunctions';

/* eslint camelcase: 0 */
const BackdropCard = (props) => {
  const [isDownloading, setIfDownloading] = useState(false);
  const { file_path } = props.backdrop;
  const tmdbPosterPath = 'https://image.tmdb.org/t/p/w500_and_h282_face/';
  const tmdbPosterBase = 'https://image.tmdb.org/t/p/original';

  const download = () => {
    setIfDownloading(true);

    downloadFileUrl(`${tmdbPosterBase + file_path}`)
      .then(() => setIfDownloading(false))
      .catch((e) => {
        setIfDownloading(false);
        console.log(e);
      });
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
            className="button--muted poster__download"
            disabled={isDownloading}
            onClick={download}
        >
          {isDownloading ? 'Downloading...' : 'Download'}
          <i className="fa fa-download" />
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
