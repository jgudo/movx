import React from 'react';

interface IProps {
  index: number;
  label: string;
  children: React.ReactNode;
}

const TabContent: React.FC<IProps> = ({ index, label, children }) => {
  return (
    <div>
      {children}
    </div>
  )
};

export default TabContent;
