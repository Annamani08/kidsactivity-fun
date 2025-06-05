
import React from 'react';

interface CategorySelectorProps<T extends string> {
  categories: T[];
  selectedCategory: T | null;
  onSelectCategory: (category: T) => void;
  label: string;
}

const CategorySelector = <T extends string,>({ categories, selectedCategory, onSelectCategory, label }: CategorySelectorProps<T>): React.ReactNode => {
  return (
    <div className="mb-6">
      <label className="block text-xl font-semibold text-brand-text mb-3">{label}:</label>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-5 py-2.5 text-sm sm:text-base font-medium rounded-full shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105
                        ${selectedCategory === category 
                          ? 'bg-brand-accent text-white ring-2 ring-brand-accent ring-offset-2 ring-offset-brand-bg-light' 
                          : 'bg-white text-brand-text hover:bg-gray-100 border border-gray-300'
                        }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;