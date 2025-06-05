
import React, { useState } from 'react';
import { ActivityType } from './types';
import { ACTIVITIES } from './constants';
import StoryActivity from './components/StoryActivity';
import RiddleActivity from './components/RiddleActivity';
import DrawingIdeaActivity from './components/DrawingIdeaActivity';
import ActivitySelector from './components/ActivitySelector';

const App: React.FC = () => {
  const [activeActivity, setActiveActivity] = useState<ActivityType>(ActivityType.STORY);

  const renderActiveActivity = (): React.ReactNode => {
    switch (activeActivity) {
      case ActivityType.STORY:
        return <StoryActivity />;
      case ActivityType.RIDDLE:
        return <RiddleActivity />;
      case ActivityType.DRAWING_PROMPT:
        return <DrawingIdeaActivity />;
      default:
        return <StoryActivity />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-gradient-to-br from-brand-secondary/30 via-brand-bg-light to-brand-primary/30">
      <header className="md:hidden p-4 bg-brand-primary text-white shadow-lg">
        <h1 className="text-3xl font-bold text-center">Kids Activity Fun!</h1>
      </header>
      <ActivitySelector activeActivity={activeActivity} setActiveActivity={setActiveActivity} />
      <main className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto">
        {renderActiveActivity()}
      </main>
    </div>
  );
};

export default App;