import React from 'react';
import PropTypes from 'prop-types';

const TabItem = (props) => {
  const { 
    index, 
    label, 
    onClick,
    activeTab 
  } = props;
  let className = 'tab-list-item';
  
  const onClickTab = () => {
    onClick(index);
  };

  if (activeTab === index) {
    className += ' tab-list-active';
  }

  return (
    <li 
        className={className}
        onClick={onClickTab}
    >
      {label}
    </li>
  );
};

TabItem.propTypes = {
  activeTab: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default TabItem;
