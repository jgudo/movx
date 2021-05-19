import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @ts-ignore
import LazyLoad from 'react-lazy-load';
import ImageLoader from '@app/components/common/Loader/ImageLoader';
import { TMDB_POSTER_PATH, TMDB_POSTER_BASE } from '@app/constants/actionType';
import { downloadFileUrl } from '@app/helpers/helperFunctions';
import { IImage } from '@app/types/types';

interface IProps {
  poster: IImage;
}

const PosterCard: React.FC<IProps> = ({ poster }) => {
  const [isDownloading, setIfDownloading] = useState(false);
  const { file_path } = poster;

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

export default PosterCard;
