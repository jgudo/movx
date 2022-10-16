import { setDarkMode } from '@app/redux/actions/miscActions';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { ImSun } from 'react-icons/im';
import { IoMdMoon } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

const ThemeToggler: React.FC<{ toggleId?: string }> = ({ toggleId }) => {
  const darkMode = useSelector((state: IRootState) => state.misc.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'default');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const onThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'light');
      dispatch(setDarkMode(false));
    } else {
      document.documentElement.setAttribute('data-theme', 'default');
      dispatch(setDarkMode(true));
    }
  }

  return (
    <div className="theme__toggler">
      <p className="theme-switch__title">
        {`Switch to ${darkMode ? 'Light' : 'Dark'} Theme`}
      </p>
      <input
        checked={!darkMode}
        type="checkbox"
        id={toggleId}
        onChange={onThemeChange}
        name="theme-switch"
        className="theme-switch__input"
      />
      <label htmlFor={toggleId} className="theme-switch__label">
        <span />
        <ImSun className="theme-switch__icon theme-switch__icon--sun"/>
        <IoMdMoon className="theme-switch__icon theme-switch__icon--moon"/>
      </label>
    </div>
  );
};

ThemeToggler.defaultProps = {
  toggleId: 'themeSwitch'
};

export default ThemeToggler;
