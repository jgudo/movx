import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
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
  const { isLoading } = useSelector(state => ({ isLoading: state._misc.isLoading }));

  useEffect(() => {
    if (window.screen.width <= 420) {
      setMobile(true);
    } 
  }, []); 
  
  return (!!totalPage || totalPage > 1) ? (
    <div className="pagination__wrapper">
      <p>Page {activePage}/{totalPage > 1000 ? 1000 : totalPage}</p>
      <Pagination
          activePage={activePage}
          disabledClass="page--disabled"
          firstPageText="First"
          hideNavigation={totalPage <= 1}
          itemsCountPerPage={itemsCountPerPage}
          lastPageText="Last"
          nextPageText="Next"
          onChange={onChange}
          disabled={isLoading}
          pageRangeDisplayed={isMobile ? '3' : pageRangeDisplayed}
          prevPageText="Prev"
          totalItemsCount={totalItemsCount > 1000 ? 1000 : totalItemsCount}
      />
    </div>
  ) : null;
};

PaginationBar.propTypes = {
  activePage: PropTypes.number,
  itemsCountPerPage: PropTypes.number,
  onChange: PropTypes.func,
  pageRangeDisplayed: PropTypes.number,
  totalItemsCount: PropTypes.number,
  totalPage: PropTypes.number
};

export default PaginationBar;
