import Container from '@app/components/common/Container';
import PaginationBar from '@app/components/common/PaginationBar';
import MovieList from '@app/components/movies/MovieList';
import { numberWithCommas } from '@app/helpers/helperFunctions';
import useDocumentTitle from '@app/hooks/useDocumentTitle';
import usePageSaver from '@app/hooks/usePageSaver';
import { fetchGenreCategory } from '@app/redux/actions/genreActions';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

type RouteProps = RouteComponentProps<{ id: string; genre: string; }>

const ViewGenre: React.FC<RouteProps> = ({ match }) => {
  const { currentGenre, isLoading, favorites } = useSelector((state: IRootState) => ({
    currentGenre: state.genre.current,
    isLoading: state.misc.isLoading,
    favorites: state.favorites
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const query = `/discover/movie?&with_genres=${match.params.id}`;


  useDocumentTitle('Genres | MOVX');
  useEffect(() => {
    dispatch(fetchGenreCategory(query, currentPage));
  }, []);

  const handlePageChange = (page: number) => {
    if (currentGenre?.page !== page && !isLoading) {
      dispatch(fetchGenreCategory(query, page));
      setCurrentPage(page)
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>{match.params.genre.replace('-', ' ')}</h1>
          <h3>{numberWithCommas(currentGenre?.total_results || 0)} Movies</h3>
        </div>
      </div>
      <MovieList
        category="movie"
        movies={currentGenre?.results || []}
        templateCount={10}
      />
      {currentGenre && (
        <PaginationBar
          activePage={currentGenre.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={currentGenre.total_pages}
          totalPage={currentGenre.total_pages}
        />
      )}
    </Container>
  );
};

export default ViewGenre;
