import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../common/ImageLoader';
import { TMDB_POSTER_PATH, TMDB_POSTER_BASE } from 'constants/constants';
import { downloadFileUrl } from 'helpers/helperFunctions';

/* eslint-disable */
const PosterCard = (props) => {
  const [isDownloading, setIfDownloading] = useState(false);
  const { file_path } = props.poster;

  const download = () => {
    setIfDownloading(true);

    downloadFileUrl(`${TMDB_POSTER_BASE + file_path}`)
      .then(() => setIfDownloading(false))
      .catch((e) => {
        setIfDownloading(false);
        console.log(e);
      });
  };

  return (
    <div className="card poster__card">
      <div className="card__image">
        <LazyLoad 
            debounce={false}
            offsetVertical={500}
          >
            <ImageLoader 
                src={file_path ? `${TMDB_POSTER_PATH + file_path}` : '/images/img-placeholder.jpg'} 
            />
        </LazyLoad>
      </div>
      <div className="card__details poster__details">
        <button 
            className="button--muted poster__download"
            onClick={download}
            disabled={isDownloading}
        >
          {isDownloading ? 'Downloading...' : 'Download'}
          <i className="fa fa-download" />
        </button>
      </div>
    </div>
  );
}

PosterCard.propTypes = {
  poster: PropTypes.shape({
    file_path: PropTypes.string
  })
};

export default PosterCard;
