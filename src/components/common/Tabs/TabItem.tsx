import React from 'react';

interface IProps {
  index: number;
  label: string;
  toggleTab: React.Dispatch<React.SetStateAction<number>>;
  activeTab: number;
}

const TabItem: React.FC<IProps> = ({ index, label, toggleTab, activeTab }) => {
  let className = 'tab-list-item';

  if (activeTab === index) {
    className += ' tab-list-active';
  }

  return (
    <li
      className={className}
      onClick={() => toggleTab(index)}
    >
      {label}
    </li>
  );
};

export default TabItem;
