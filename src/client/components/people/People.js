import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../layout/LoadingScreen'; 
import PeopleCard from './PeopleCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';
import Error from '../layout/Error';

// actions
import { fetchPeople, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const People = (props) => {
  const [error, setIfError] = useState(undefined);
  const { people, isLoading } = props;

  const getPeople = (page = 1) => {
    props.isCurrentlyFetching();
    props.fetchPeople('person/popular?', page);
  };

  useEffect(() => {
    if (isEmpty(props.people)) {
      getPeople();
    } 
  }, []);

  const handlePageChange = (e) => {
    if (props.people.page !== e) {
      getPeople(e);
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
  fetchPeople: PropTypes.func,
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
  fetchPeople: (url, page) => dispatch(fetchPeople(url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(People);
