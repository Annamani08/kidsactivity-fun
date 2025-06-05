
import React, { useState, useCallback } from 'react';
import { generateRiddle } from '../services/geminiService';
import { RiddleCategory, ActivityType } from '../types';
import { RIDDLE_CATEGORIES, API_KEY_ERROR_MESSAGE, GENERIC_ERROR_MESSAGE, ACTIVITIES } from '../constants';
import { RiddleData } from '../types';
import LoadingIndicator from './LoadingIndicator';
import ActionButton from './ActionButton';
import CategorySelector from './CategorySelector';

const RiddleActivity: React.FC = () => {
  const [riddleData, setRiddleData] = useState<RiddleData | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<RiddleCategory | null>(RIDDLE_CATEGORIES[0]);

  const activityInfo = ACTIVITIES.find(act => act.id === ActivityType.RIDDLE);

  const fetchRiddle = useCallback(async () => {
    if (!selectedCategory) {
      setError("Please select a riddle category first!");
      return;
    }
    if (!process.env.API_KEY) {
      setError(API_KEY_ERROR_MESSAGE);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    setRiddleData(null);
    setShowAnswer(false);
    try {
      const { riddleText, answer } = await generateRiddle(selectedCategory);
      const imageSeed = answer.toLowerCase().replace(/\s+/g, '-'); // Create a URL-friendly seed
      setRiddleData({ riddleText, answer, imageSeed });
    } catch (err) {
      setError(err instanceof Error ? err.message : GENERIC_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  const handleSelectCategory = (category: RiddleCategory) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-2xl max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        {activityInfo && React.cloneElement(activityInfo.icon, { className: "w-10 h-10 text-brand-secondary"})}
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-secondary">{activityInfo?.name || 'Riddle Me This'}</h2>
      </div>
      <p className="text-md sm:text-lg text-brand-text">{activityInfo?.description || 'Time to solve a tricky riddle!'}</p>

      <CategorySelector
        categories={RIDDLE_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        label="Choose a Riddle Theme"
      />

      <ActionButton onClick={fetchRiddle} isLoading={isLoading} disabled={!selectedCategory || isLoading} variant="secondary" size="lg" className="w-full sm:w-auto">
        {isLoading ? 'Thinking of a Riddle...' : 'Get a Riddle!'}
      </ActionButton>

      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md text-center animate-shake">{error}</p>}

      {isLoading && !riddleData && <LoadingIndicator text="Finding a puzzling riddle for you..."/>}

      {riddleData && (
        <div className="mt-6 p-5 bg-yellow-50 rounded-lg shadow-inner space-y-4 animate-fadeIn">
          <h3 className="text-2xl font-semibold text-brand-text">Here's Your Riddle:</h3>
          <p className="text-brand-text text-xl italic leading-relaxed whitespace-pre-line">{riddleData.riddleText}</p>
          
          {!showAnswer && (
            <ActionButton onClick={() => setShowAnswer(true)} variant="accent" className="mt-4">
              Show Answer
            </ActionButton>
          )}

          {showAnswer && (
            <div className="mt-4 p-4 bg-green-100 rounded-lg animate-fadeIn">
              <h4 className="text-xl font-semibold text-green-700">The answer is...</h4>
              <p className="text-2xl font-bold text-brand-accent my-2">{riddleData.answer}!</p>
              <img 
                src={`https://picsum.photos/seed/${riddleData.imageSeed}/500/250`} 
                alt={riddleData.answer}
                className="w-full h-40 sm:h-56 object-cover rounded-lg shadow-md mt-3"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RiddleActivity;
