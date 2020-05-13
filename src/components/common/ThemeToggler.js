import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from 'actions/miscActions';

const ThemeToggler = ({ id }) => {
	const { darkMode } = useSelector(state => ({ darkMode: state._misc.darkMode }));
	const dispatch = useDispatch();

	useEffect(() => {
		if (darkMode) {
			document.documentElement.setAttribute('data-theme', 'default');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
		}
	}, []);

	const onThemeChange = (e) => {
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
					id={id} 
					onChange={onThemeChange}
					name="theme-switch" 
					className="theme-switch__input" 
				/>
				<label htmlFor={id} className="theme-switch__label">
		        <span />
		    </label>
		</div>
	);
};

ThemeToggler.defaultProps = {
	id: 'themeSwitch'
};

export default ThemeToggler;
