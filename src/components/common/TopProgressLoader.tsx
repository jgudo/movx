import { IRootState } from '@app/types/types';
import React from 'react';
import { useSelector } from 'react-redux';

const TopProgressLoader = () => {
  const isLoading = useSelector((state: IRootState) => state.misc.isLoading);

  return isLoading ? (
    <div
      className="loader"
      id="loader">
      <div className="loader__head">
        <div className="first-indicator" />
        <div className="second-indicator" />
      </div>
    </div>
  ) : null;
};

export default TopProgressLoader;
