import React, { useState } from 'react';
import TabItem from './TabItem';

interface IProps {
  children: React.ReactElement[];
}

const Tabs: React.FC<IProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.index);

  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map((child) => {
          const { label, index } = child.props;
          return (
            <TabItem
              activeTab={activeTab}
              index={index}
              key={label}
              label={label}
              toggleTab={setActiveTab}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.index !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
