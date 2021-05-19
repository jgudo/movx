import React from 'react';

import BackdropCard from '@app/components/main/Poster/BackdropCard';
import { IImage } from '@app/types/types';

interface IProps {
  backdrops: IImage[];
  id: number;
}

const MovieBackdrop: React.FC<IProps> = ({ backdrops, id }) => (
  <div className="backdrop">
    <div className="backdrop__wrapper">
      <div className="poster__header header__title">
        <h1>Movie Backdrops</h1>
      </div>
      <div className="backdrop__grid">
        {backdrops.map((backdrop, index) => {
          return (
            <BackdropCard
              key={`${id}_poster${index}`}
              backdrop={backdrop}
            />
          );
        })}
      </div>
    </div>
  </div>
);

export default MovieBackdrop;
