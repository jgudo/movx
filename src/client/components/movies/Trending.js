import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopProgressLoader from '../layout/TopProgressLoader'; 
import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from './MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const queryString = 'trending/all/day?';

class TrendingMovies extends Component {
  componentDidMount() {
    if (isEmpty(this.props.trendingMovies)) {
      this.props.fetchRequest('FETCH_TRENDING_MOVIES', queryString);
    }
  }

  handlePageChange = (e) => {
    if (this.props.trendingMovies.activePage !== e && !this.props.isLoading) {
      this.props.isCurrentlyFetching();
      this.props.fetchRequest('FETCH_TRENDING_MOVIES', queryString, e);
    }
  };

  render() {
    const { trendingMovies, isLoading } = this.props;
    
    return (
      <React.Fragment>
        <TopProgressLoader isLoading={isLoading} />
        {isEmpty(trendingMovies) && <LoadingScreen />}
        <div className="container">
          <div className="container__wrapper container__movies">
            {!isEmpty(trendingMovies) && (
              <React.Fragment>
                <div className="movie__header">
                  <div className="movie__header-title">
                    <h1>Trending Movies</h1>
                    <h3>{numberWithCommas(trendingMovies.total_results)} Movies</h3>
                  </div>
                </div>
                <div className="movie__wrapper">
                  {trendingMovies.collection.map((movie, index) => {
                    return (
                      <MovieCard 
                          category="movie"
                          key={`${movie.id}_${index}`}
                          movie={movie} 
                      />
                    )
                  })}
                </div>
                <PaginationBar 
                  activePage={trendingMovies.activePage}
                  itemsCountPerPage={1}
                  onChange={this.handlePageChange}
                  pageRangeDisplayed={10}
                  totalItemsCount={trendingMovies.total_pages}
                  totalPage={trendingMovies.total_pages}
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

const mapStateToProps = ({ trendingMovies, isLoading, error }) => ({
  trendingMovies,
  isLoading,
  error
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingMovies);
