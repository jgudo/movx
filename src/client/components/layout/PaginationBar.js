import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from 'react-js-pagination';

const PaginationBar = ({
  activePage,
  totalPage,
  onChange,
  itemsCountPerPage,
  pageRangeDisplayed,
  totalItemsCount
}) => {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    if (window.screen.width <= 420) {
      setMobile(true);
    } 
  }, []); 
  return (
    <div className="pagination__wrapper">
      <p>Page {activePage}/{totalPage > 1000 ? 1000 : totalPage}</p>
      <Pagination
          activePage={activePage}
          disabledClass="page--disabled"
          firstPageText={<FontAwesomeIcon icon={['fa', 'angle-double-left']} />}
          hideNavigation={totalPage <= 1}
          itemsCountPerPage={itemsCountPerPage}
          lastPageText={<FontAwesomeIcon icon={['fa', 'angle-double-right']} />}
          nextPageText={<FontAwesomeIcon icon={['fa', 'angle-right']} />}
          onChange={onChange}
          pageRangeDisplayed={isMobile ? '5' : pageRangeDisplayed}
          prevPageText={<FontAwesomeIcon icon={['fa', 'angle-left']} />}
          totalItemsCount={totalItemsCount > 1000 ? 1000 : totalItemsCount}
      />
    </div>
  );
};

export default PaginationBar;
