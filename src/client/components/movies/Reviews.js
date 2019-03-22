import React from 'react';

import { isEmpty } from '../../helpers/helperFunctions';

const Reviews = ({ reviews }) => {
  return (
    <div className="container__wrapper">
      <div className="reviews__header"> 
        <h1>User Reviews</h1>
      </div>
      {!isEmpty(reviews) && reviews.results.map((review) => {
        return (
          <div 
              className="reviews__row"
              key={`review_${review.id}`}
          >
            <h3 className="reviews__author">{review.author}</h3>
            <p className="reviews__comment">{review.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
