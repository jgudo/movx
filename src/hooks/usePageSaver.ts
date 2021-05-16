import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useDidMount from './useDidMount';

const usePageSaver = (path?: string) => {
  const { pathname } = useLocation();
  const p = path || pathname.replace('/', '');
  const [currentPage, setCurrentPage] = useState(() =>
    localStorage.movxPage ? JSON.parse(localStorage.movxPage)[p] : 1,
  );
  const didMount = useDidMount();

  useLayoutEffect(() => {
    const storageItem = localStorage.getItem('movxPage');

    if (storageItem) {
      const movxPage = JSON.parse(storageItem);
      const page = movxPage[p];

      if (typeof movxPage[p] !== undefined) {
        setCurrentPage(page);
      }
    } else {
      localStorage.setItem(
        'movxPage',
        JSON.stringify({
          [p]: currentPage,
        }),
      );
    }
  }, []);

  useEffect(() => {
    const storageItem = localStorage.getItem('movxPage');

    if (didMount && storageItem) {
      const movxPage = JSON.parse(storageItem);

      localStorage.setItem(
        'movxPage',
        JSON.stringify({
          ...movxPage,
          [p]: currentPage,
        }),
      );
    }
  }, [currentPage]);

  return { currentPage, setCurrentPage };
};

export default usePageSaver;
