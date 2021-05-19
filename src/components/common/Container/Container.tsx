import { IRootState } from '@app/types/types';
import React from 'react';
import { useSelector } from 'react-redux';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoading = useSelector((state: IRootState) => state.misc.isLoading);

  return (
    <div
      className="container"
      style={{ opacity: `${isLoading ? 0.5 : 1}` }}
    >
      {children}
    </div>
  );
};

export default Container;
