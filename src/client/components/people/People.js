import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopProgressLoader from '../layout/TopProgressLoader'; 
import LoadingScreen from '../layout/LoadingScreen'; 
import PeopleCard from './PeopleCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

class People extends Component {
  state = {
    movies: {}
  };

  componentDidMount() {
    if (isEmpty(this.props.people)) {
      this.props.fetchRequest('FETCH_PEOPLE', 'person/popular?');
    } 
  }

  handlePageChange = (e) => {
    if (this.props.people.activePage !== e) {
      this.props.isCurrentlyFetching();
      this.props.fetchRequest('FETCH_PEOPLE', 'person/popular?', e);
    }
  };

  render() {
    const { people, isLoading } = this.props;
  
    return (
      <React.Fragment>
        <TopProgressLoader isLoading={isLoading} />
        {isEmpty(people) && <LoadingScreen />}
        <div className="container">
          <div className="container__wrapper">
            {!isEmpty(people) && (
              <React.Fragment>
              <div className="movie__header">
                <div className="movie__header-title">
                  <h1>Popular People</h1>
                  <h3>{numberWithCommas(people.total_results)} People</h3>
                </div>
              </div>
              <div className="movie__wrapper">
                {people.collection.map((person) => {
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
                  activePage={people.activePage}
                  itemsCountPerPage={1}
                  onChange={this.handlePageChange}
                  pageRangeDisplayed={10}
                  totalItemsCount={people.total_pages}
                  totalPage={people.total_pages}
              />
              <Footer />
              </React.Fragment>
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
