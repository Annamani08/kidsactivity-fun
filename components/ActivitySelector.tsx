
import React from 'react';
import { ActivityType } from '../types';
import { ACTIVITIES } from '../constants';

interface ActivitySelectorProps {
  activeActivity: ActivityType;
  setActiveActivity: (activity: ActivityType) => void;
}

const ActivitySelector: React.FC<ActivitySelectorProps> = ({ activeActivity, setActiveActivity }) => {
  return (
    <aside className="w-full md:w-64 bg-brand-primary text-white p-4 md:p-6 space-y-4 md:min-h-screen shadow-xl transform transition-all duration-300 ease-in-out">
      <h1 className="text-3xl font-bold mb-6 hidden md:block text-center">Kids Activity Fun!</h1>
      <nav>
        <ul className="space-y-3">
          {ACTIVITIES.map((activity) => (
            <li key={activity.id}>
              <button
                onClick={() => setActiveActivity(activity.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left text-lg transition-all duration-200 ease-in-out
                            hover:bg-brand-secondary hover:text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-75
                            ${activeActivity === activity.id ? 'bg-white text-brand-primary shadow-md font-semibold' : 'hover:bg-opacity-80'}`}
              >
                <span className={`p-1 rounded ${activeActivity === activity.id ? 'text-brand-primary' : 'text-white'}`}>
                  {React.cloneElement(activity.icon, { className: "w-7 h-7"})}
                </span>
                <span>{activity.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-6 text-center text-xs hidden md:block">
        <p>&copy; 2024 Fun Times Inc.</p>
        <p>Powered by Imagination & Gemini</p>
      </div>
    </aside>
  );
};

export default ActivitySelector;