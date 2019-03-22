import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../layout/ImageLoader';

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w185_and_h278_face/';
const tmdbPosterBase = 'https://image.tmdb.org/t/p/original';

/* eslint-disable */
const PosterCard = (props) => {
  const { file_path } = props.poster;

  const download = () => {
    return axios
    .get(`${tmdbPosterBase + file_path}`, {
      responseType: 'blob'
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'poster.jpg');
      document.body.appendChild(link);
      link.click();
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
            className="button--link poster__download m-auto"
            onClick={download}
        >
          Download
        </button>
      </div>
    </div>
  );
}

PosterCard.propTypes = {
  people: PropTypes.shape({
    file_path: PropTypes.string
  })
};

export default PosterCard;
