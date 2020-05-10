import React from 'react';
import { useSelector } from 'react-redux';

const Container = ({ children }) => {
	const { isLoading } = useSelector(state => ({ isLoading: state._misc.isLoading }));

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
