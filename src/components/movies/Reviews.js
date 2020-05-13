import React from 'react';
import Collapsible from 'react-collapsible';

const Reviews = ({ reviews }) => {
  return (
    <div className="reviews">
      <div className="container__wrapper reviews__wrapper">
        <div className="reviews__header header__title"> 
          <h1>Reviews</h1>
        </div>
        {reviews.results.map(review => (
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

export default Reviews;
