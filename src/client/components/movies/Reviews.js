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
