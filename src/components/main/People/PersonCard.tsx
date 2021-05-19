import ImageLoader from '@app/components/common/Loader/ImageLoader';
import { getCSSVar } from '@app/helpers/helperFunctions';
import { IActor, IRootState } from '@app/types/types';
import React from 'react';
// @ts-ignore
import LazyLoad from 'react-lazy-load';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface IProps {
  data: IActor | null;
}
/* eslint camelcase: 0 */
const PersonCard: React.FC<IProps> = ({ data }) => {
  const isLoading = useSelector((state: IRootState) => state.misc.isLoading);
  const tmdbPosterPath = 'https://image.tmdb.org/t/p/w185_and_h278_face/';

  const onClickCard = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // prevent clicking of cards if loading
    if (isLoading) {
      e.preventDefault();
    }
  };

  return (
    <SkeletonTheme
      color={getCSSVar('--skeleton-theme-color')}
      highlightColor={getCSSVar('--skeleton-theme-highlight')}
    >
      <div className="card people__card">
        <Link to={`/view/person/profile/${data?.id}`} onClick={onClickCard}>
          <div className="card__image">
            {data?.id ? (
              <LazyLoad
                debounce={false}
                offsetVertical={500}
              >
                <ImageLoader
                  alt={name}
                  imgId={data.id}
                  src={data.profile_path ? `${tmdbPosterPath + data.profile_path}` : '/placeholder.jpg'}
                />
              </LazyLoad>
            ) : <Skeleton width={'100%'} height={'100%'} />}
          </div>
        </Link>
        <div className="card__details">
          <h4>
            {data?.id ? data.name || 'Not Available' : <Skeleton width={'60%'} />}
          </h4>
          {data?.character && (
            <p className="card__character">{data?.character}</p>
          )}
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default PersonCard;
