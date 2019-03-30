import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import Modal from 'react-responsive-modal';

import ImageLoader from '../layout/ImageLoader';
import ContentLoader from '../layout/ContentLoader';
import Casting from './Casting';

import { fetchSelectedPerson, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty } from '../../helpers/helperFunctions';

const ViewPeople = (props) => {
  const { actor, casting, isLoading } = props;
  const [isOpenModal, setModalVisibility] = useState(false);
  const actorId = props.match.params.id;
  const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
  
  useEffect(() => {
    if (parseInt(actorId, 10) !== props.actor.id) {
      props.isCurrentlyFetching();
      props.fetchSelectedPerson(actorId);
    }
  }, []);

  const goPreviousPage = () => {
    props.history.goBack();
  };

  const onClickLink = () => {
    props.history.push(`/view/person/profile/${actorId}/images`);
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
      right: '0'
    },
    closeIcon: {
      fill: '#fff'
    }  
  };

  return (
    <React.Fragment>
      {isLoading && <ContentLoader />}
      <div className="container mt-0 pt-0">
        <div className="container__wrapper w-100">
          {(!isLoading && !isEmpty(actor)) && (
            <React.Fragment>
              <div className="backdrop__container">
                <img 
                    alt=""
                    className="backdrop__image"
                    src="/images/background.jpg" 
                />
              </div>
              <Modal 
                  center
                  onClose={closeModal} 
                  open={isOpenModal} 
                  styles={modalStyle}
              >
                <h2>{actor.name}'s Biography</h2>
                {actor.biography ? (
                  <p>{actor.biography}</p>
                ) : (
                  <p>Biography not found</p>
                )}
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
                  <p className="view__overview">{actor.biography}</p>
                  <br/>
                  <br/>
                  <div className="view__actions">
                    <button 
                        className="button--primary"
                        onClick={openModal}
                    >
                      Read Full Biography
                    </button>
                    <button 
                        className="button--primary"
                        onClick={onClickLink}
                    >
                      View All Pictures
                    </button>
                  </div>
                </div> 
              </div>           
            </React.Fragment>
          )}
        </div>
        {(casting.length >= 1 && !isLoading) && (
          <Casting 
              actor={actor} 
              casting={casting} 
          />
        )}
      </div>
    </React.Fragment>
  );
};

ViewPeople.propTypes = {
  actor: PropTypes.shape({
    biography: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    profile_path: PropTypes.string
  }),
  fetchSelectedPerson: PropTypes.func,
  isCurrentlyFetching: PropTypes.func,
  isLoading: PropTypes.bool
};

const mapStateToProps = ({ person, isLoading }) => ({
  actor: person.actor,
  casting: person.casting,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchSelectedPerson: id => dispatch(fetchSelectedPerson(id)),
  isCurrentlyFetching: () => dispatch(isCurrentlyFetching())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewPeople));
