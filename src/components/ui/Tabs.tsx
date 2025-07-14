import React from "react";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ElementType;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange, className }) => {
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIdx = tabs.findIndex(tab => tab.id === activeTab);
    if (e.key === 'ArrowRight') {
      const nextIdx = (currentIdx + 1) % tabs.length;
      onTabChange(tabs[nextIdx].id);
      tabRefs.current[nextIdx]?.focus();
    } else if (e.key === 'ArrowLeft') {
      const prevIdx = (currentIdx - 1 + tabs.length) % tabs.length;
      onTabChange(tabs[prevIdx].id);
      tabRefs.current[prevIdx]?.focus();
    } else if (e.key === 'Home') {
      onTabChange(tabs[0].id);
      tabRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      onTabChange(tabs[tabs.length - 1].id);
      tabRefs.current[tabs.length - 1]?.focus();
    }
  };

  return (
    <div
      className={`flex mb-8 overflow-x-auto rounded-xl gap-6 p-1 bg-gradient-to-r from-indigo-50/30 to-purple-50/30 backdrop-blur-sm ${className || ""}`.trim()}
      role="tablist"
      aria-label="Tabs navigation"
      onKeyDown={handleKeyDown}
    >
      {tabs.map((tab, idx) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={el => { tabRefs.current[idx] = el; }}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative flex items-center gap-2 px-3 py-2 text-sm sm:text-base font-medium rounded-lg whitespace-nowrap transition-all duration-300
              outline-0
              ${
                isActive 
                  ? "text-white bg-themebgColor"
                  : "text-gray-500 hover:text-indigo-600 hover:bg-white/90"
              }
            `}
            style={{
              minWidth: 'fit-content',
              justifyContent: isActive ? 'center' : 'center'
            }}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
          >
            {Icon && (
              <Icon 
                className={`w-5 h-5 flex-shrink-0 transition-transform ${
                  isActive ? 'text-white' : 'text-current'
                }`} 
                aria-hidden="true" 
              />
            )}
            <span 
              className={`transition-all duration-300 ${
                isActive 
                  ? 'opacity-100 max-w-full ml-1' 
                  : 'opacity-100 max-w-full'
              }`}
            >
              {tab.label}
            </span>
            
            {/* Active indicator bar */}
            {isActive && (
              <span className="absolute -bottom-1 left-1/2 w-4/5 h-0.5 bg-white rounded-full -translate-x-1/2" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;