import { IRootState } from '@app/types/types';
import React from 'react';
import Collapsible from 'react-collapsible';
import { useSelector } from 'react-redux';

const MovieReviews = () => {
  const reviews = useSelector((state: IRootState) => (state.movies.current.reviews || []));

  return reviews.length === 0 ? null : (
    <div className="reviews">
      <div className="container__wrapper reviews__wrapper">
        <div className="reviews__header header__title">
          <h1>Reviews</h1>
        </div>
        {reviews?.map(review => (
          <Collapsible
            easing="ease-in"
            key={`review_${review.id}`}
            transitionTime={300}
            trigger={review.author}
          >
            <p>{review.content}</p>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default MovieReviews;
