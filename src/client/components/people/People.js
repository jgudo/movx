import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../layout/LoadingScreen'; 
import PeopleCard from './PeopleCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';
import Error from '../layout/Error';

// actions
import { FETCH_PEOPLE } from '../../constants/constants';
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const People = (props) => {
  const [error, setIfError] = useState(undefined);
  const { people, isLoading } = props;

  const fetchPeople = (page = 1) => {
    props.isCurrentlyFetching();
    props.fetchRequest(FETCH_PEOPLE, 'person/popular?', page)
      .then((status) => {
        if (status === 503) {
          setIfError('Error connection');
        } else if (status === 404) {
          setIfError('Cannot fetch movies');
        }
      });
  };

  useEffect(() => {
    if (isEmpty(props.people)) {
      fetchPeople();
    } 
  }, []);

  const handlePageChange = (e) => {
    if (props.people.page !== e) {
      fetchPeople(e);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingScreen />}
      <div className="container">
        <div className="container__wrapper container__movies">
          {(!isEmpty(people) && !error) && (
            <React.Fragment>
            <div className="movie__header">
              <div className="movie__header-title">
                <h1>Popular People</h1>
                <h3>{numberWithCommas(people.total_results)} People</h3>
              </div>
            </div>
            <div className="movie__wrapper">
              {people.results.map((person) => {
                return (
                  <PeopleCard 
                      category="people"
                      key={person.id}
                      people={person} 
                  />
                )
              })}
            </div>
            <PaginationBar 
                activePage={people.page}
                itemsCountPerPage={1}
                onChange={handlePageChange}
                pageRangeDisplayed={10}
                totalItemsCount={people.total_pages}
                totalPage={people.total_pages}
            />
            <Footer />
            </React.Fragment>
          )}
          {error && (
            <Error error={error} />
          )}
        </div>  
      </div>
    </React.Fragment>
  );
};

People.propTypes = {
  fetchRequest: PropTypes.func,
  isCurrentlyFetching: PropTypes.func,
  people: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.object),
    page: PropTypes.number,
    total_pages: PropTypes.number,
    total_results: PropTypes.number
  })
};

const mapStateToProps = ({ people, isLoading }) => ({
  people,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(People);
