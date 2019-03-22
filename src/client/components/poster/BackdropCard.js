import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../layout/ImageLoader';

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w500_and_h282_face/';
const tmdbPosterBase = 'https://image.tmdb.org/t/p/original';

/* eslint-disable */
const BackdropCard = (props) => {
  const { file_path } = props.backdrop;

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
            onClick={download}
        >
          Download
        </button>
      </div>
    </div>
  );
}

BackdropCard.propTypes = {
  backdrop: PropTypes.shape({
    file_path: PropTypes.string
  })
};

export default BackdropCard;
