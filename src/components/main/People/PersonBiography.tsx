import ImageLoader from '@app/components/common/Loader/ImageLoader';
import { getCSSVar } from '@app/helpers/helperFunctions';
import { IRootState } from '@app/types/types';
import React, { useState } from 'react';
// @ts-ignore
import LazyLoad from 'react-lazy-load';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useHistory } from 'react-router-dom';

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';

const PersonBiography = () => {
  const history = useHistory();
  const actor = useSelector((state: IRootState) => state.people.current.actor);
  const [isOpenModal, setModalVisibility] = useState(false);

  const onClickLink = () => {
    history.push(`/view/person/profile/${actor?.id}/images`);
    window.scrollTo(0, 0);
  };

  const openModal = () => setModalVisibility(true);

  const closeModal = () => setModalVisibility(false);

  return (
    <SkeletonTheme
      color={getCSSVar('--skeleton-theme-color')}
      highlightColor={getCSSVar('--skeleton-theme-highlight')}
    >
      <Modal
        center
        onClose={closeModal}
        open={isOpenModal}
        classNames={{
          overlay: 'ModalOverlay',
          modal: 'Modal',
          modalContainer: 'ModalContainer',
          closeButton: 'ModalCloseButton',
          closeIcon: 'ModalCloseIcon',
        }}
      >
        <h2>{actor?.name}'s Biography</h2>
        <p>{actor?.biography}</p>
      </Modal>
      <div className="movie__overview">
        <div className="container__wrapper movie__overview-wrapper">
          {actor?.id && (
            <div className="backdrop__container">
              {actor.id && (
                <img
                  alt=""
                  className="backdrop__image"
                  src="/background.jpg"
                />
              )}
            </div>
          )}
          <div className="view">
            <div className="back__button">
              {actor?.id ? (
                <button
                  className="button--back"
                  onClick={history.goBack}>
                  Back
                </button>
              ) : <Skeleton width={50} />}
            </div>
            <div className="view__wrapper">
              <div className="view__poster">
                {actor?.id ? (
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
                ) : <Skeleton width={'100%'} height={'100%'} />}
              </div>
              <div className="view__details">
                <h1 className="view__title">
                  {actor?.id ? actor.name : <Skeleton width={'60%'} />}
                </h1>
                <h4 className="view__overview-title">
                  {actor?.id ? 'Biography' : <Skeleton width={180} />}
                </h4>
                <p className="view__overview">
                  {actor?.id ? actor.biography || <span style={{ fontStyle: 'italic', opacity: '.7' }}>Biograpy not found</span> : (
                    <Skeleton count={4} />
                  )}
                </p>
                <br />
                <br />
                <div className="view__actions">
                  {actor?.id && (
                    <>
                      {actor.biography && (
                        <button
                          className="button--primary"
                          onClick={openModal}
                        >
                          Full Biography
                          &nbsp;&nbsp;
                          <i className="fa fa-info-circle" />
                        </button>
                      )}
                      &nbsp;
                      <button
                        className="button--outlined"
                        onClick={onClickLink}
                      >
                        View Photos
                        &nbsp;&nbsp;
                        <i className="fa fa-image" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default PersonBiography;
