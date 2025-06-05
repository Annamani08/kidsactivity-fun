
import React, { useState, useCallback } from 'react';
import { generateDrawingIdea } from '../services/geminiService';
import { ActivityType } from '../types';
import { API_KEY_ERROR_MESSAGE, GENERIC_ERROR_MESSAGE, ACTIVITIES } from '../constants';
import LoadingIndicator from './LoadingIndicator';
import ActionButton from './ActionButton';

const DrawingIdeaActivity: React.FC = () => {
  const [drawingIdea, setDrawingIdea] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bgPattern, setBgPattern] = useState<string>('bg-indigo-100'); // Initial background

  const activityInfo = ACTIVITIES.find(act => act.id === ActivityType.DRAWING_PROMPT);

  const fetchDrawingIdea = useCallback(async () => {
    if (!process.env.API_KEY) {
      setError(API_KEY_ERROR_MESSAGE);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    setDrawingIdea(null);
    try {
      const idea = await generateDrawingIdea();
      setDrawingIdea(idea);
      // Cycle through a few background patterns for fun
      const patterns = ['bg-pink-100', 'bg-blue-100', 'bg-purple-100', 'bg-indigo-100', 'bg-green-100'];
      setBgPattern(patterns[Math.floor(Math.random() * patterns.length)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : GENERIC_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-2xl max-w-2xl mx-auto space-y-6 text-center">
      <div className="flex items-center justify-center space-x-3 mb-4">
        {activityInfo && React.cloneElement(activityInfo.icon, { className: "w-10 h-10 text-brand-accent"})}
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-accent">{activityInfo?.name || 'Drawing Ideas'}</h2>
      </div>
      <p className="text-md sm:text-lg text-brand-text">{activityInfo?.description || 'Let\'s get a super fun idea for your next masterpiece!'}</p>

      <ActionButton onClick={fetchDrawingIdea} isLoading={isLoading} disabled={isLoading} variant="accent" size="lg" className="w-full sm:w-auto mx-auto">
        {isLoading ? 'Thinking of an Idea...' : 'Spark My Imagination!'}
      </ActionButton>

      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md text-center animate-shake">{error}</p>}
      
      {isLoading && !drawingIdea && <LoadingIndicator text="Dreaming up a fantastic drawing idea..."/>}

      {drawingIdea && (
        <div className={`mt-8 p-6 sm:p-8 rounded-xl shadow-inner animate-fadeIn ${bgPattern} min-h-[150px] flex items-center justify-center`}>
          <p className="text-2xl sm:text-3xl font-semibold text-purple-700 italic leading-relaxed">
            "{drawingIdea}"
          </p>
        </div>
      )}
       {!drawingIdea && !isLoading && (
         <div className="mt-8 p-6 sm:p-8 rounded-xl shadow-inner bg-gray-100 min-h-[150px] flex flex-col items-center justify-center">
            <img src={`https://picsum.photos/seed/kidsdrawing/300/150?grayscale&blur=1`} alt="Waiting for idea" className="rounded-lg opacity-50 mb-4"/>
            <p className="text-gray-500 text-lg">Click the button to get a fun drawing idea!</p>
         </div>
       )}
    </div>
  );
};

export default DrawingIdeaActivity;
