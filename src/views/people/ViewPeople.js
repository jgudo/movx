import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContentLoader from '../../components/common/ContentLoader';
import Casting from '../../components/people/Casting';
import PersonBiography from '../../components/people/PersonBiography';

import { fetchSelectedPerson } from '../../actions/actions';

// helpers
import { isEmpty } from '../../helpers/helperFunctions';

const ViewPeople = (props) => {
  const { actor, casting, isLoading } = props;
  const actorId = props.match.params.id;

  useEffect(() => {
    if (parseInt(actorId, 10) !== props.actor.id) {
      props.fetchSelectedPerson(actorId);
    }
  }, []);

  return (
    <React.Fragment>
      {isLoading && <ContentLoader />}
      {(!isLoading && !isEmpty(actor)) && (
        <div className="container-full">
          <PersonBiography 
              actor={actor}
              id={actorId}
          />
          {casting.length >= 1 && (
            <div className="container__wrapper">
              <Casting 
                  actor={actor} 
                  casting={casting} 
              />
            </div>
          )}
        </div>
      )}
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
  fetchSelectedPerson: id => dispatch(fetchSelectedPerson(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPeople);
