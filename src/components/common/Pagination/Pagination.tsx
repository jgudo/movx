import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';

interface IProps {
  activePage: number;
  totalPage: number;
  onChange: (val: number) => void;
  itemsCountPerPage?: number;
  pageRangeDisplayed: number;
  totalItemsCount: number;
}

const CustomPagination: React.FC<IProps> = ({
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

  return (!!totalPage && totalPage > 1) ? (
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
        pageRangeDisplayed={isMobile ? 3 : pageRangeDisplayed}
        prevPageText="Prev"
        totalItemsCount={totalItemsCount > 1000 ? 1000 : totalItemsCount}
      />
    </div>
  ) : null;
};

CustomPagination.defaultProps = {
  pageRangeDisplayed: 10
}

export default CustomPagination;
