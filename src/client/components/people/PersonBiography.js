import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import Modal from 'react-responsive-modal';
import ImageLoader from '../layout/ImageLoader';
import imgBackground from '../../images/background.jpg';

const PersonBiography = (props) => {
  const [isOpenModal, setModalVisibility] = useState(false);
  const { actor, id } = props;
  const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
  const goPreviousPage = () => {
    props.history.goBack();
  };

  const onClickLink = () => {
    props.history.push(`/view/person/profile/${id}/images`);
    window.scrollTo(null, 0);
  };

  const openModal = () => {
    setModalVisibility(true);
  };

  const closeModal = () => {
    setModalVisibility(false);
  };

  const modalStyle = {
    modal: {
      background: '#272c30',
      padding: '50px',
      textAlign: 'left',
      borderRadius: '6px'
    },
    closeButton: {
      top: '10px',
      right: '10px'
    },
    closeIcon: {
      fill: '#fff'
    }  
  };

  return (
    <div className="container__wrapper w-100">
      <div className="backdrop__container">
        <img 
            alt=""
            className="backdrop__image"
            src={imgBackground} 
        />
      </div>
      <Modal 
          center
          onClose={closeModal} 
          open={isOpenModal} 
          styles={modalStyle}
      >
        <h2>{actor.name}'s Biography</h2>
        <p>{actor.biography}</p>
      </Modal>
      <div className="back__button">
        <button 
            className="button--back"
            onClick={goPreviousPage}>
          Back
        </button>
      </div>
      <div className="view">
        <div className="view__poster">
          <LazyLoad 
              debounce={false}
              height={450}
              offsetVertical={500}
              width={300}
            >
              <ImageLoader 
                  alt={actor.name}
                  imgId={actor.id} 
                  src={`${tmdbPosterPath + actor.profile_path}`} 
              />
          </LazyLoad>
        </div>
        <div className="view__details">
          <h1 className="view__title">
            {actor.name}
          </h1>
          <h4 className="view__overview-title">Biography</h4>
          <p className="view__overview">
          {actor.biography || <span style={{ fontStyle: 'italic', opacity: '.7' }}>Biograpy not found</span>}
          </p>
          <br/>
          <br/>
          <div className="view__actions">
            {actor.biography && (
              <button 
                  className="button--primary"
                  onClick={openModal}
              >
                Read Full Biography
              </button>
            )}
            <button 
                className="button--primary"
                onClick={onClickLink}
            >
              View All Pictures
            </button>
          </div>
        </div> 
      </div>           
    </div>
  );
};

export default withRouter(PersonBiography);
