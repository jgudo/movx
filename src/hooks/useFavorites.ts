import { addToFavorites as addFavorites, removeFromFavorites } from '@app/redux/actions/favoriteActions';
import { IMovieData, IRootState } from '@app/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useFavorites = () => {
  const favorites = useSelector((state: IRootState) => state.favorites);
  const dispatch = useDispatch();

  const isFavorite = (movieId: number | string) => favorites.some(item => item.id === movieId);

  const addToFavorites = (movie?: IMovieData) => {
    if (!movie) return;

    if (!isFavorite(movie.id)) {
      dispatch(addFavorites(movie));
      toast.dismiss();
      toast.dark(`${movie.original_name || movie.original_title} \n\r Added to favorites`);
    } else {
      dispatch(removeFromFavorites(movie.id));
      toast.dismiss();
      const options = {
        autoClose: 5000,
        progressStyle: { backgroundColor: '#DC143C' }
      };
      toast.dark(`${movie.original_name || movie.original_title} \n\r removed from favorites`, options);
    }
  };

  return { favorites, isFavorite, addToFavorites };
};

export default useFavorites;
