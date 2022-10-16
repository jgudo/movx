import { addSearchHistory, clearSearchHistory } from '@app/redux/actions';
import { IRootState } from '@app/types/types';
import React, { useRef, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

interface IProps {
  closeSearchForMobile: () => void;
}

const Searchbar: React.FC<IProps> = ({ closeSearchForMobile }) => {
  const [searchQuery, setQuery] = useState('');
  const { recentSearch, isLoading } = useSelector((state: IRootState) => ({
    recentSearch: state.search.recent,
    isLoading: state.misc.isLoading
  }));
  const searchHistoryRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const onClickClear = () => {
    setQuery('');
    searchInputRef.current?.focus();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
  };

  const onFocusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.select();
    if (recentSearch.length >= 1) {
      searchHistoryRef.current?.classList.add('visible');
    }
  };

  const onBlurChange = () => {
    if (recentSearch.length >= 1) {
      searchHistoryRef.current?.classList.remove('visible');
    }
  };

  const onKeyEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery) {
      onSubmitQuery();
    }
  };

  const onSubmitQuery = () => {
    if (searchQuery) {
      searchInputRef.current?.blur();
      document.body.classList.remove('is-search-open');
      closeSearchForMobile();
      history.push(`/search/movie/${searchQuery}`);

      if (!recentSearch.includes(searchQuery.toLowerCase())) {
        dispatch(addSearchHistory(searchQuery.toLowerCase()));
      }
    }
  };

  const onClearHistory = () => {
    dispatch(clearSearchHistory());
  };

  return (
    <div className="navigation__search">
      <input
        autoComplete="off"
        className="search__input"
        readOnly={isLoading}
        onBlur={onBlurChange}
        onChange={onInputChange}
        onFocus={onFocusChange}
        onKeyPress={onKeyEnter}
        placeholder="Search"
        ref={searchInputRef}
        type="text"
        value={searchQuery}
      />
      <button
        className="search-clear clear--button"
        onClick={onClickClear}
        style={{
          display: searchQuery ? 'block' : 'none',
        }}
      >
        x
      </button>
      <button
        className="search__button button--icon"
        disabled={isLoading}
        onClick={onSubmitQuery}
      >
        <HiSearch />
      </button>
      {recentSearch.length >= 1 && (
        <div className="search-history" ref={searchHistoryRef}>
          <div className="search-history-action">
            <p>Recent Searches</p>
            <button className="search-clear" onClick={onClearHistory}>
              Clear
            </button>
          </div>
          {recentSearch.map((search, index) => (
            <Link
              key={search + index}
              onClick={() => setQuery(search)}
              to={`/search/movie/${search}`}
            >
              {search}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
};

export default Searchbar;
