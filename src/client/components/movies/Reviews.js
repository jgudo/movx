import React from 'react';
import Collapsible from 'react-collapsible';

import { isEmpty } from '../../helpers/helperFunctions';

const Reviews = ({ reviews }) => {
  return (
    <div className="container__wrapper">
      <div className="reviews__header"> 
        <h1>User Reviews</h1>
      </div>
      {!isEmpty(reviews) && reviews.results.map((review) => {
        return (
          <Collapsible key={`review_${review.id}`} trigger={review.author}>
            <p>{review.content}</p>
          </Collapsible>
        );
      })}
    </div>
  );
};

export default Reviews;
