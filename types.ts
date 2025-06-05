
import React from 'react'; // Added React import for React.ReactElement

export enum ActivityType {
  STORY = 'STORY',
  RIDDLE = 'RIDDLE',
  DRAWING_PROMPT = 'DRAWING_PROMPT',
}

export enum StoryCategory {
  ANIMALS = 'Animals',
  FANTASY = 'Fantasy',
  ADVENTURE = 'Adventure',
  FRIENDSHIP = 'Friendship',
}

export enum RiddleCategory {
  ANIMALS = 'Animals',
  FOOD = 'Food',
  OBJECTS = 'Household Objects',
  NATURE = 'Nature',
}

export interface Activity {
  id: ActivityType;
  name: string;
  icon: React.ReactElement<{ className?: string }>; // Changed from React.ReactNode
  description: string;
}

export interface StoryData {
  title: string;
  content: string;
  imageSeed: string;
}

export interface RiddleData {
  riddleText: string;
  answer: string;
  imageSeed: string;
}