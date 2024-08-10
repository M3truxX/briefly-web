import React from 'react';

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

const TabsLink: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onTabChange(index)}
            style={{
              margin: '10px',
              padding: '10px 20px',
              border: activeTab === index ? '2px solid blue' : '1px solid gray',
              backgroundColor: activeTab === index ? 'lightblue' : 'white',
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabsLink;