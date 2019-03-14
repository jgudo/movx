import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import Modal from 'react-responsive-modal';

import ImageLoader from '../layout/ImageLoader';
import LoadingScreen from '../layout/LoadingScreen';

// helpers
import { isEmpty } from '../../helpers/helperFunctions';


const tmdb = 'https://api.themoviedb.org/3/';
const tmdbKey = process.env.TMDB_KEY;
const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';

const ViewPeople = (props) => {
  const [person, setPerson] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(undefined);
  const [isOpenModal, setModalVisibility] = useState(false);

  useEffect(() => {
    const personId = props.match.params.id;

    axios.get(`${tmdb}person/${personId}?api_key=${tmdbKey}`)
      .then((response) => {
        const personData = response.data;
        setPerson(personData);
        setLoaded(true);
        setError(undefined);
      })
      .catch((e) => {
        console.log('Cannot fetch movie', e);
        setLoaded(true);
        setError('Person\'s details cannot be loaded');
      });
  }, []);

  const goPreviousPage = () => {
    props.history.goBack();
  };

  const openModal = () => {
    setModalVisibility(true);
  };

  const closeModal = () => {
    setModalVisibility(false);
  };

  return (
    <React.Fragment>
      {!loaded && <LoadingScreen />}
      <div className="container container__backdrop">
        <div className="container__wrapper container__backdrop-wrapper">
          {(loaded && !isEmpty(person)) && (
            <React.Fragment>
              <Modal 
                  center
                  onClose={closeModal} 
                  open={isOpenModal} 
                  styles={{
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
                  }}
              >
                <h2>{person.name}'s Biography</h2>
                {person.biography ? (
                  <p>{person.biography}</p>
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
                          alt={person.name}
                          imgId={person.id} 
                          src={`${tmdbPosterPath + person.profile_path}`} 
                      />
                  </LazyLoad>
                </div>
                <div className="view__details">
                  <h1 className="view__title">
                    {person.name}
                  </h1>
                  {/* <p className="movie__rating">
                    <FontAwesomeIcon icon={['fa', 'star']} color="yellow" />
                    &nbsp;{movie.vote_average} Rating
                  </p> */}
                  <h4>Biography</h4>
                  <p>{person.biography}</p>
                  <br/>
                  <br/>
                  <button 
                      className="button--primary"
                      onClick={openModal}
                  >
                    Read Full Biography
                  </button>
                </div> 
              </div>           
            </React.Fragment>
          )}
          {error && (
            <div className="person__not-found">
              <h1>{error}</h1>
              <button 
                  className="button--primary"
                  onClick={this.goPreviousPage}>
                  Go Back
              </button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ViewPeople);
