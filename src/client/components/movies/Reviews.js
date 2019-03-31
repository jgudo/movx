import React from 'react';
import Collapsible from 'react-collapsible';

const Reviews = ({ reviews }) => {
  return (
    <div className="container__wrapper">
      <div className="reviews__header"> 
        <h1>Reviews</h1>
      </div>
      {reviews.results.map((review) => {
        return (
          <Collapsible 
              easing="ease-in" 
              key={`review_${review.id}`} 
              transitionTime={300}
              trigger={review.author}
          >
            <p>{review.content}</p>
          </Collapsible>
        );
      })}
    </div>
  );
};

export default Reviews;
