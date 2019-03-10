import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from 'react-js-pagination';

import TopProgressLoader from '../layout/TopProgressLoader'; 
import PeopleCard from '../card/PeopleCard';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

class People extends Component {
  state = {
    movies: {},
    isLoading: true
  };

  componentDidMount() {
    if (this.isEmpty(this.props.people)) 
      this.props.fetchRequest('FETCH_PEOPLE', 'person/popular?');
  }

  handlePageChange = (e) => {
    if (this.props.people.activePage !== e) {
      this.props.isCurrentlyFetching();
      this.props.fetchRequest('FETCH_PEOPLE', 'person/popular?', e);
    }
  };

  isEmpty = (obj) => {
    for(let key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  render() {
    const { people, isLoading } = this.props;
  
    return (
      <React.Fragment>
        <TopProgressLoader isLoading={isLoading} />
        <div 
            className="container" 
            /* eslint no-return-assign: 0 */
            ref={el => this.container = el}
        >
          <div className="container__wrapper">
            <div className="movie__header">
              <h1>Popular People</h1>
            </div>
            <div className="movie__wrapper">
              {people.collection && people.collection.map((person) => {
                return (
                  <PeopleCard 
                      category="people"
                      key={person.id}
                      people={person} 
                  />
                )
              })}
            </div>
            {people.collection && (
              <div className="pagination__wrapper">
                <p>Page {people.activePage}/{people.total_pages}</p>
                <Pagination
                    activePage={people.activePage || 1}
                    firstPageText={<FontAwesomeIcon icon={['fa', 'angle-double-left']} />}
                    itemsCountPerPage={10}
                    lastPageText={<FontAwesomeIcon icon={['fa', 'angle-double-right']} />}
                    nextPageText={<FontAwesomeIcon icon={['fa', 'angle-right']} />}
                    onChange={this.handlePageChange}
                    pageRangeDisplayed={5}
                    prevPageText={<FontAwesomeIcon icon={['fa', 'angle-left']} />}
                    totalItemsCount={people.total_pages || 1000}
                />
              </div>
            )}
          </div>  
      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ people, isLoading }) => ({
  people,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(People);
