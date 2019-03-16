import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopProgressLoader from '../layout/TopProgressLoader'; 
import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from './MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';
import Filter from '../layout/Filter';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

class TvShows extends Component {
  componentDidMount() {
    if (isEmpty(this.props.tvShows)) {
      this.fetchMovies();
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.filter.tv.query !== this.props.filter.tv.query) {
      setTimeout(this.fetchMovies, 200);
    }
  }

  fetchMovies = (page = 1) => {
    const { query } = this.props.filter.tv;
    const path = 'discover/tv?&language=en-US';

    this.props.isCurrentlyFetching();
    this.props.fetchRequest('FETCH_TV_SHOWS', path + query, page);
  }

  handlePageChange = (e) => {
    if (this.props.tvShows.activePage !== e) {
      this.fetchMovies(e);
    }
  };

  render() {
    const { tvShows, isLoading, filter } = this.props;
  
    return (
      <React.Fragment>
        <TopProgressLoader isLoading={isLoading} />
        {isEmpty(tvShows) && <LoadingScreen />}
        <div className="container">
          <div className="container__wrapper container__movies">
            {!isEmpty(tvShows) && (
              <React.Fragment>
                <div className="movie__header">
                  <div className="movie__header-title">
                    <h1>TV Shows</h1>
                    <h3>{numberWithCommas(tvShows.total_results)} TV Shows</h3>
                  </div> 
                  <Filter 
                      filterCategory="tv"
                      filterData={filter.tv}
                  /> 
                </div>
              <div className="movie__wrapper">
                {tvShows.collection.map((show) => {
                  return (
                    <MovieCard 
                        key={show.id}
                        category="tv"
                        movie={show} 
                    />
                  )
                })}
              </div>
              <PaginationBar 
                  activePage={tvShows.activePage}
                  itemsCountPerPage={1}
                  onChange={this.handlePageChange}
                  pageRangeDisplayed={10}
                  totalItemsCount={tvShows.total_pages}
                  totalPage={tvShows.total_pages}
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

const mapStateToProps = ({ tvShows, isLoading, filter }) => ({
  tvShows,
  isLoading,
  filter
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(TvShows);
