
import React, { useState, useCallback } from 'react';
import { generateStory } from '../services/geminiService';
import { StoryCategory, ActivityType } from '../types';
import { STORY_CATEGORIES, API_KEY_ERROR_MESSAGE, GENERIC_ERROR_MESSAGE, ACTIVITIES } from '../constants';
import LoadingIndicator from './LoadingIndicator';
import ActionButton from './ActionButton';
import CategorySelector from './CategorySelector';

const StoryActivity: React.FC = () => {
  const [story, setStory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | null>(STORY_CATEGORIES[0]);
  const [imageSeed, setImageSeed] = useState<string>(Date.now().toString());

  const activityInfo = ACTIVITIES.find(act => act.id === ActivityType.STORY);

  const fetchStory = useCallback(async () => {
    if (!selectedCategory) {
      setError("Please select a story category first!");
      return;
    }
    if (!process.env.API_KEY) {
      setError(API_KEY_ERROR_MESSAGE);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    setStory(null);
    try {
      const generatedStory = await generateStory(selectedCategory);
      setStory(generatedStory);
      setImageSeed(Date.now().toString()); // New image for new story
    } catch (err) {
      setError(err instanceof Error ? err.message : GENERIC_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  const handleSelectCategory = (category: StoryCategory) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-2xl max-w-2xl mx-auto space-y-6 transform transition-all duration-500 ease-out hover:shadow-3xl">
      <div className="flex items-center space-x-3 mb-4">
        {activityInfo && React.cloneElement(activityInfo.icon, { className: "w-10 h-10 text-brand-primary"})}
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary">{activityInfo?.name || 'Story Time'}</h2>
      </div>
      <p className="text-md sm:text-lg text-brand-text">{activityInfo?.description || 'Let\'s read a wonderful story!'}</p>

      <CategorySelector
        categories={STORY_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        label="Choose a Story Theme"
      />

      <ActionButton onClick={fetchStory} isLoading={isLoading} disabled={!selectedCategory || isLoading} variant="primary" size="lg" className="w-full sm:w-auto">
        {isLoading ? 'Telling a Story...' : 'Tell Me a Story!'}
      </ActionButton>

      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md text-center animate-shake">{error}</p>}
      
      {isLoading && !story && <LoadingIndicator text="Gathering words for a magical story..."/>}

      {story && (
        <div className="mt-6 p-5 bg-brand-bg-light rounded-lg shadow-inner space-y-4 animate-fadeIn">
          <img 
            src={`https://picsum.photos/seed/${imageSeed}/600/300?blur=1`} 
            alt="Story illustration" 
            className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-md mb-4"
          />
          <h3 className="text-2xl font-semibold text-brand-accent">Your Story:</h3>
          <div className="text-brand-text text-lg leading-relaxed whitespace-pre-line prose max-w-none">
            {story}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryActivity;
