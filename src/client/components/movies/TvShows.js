import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopProgressLoader from '../layout/TopProgressLoader'; 
import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from './MovieCard';
import PaginationBar from '../layout/PaginationBar';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const queryString = 'discover/tv?&language=en-US&sort_by=popularity.desc&timezone=America%2FNew_York';

class TvShows extends Component {
  state = {
    sortBy: 'popularity.desc'
  };

  componentDidMount() {
    if (isEmpty(this.props.tvShows)) {
      this.props.fetchRequest('FETCH_TV_SHOWS', queryString);
    }
  }

  handlePageChange = (e) => {
    if (this.props.tvShows.activePage !== e) {
      this.props.isCurrentlyFetching();
      this.props.fetchRequest('FETCH_TV_SHOWS', queryString, e);
    }
  };

  render() {
    const { tvShows, isLoading } = this.props;
  
    return (
      <React.Fragment>
        <TopProgressLoader isLoading={isLoading} />
        {isEmpty(tvShows) && <LoadingScreen />}
        <div className="container">
          <div className="container__wrapper">
            <div className="movie__header">
              <div className="movie__header-title">
                <h1>TV Shows</h1>
                {!isEmpty(tvShows) && (
                  <h3>{numberWithCommas(tvShows.total_results)} TV Shows</h3>
                )}
              </div>  
            </div>
            <div className="movie__wrapper">
              {!isEmpty(tvShows) && tvShows.collection.map((show) => {
                return (
                  <MovieCard 
                      key={show.id}
                      category="tv"
                      movie={show} 
                  />
                )
              })}
            </div>
            {!isEmpty(tvShows) && (
              <PaginationBar 
                  activePage={tvShows.activePage}
                  itemsCountPerPage={10}
                  onChange={this.handlePageChange}
                  pageRangeDisplayed={5}
                  totalItemsCount={tvShows.total_pages}
                  totalPage={tvShows.total_pages}
              />
            )}
          </div>    
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ tvShows, isLoading }) => ({
  tvShows,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(TvShows);
