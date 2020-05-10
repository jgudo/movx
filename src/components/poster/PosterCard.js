import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../common/ImageLoader';
import { downloadFileUrl } from 'helpers/helperFunctions';

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w185_and_h278_face/';
const tmdbPosterBase = 'https://image.tmdb.org/t/p/original';

/* eslint-disable */
const PosterCard = (props) => {
  const [isDownloading, setIfDownloading] = useState(false);
  const { file_path } = props.poster;

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
    <div className="card poster__card">
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
