
import React from 'react';
import { Activity, ActivityType, StoryCategory, RiddleCategory } from './types';

// SVG Icons (Heroicons)
const BookOpenIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6-2.292m0 0V3.75m0 12.553a2.25 2.25 0 0 1-1.073 1.977l-2.268.99a2.25 2.25 0 0 1-2.612-.729V10.5a2.25 2.25 0 0 1 .99-1.977l2.269-.99a2.25 2.25 0 0 1 2.611.73V16.303Z" />
  </svg>
);

const PuzzlePieceIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const PaintBrushIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
);

export const ACTIVITIES: Activity[] = [
  { id: ActivityType.STORY, name: 'Story Time', icon: <BookOpenIcon />, description: "Listen to a fun story!" },
  { id: ActivityType.RIDDLE, name: 'Riddle Me This', icon: <PuzzlePieceIcon />, description: "Solve a tricky riddle!" },
  { id: ActivityType.DRAWING_PROMPT, name: 'Drawing Ideas', icon: <PaintBrushIcon />, description: "Get a cool idea to draw!" },
];

export const STORY_CATEGORIES: StoryCategory[] = [
  StoryCategory.ANIMALS, StoryCategory.FANTASY, StoryCategory.ADVENTURE, StoryCategory.FRIENDSHIP
];

export const RIDDLE_CATEGORIES: RiddleCategory[] = [
  RiddleCategory.ANIMALS, RiddleCategory.FOOD, RiddleCategory.OBJECTS, RiddleCategory.NATURE
];

export const API_KEY_ERROR_MESSAGE = "API Key not configured. Please set the API_KEY environment variable.";
export const GENERIC_ERROR_MESSAGE = "Oops! Something went wrong. Please try again.";

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';