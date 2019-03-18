import React from 'react';
import PropTypes from 'prop-types';

const TabItem = (props) => {
  let className = 'tab-list-item';
  
  const onClickTab = () => {
    const { label, onClick } = props;
    onClick(label);
  };

  if (props.activeTab === props.label) {
    className += ' tab-list-active';
  }

  return (
    <li 
        className={className}
        onClick={onClickTab}
    >
      {props.label}
    </li>
  );
};

TabItem.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default TabItem;
