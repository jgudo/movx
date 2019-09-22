import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/hoc/Loader';
import MovieCard from '../../components/movies/MovieCard';
import PaginationBar from '../../components/common/PaginationBar';
import Footer from '../../components/common/Footer';

// actions
import { fetchTrendingMovies } from '../../actions/movieActions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const TrendingMovies = (props) => {
  const { trendingMovies, isLoading, favorites } = useSelector(state => ({
    trendingMovies: state._movies.trendingMovies,
    isLoading: state._misc.isLoading,
    favorites: state._misc.favorites
  }));
  const dispatch = useDispatch();
  const query = '/trending/all/day';

  useEffect(() => {
    if (isEmpty(trendingMovies)) {
      dispatch(fetchTrendingMovies(query));
    }
  }, []);

  const handlePageChange = (page) => {
    if (trendingMovies.page !== page && !isLoading) {
      dispatch(fetchTrendingMovies(query, page));
    }
  };

  return !isEmpty(trendingMovies) && (
    <div className="container__movies">
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Trending Movies</h1>
          <h3>{numberWithCommas(trendingMovies.total_results)} Movies</h3>
        </div>
      </div>
      <div className="movie__wrapper">
        {trendingMovies.results.map((movie, index) => (
          <MovieCard 
              category="movie"
              key={`${movie.id}_${index}`}
              movie={movie} 
              favorites={favorites}
          />
        ))}
      </div>
      <PaginationBar 
            activePage={trendingMovies.page}
            itemsCountPerPage={1}
            onChange={handlePageChange}
            pageRangeDisplayed={10}
            totalItemsCount={trendingMovies.total_pages}
            totalPage={trendingMovies.total_pages}
      />
      <Footer />
    </div>
  );
};

export default Loader('trendingMovies')(TrendingMovies);
