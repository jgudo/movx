import React from 'react';

import PosterCard from '@app/components/main/Poster/PosterCard';
import { useSelector } from 'react-redux';
import { IRootState } from '@app/types/types';

const PersonProfiles = () => {
  const posters = useSelector((state: IRootState) => state.people.current.actor?.images.profiles);

  return (
    posters && posters.length >= 1 ? (
      <React.Fragment>
        <div className="poster__header header__title">
          <h1>Profile Images</h1>
        </div>
        <div className="grid">
          {posters.map((poster) => {
            return (
              <PosterCard
                key={poster.file_path}
                poster={poster}
              />
            );
          })}
        </div>
      </React.Fragment>
    ) : (
      <div className="search__no-result">
        <h1>No posters found.</h1>
      </div>
    )
  );
}

export default PersonProfiles;
